import urllib.request
import urllib.parse
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def analyze_search(brand, model, kw):
    query = f"{brand} {model} {kw}".strip()
    search_url = f"https://www.flipkart.com/search?q={urllib.parse.quote(query)}"
    req = urllib.request.Request(search_url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        
    links = re.findall(r'href="(/[^"]+/p/itm[a-zA-Z0-9]+[^"]*)"', html)
    print(f"\n=== Search for {brand} {model} ({len(links)} links found) ===")
    for l in links[:5]:
        slug = l.split('/p/')[0].lstrip('/')
        print("  Candidate:", slug)
        
analyze_search("LG", "FHB1208Z2M", "washing machine")
analyze_search("LG", "GLD1816WORR", "refrigerator")
analyze_search("LG", "GLD1816WOLI", "refrigerator")
analyze_search("Bosch", "WAJ2416SIN", "washing machine")
