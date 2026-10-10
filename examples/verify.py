#!/usr/bin/env python3
"""Narrow offline checks of synthetic fixtures. No network, deployment or indexing checks."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
NS = '{http://www.sitemaps.org/schemas/sitemap/0.9}'

class Head(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_head = False
        self.robots = []
        self.canonicals = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'head':
            self.in_head = True
        if not self.in_head:
            return
        if tag == 'meta' and attrs.get('name', '').lower() in ('robots', 'googlebot'):
            self.robots.extend(x.strip().lower() for x in attrs.get('content', '').split(','))
        if tag == 'link' and 'canonical' in attrs.get('rel', '').lower().split():
            self.canonicals.append(attrs.get('href', ''))
    def handle_endtag(self, tag):
        if tag == 'head':
            self.in_head = False

def read_head(folder):
    result = Head()
    result.feed((folder / 'page.html').read_text())
    return result

def sitemap_urls(file):
    try:
        root = ET.fromstring(file.read_text())
    except ET.ParseError:
        return []
    if root.tag != NS + 'urlset':
        return []
    urls = [loc.text or '' for loc in root.findall(NS + 'url/' + NS + 'loc')]
    return urls if urls and all(urlparse(u).scheme == 'https' and urlparse(u).netloc for u in urls) else []

def passes(case, state):
    folder = ROOT / case / state
    if case == 'robots-block':
        robot = RobotFileParser()
        robot.parse((folder / 'robots.txt').read_text().splitlines())
        return robot.can_fetch('Googlebot', 'https://example.com/trail-guide/')
    if case == 'noindex':
        head = read_head(folder)
        response = json.loads((folder / 'response.json').read_text())
        header = next((v for k, v in response['headers'].items() if k.lower() == 'x-robots-tag'), '')
        directives = head.robots + [x.strip().lower() for x in header.split(',')]
        return not any(x in ('noindex', 'none') for x in directives)
    if case == 'sitemap-html':
        response = json.loads((folder / 'response.json').read_text())
        mime = response['headers']['Content-Type'].split(';')[0]
        return response['status'] == 200 and mime in ('application/xml', 'text/xml') and bool(sitemap_urls(folder / 'sitemap.xml'))
    if case == 'canonical-conflict':
        canonicals = read_head(folder).canonicals
        return len(canonicals) == 1 and canonicals == sitemap_urls(folder / 'sitemap.xml')
    raise ValueError(case)

def main():
    catalog = json.loads((ROOT / 'catalog.json').read_text())
    expected = json.loads((ROOT / 'expected-results.json').read_text())
    failures = []
    for case in catalog['cases']:
        for state in ('before', 'after'):
            actual = bool(passes(case['id'], state))
            wanted = expected['cases'][case['id']][state]
            matches = actual == wanted
            print(f"{'PASS' if matches else 'FAIL'} {case['id']}/{state}: fixture criterion {'passes' if actual else 'fails'} (expected {'pass' if wanted else 'fail'})")
            if not matches:
                failures.append(case['id'] + '/' + state)
    if failures:
        raise SystemExit('Fixture regression: ' + ', '.join(failures))
    print('8/8 expected fixture outcomes verified. Synthetic only; Google indexing not tested.')

if __name__ == '__main__':
    main()
