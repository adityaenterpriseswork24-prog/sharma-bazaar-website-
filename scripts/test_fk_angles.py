import urllib.request
import re

url = "https://www.flipkart.com/lg-185-l-direct-cool-single-door-2-star-refrigerator-base-drawer/p/itmfff9278c10285"
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
})

with urllib.request.urlopen(req, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# On Flipkart product page, look for image URLs with -original- in them
# Example: https://rukminim2.flixcart.com/image/1600/2140/xif0q/refrigerator-new/6/l/c/-original-imahn7csuh36h9y7.jpeg
all_originals = set(re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\'\s]+/(?:-original-|-resized-original-)[^"\'\s]+', html))
print(f"Found {len(all_originals)} original angle images:")
for idx, img in enumerate(sorted(all_originals)[:8], 1):
    clean = re.sub(r'/image/[0-9]+/[0-9]+/', '/image/832/832/', img).split('?')[0]
    print(f" Angle {idx}: {clean}")
