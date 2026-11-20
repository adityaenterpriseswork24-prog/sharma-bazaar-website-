import urllib.request
import urllib.parse
import re
from PIL import Image
import io

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# The silver front load model URL:
url = "https://www.flipkart.com/lg-8-kg-fully-automatic-front-load-washing-machine-silver/p/itmf48acc2fb7b4f"
req = urllib.request.Request(url, headers=HEADERS)
with urllib.request.urlopen(req, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

imgs = list(set(re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\'\s]+/(?:-original-|-resized-original-)[^"\'\s]+', html)))
clean_imgs = [re.sub(r'/image/[0-9]+/[0-9]+/', '/image/832/832/', img).split('?')[0] for img in imgs]

print(f"Total images on silver front load page: {len(clean_imgs)}")
silver_candidates = []

for u in clean_imgs[:30]:
    try:
        ireq = urllib.request.Request(u, headers=HEADERS)
        with urllib.request.urlopen(ireq, timeout=8) as iresp:
            im = Image.open(io.BytesIO(iresp.read())).convert('RGB')
        w, h = im.size
        # Sample body of machine
        body_box = im.crop((int(w * 0.2), int(h * 0.2), int(w * 0.4), int(h * 0.8)))
        colors = body_box.getcolors(maxcolors=200000)
        if not colors:
            continue
        r = sum(c[0]*c[1][0] for c in colors)/sum(c[0] for c in colors)
        g = sum(c[0]*c[1][1] for c in colors)/sum(c[0] for c in colors)
        b = sum(c[0]*c[1][2] for c in colors)/sum(c[0] for c in colors)
        print(f"Image ({w}x{h}), RGB=({r:.0f},{g:.0f},{b:.0f}): {u}")
        # Silver is high brightness (>120), low saturation (|r-g| < 15, |g-b| < 15)
        if r > 110 and g > 110 and b > 110 and abs(r-g) < 15 and abs(g-b) < 15:
            print("  -> MATCH SILVER!")
            silver_candidates.append(u)
    except Exception as e:
        pass

print(f"Found {len(silver_candidates)} SILVER images:")
for s in silver_candidates:
    print("  *", s)
