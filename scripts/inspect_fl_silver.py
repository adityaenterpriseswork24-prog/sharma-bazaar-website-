import urllib.request
import re
from PIL import Image
import io

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

url = "https://www.flipkart.com/lg-8-kg-fully-automatic-front-load-washing-machine-silver/p/itmf48acc2fb7b4f"
req = urllib.request.Request(url, headers=HEADERS)
with urllib.request.urlopen(req, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

imgs = list(set(re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\'\s]+/(?:-original-|-resized-original-)[^"\'\s]+', html)))
clean_imgs = [re.sub(r'/image/[0-9]+/[0-9]+/', '/image/832/832/', img).split('?')[0] for img in imgs]

print(f"Total: {len(clean_imgs)}")
for idx, u in enumerate(clean_imgs[:20], 1):
    try:
        ireq = urllib.request.Request(u, headers=HEADERS)
        with urllib.request.urlopen(ireq, timeout=8) as iresp:
            im = Image.open(io.BytesIO(iresp.read())).convert('RGB')
        # Check aspect ratio and size
        w, h = im.size
        # Sample center of image
        box = im.crop((int(w * 0.3), int(h * 0.3), int(w * 0.7), int(h * 0.7)))
        colors = box.getcolors(maxcolors=200000)
        r = sum(c[0]*c[1][0] for c in colors)/sum(c[0] for c in colors)
        g = sum(c[0]*c[1][1] for c in colors)/sum(c[0] for c in colors)
        b = sum(c[0]*c[1][2] for c in colors)/sum(c[0] for c in colors)
        print(f"[{idx}] {w}x{h}, RGB=({r:.0f},{g:.0f},{b:.0f}): {u}")
    except Exception as e:
        print(f"[{idx}] Error:", e)
