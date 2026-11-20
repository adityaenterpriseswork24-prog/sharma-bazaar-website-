import urllib.request
import urllib.parse
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

query = "LG 180 L direct cool refrigerator"
search_url = f"https://www.flipkart.com/search?q={urllib.parse.quote(query)}"
req = urllib.request.Request(search_url, headers=HEADERS)
with urllib.request.urlopen(req, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# Find img tags with alt text containing LG
img_tags = re.findall(r'<img[^>]+alt="([^"]*LG[^"]*)"[^>]+src="([^"]+)"', html)
if not img_tags:
    img_tags = re.findall(r'<img[^>]+src="([^"]+)"[^>]+alt="([^"]*LG[^"]*)"', html)
    img_tags = [(alt, src) for src, alt in img_tags]

print(f"Found {len(img_tags)} LG product image tags:")
for alt, src in img_tags[:10]:
    clean_src = re.sub(r'/image/[0-9]+/[0-9]+/', '/image/832/832/', src).split('?')[0]
    print(f"Alt: {alt}\nSrc: {clean_src}\n")
