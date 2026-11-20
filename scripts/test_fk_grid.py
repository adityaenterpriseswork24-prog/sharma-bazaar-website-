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

# Match each product block: title and image
# Flipkart grid cards usually have:
items = re.findall(r'<div class="tUxRFH">.*?<a class="CGtC5Q"[^>]*href="(/[^"]+)"[^>]*>.*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)".*?</div>\s*</div>\s*</div>', html, re.DOTALL)
if not items:
    # Alternative format
    items = re.findall(r'<a class="CGtC5Q"[^>]*href="(/[^"]+)"[^>]*>.*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"', html, re.DOTALL)

print(f"Found {len(items)} items in search results:")
for href, img, alt in items[:8]:
    clean_img = re.sub(r'/image/[0-9]+/[0-9]+/', '/image/832/832/', img).split('?')[0]
    print(f"  Title: {alt}")
    print(f"  Img:   {clean_img}")
    print(f"  Link:  {href.split('?')[0]}\n")
