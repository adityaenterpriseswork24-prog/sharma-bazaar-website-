import urllib.request
import urllib.parse
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def test_color_search(query):
    search_url = f"https://www.flipkart.com/search?q={urllib.parse.quote(query)}"
    req = urllib.request.Request(search_url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    links = re.findall(r'href="(/[^"]+/p/itm[a-zA-Z0-9]+[^"]*)"', html)
    print(f"\nQuery: {query}")
    for l in links[:3]:
        slug = l.split('/p/')[0].lstrip('/')
        # Extract color if present in slug
        print("  Candidate:", slug)

test_color_search("LG GL-D1816WORR Scarlet refrigerator")
test_color_search("LG GL-D1816WOLI Blue refrigerator")
test_color_search("LG GL-D1816WOWR Wine refrigerator")
test_color_search("LG FHB1208Z2M Silver front load washing machine")
test_color_search("Bosch WAJ2416SIN front load washing machine")
