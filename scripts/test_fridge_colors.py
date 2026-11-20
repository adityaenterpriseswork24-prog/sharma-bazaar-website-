import urllib.request
import urllib.parse
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def find_specific_refrigerator(brand, model, color):
    q = f"{brand} {model} {color} single door refrigerator"
    url = f"https://www.flipkart.com/search?q={urllib.parse.quote(q)}"
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    links = re.findall(r'href="(/[^"]+/p/itm[a-zA-Z0-9]+[^"]*)"', html)
    brand_links = [l for l in links if l.lower().startswith('/' + brand.lower())]
    print(f"\n{model} ({color}) results:")
    for bl in brand_links[:4]:
        print("  -", bl.split('?')[0])

find_specific_refrigerator("LG", "GL-D1816WORR", "Scarlet Orchid")
find_specific_refrigerator("LG", "GL-D1816WOLI", "Lily Blue")
find_specific_refrigerator("LG", "GL-D1816WOWR", "Wine Orchid")
find_specific_refrigerator("LG", "GL-D1816WOLC", "Lily Crystal")
