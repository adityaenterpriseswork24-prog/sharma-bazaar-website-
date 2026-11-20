import urllib.request
from PIL import Image
import io
import os

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

IMG_DIR = "public/images/products"

urls = [
    ("test-angle-1.jpg", "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/4/r/s/-original-imahrbubgvyc8khg.jpeg"),
    ("test-angle-2.jpg", "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/b/v/x/-original-imahrbubhvmgmcpf.jpeg"),
    ("test-angle-3.jpg", "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/s/f/j/-original-imahprhhh4hay5jj.jpeg"),
    ("test-angle-4.jpg", "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/q/u/e/-original-imahprhh8gsegmhh.jpeg")
]

for fname, u in urls:
    req = urllib.request.Request(u, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as resp:
        im = Image.open(io.BytesIO(resp.read())).convert('RGB')
    target = os.path.join(IMG_DIR, fname)
    im.save(target, "JPEG", quality=92)
    print(f"Saved {fname} ({im.size})")
