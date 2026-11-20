import urllib.request
from PIL import Image
import io
import os

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

IMG_DIR = "public/images/products"

urls = [
    ("silver-view-1.jpg", "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/6/q/i/-original-imahmvtwehvgzzfr.jpeg"),
    ("silver-view-2.jpg", "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/j/w/o/-resized-original-imahg3v4bpbbgcj3.jpeg"),
    ("silver-view-3.jpg", "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/6/x/2/-resized-original-imahp4cjktumqpvg.jpeg"),
    ("silver-view-4.jpg", "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/k/9/d/-original-imahmvtwhyjwwjzb.jpeg")
]

for fname, u in urls:
    req = urllib.request.Request(u, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as resp:
        im = Image.open(io.BytesIO(resp.read())).convert('RGB')
    target = os.path.join(IMG_DIR, fname)
    im.save(target, "JPEG", quality=92)
    print(f"Saved {fname} ({im.size})")
