import urllib.request
import re
from PIL import Image
import io
import os

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

IMG_DIR = "public/images/products"

# Let's inspect the images of the LG Silver Front Load washer from LG India / Reliance Digital / Flipkart
# Let's search Flipkart specifically for: "LG FHB1208Z2M"
url = "https://www.flipkart.com/search?q=LG+FHB1208Z2M"
req = urllib.request.Request(url, headers=HEADERS)
with urllib.request.urlopen(req, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# Find the specific product link for FHB1208Z2M or 8kg silver
links = [l for l in re.findall(r'href="(/[^"]+/p/itm[a-zA-Z0-9]+[^"]*)"', html) if 'lg-' in l.lower()]
print(f"Found {len(links)} LG links for FHB1208Z2M:")
for l in links[:5]:
    print(" -", l.split('?')[0])

if links:
    p_url = "https://www.flipkart.com" + links[0].split('?')[0]
    p_req = urllib.request.Request(p_url, headers=HEADERS)
    with urllib.request.urlopen(p_req, timeout=10) as presp:
        p_html = presp.read().decode('utf-8', errors='ignore')
    imgs = list(set(re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\'\s]+/(?:-original-|-resized-original-)[^"\'\s]+', p_html)))
    clean_imgs = [re.sub(r'/image/[0-9]+/[0-9]+/', '/image/832/832/', img).split('?')[0] for img in imgs]
    print(f"Product page {p_url} has {len(clean_imgs)} images:")
    for idx, img in enumerate(clean_imgs[:15], 1):
        print(f" [{idx}] {img}")
