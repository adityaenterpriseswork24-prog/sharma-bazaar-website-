import urllib.request
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# The 180L single door 1 star refrigerator on Flipkart:
url = "https://www.flipkart.com/lg-180-l-direct-cool-single-door-1-star-refrigerator/p/itm617942fd64a44"
req = urllib.request.Request(url, headers=HEADERS)
with urllib.request.urlopen(req, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# Extract all images and inspect their colors
from PIL import Image
import io

imgs = list(set(re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\'\s]+/(?:-original-|-resized-original-)[^"\'\s]+', html)))
clean_imgs = [re.sub(r'/image/[0-9]+/[0-9]+/', '/image/832/832/', img).split('?')[0] for img in imgs]

print(f"Total images on 180L page: {len(clean_imgs)}")
red_imgs = []
blue_imgs = []

for u in clean_imgs[:25]:
    try:
        ireq = urllib.request.Request(u, headers=HEADERS)
        with urllib.request.urlopen(ireq, timeout=8) as iresp:
            im = Image.open(io.BytesIO(iresp.read())).convert('RGB')
        w, h = im.size
        # Sample center of door
        door_box = im.crop((int(w * 0.35), int(h * 0.35), int(w * 0.65), int(h * 0.65)))
        colors = door_box.getcolors(maxcolors=100000)
        if not colors:
            continue
        r_total = sum(c[0] * c[1][0] for c in colors)
        g_total = sum(c[0] * c[1][1] for c in colors)
        b_total = sum(c[0] * c[1][2] for c in colors)
        n = sum(c[0] for c in colors)
        r, g, b = int(r_total/n), int(g_total/n), int(b_total/n)
        if r > b + 25 and r > g + 20:
            print(f"RED ({r},{g},{b}): {u}")
            red_imgs.append(u)
        elif b > r + 20:
            print(f"BLUE ({r},{g},{b}): {u}")
            blue_imgs.append(u)
    except Exception:
        pass

print(f"Found {len(red_imgs)} RED images, {len(blue_imgs)} BLUE images.")
