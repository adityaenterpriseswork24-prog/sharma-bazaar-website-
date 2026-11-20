import urllib.request
from PIL import Image
import io
import os

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

IMG_DIR = "public/images/products"

for idx in [1, 2, 3, 4, 5]:
    url = f"https://vsprod.vijaysales.com/media/catalog/product/f/h/fhb1207z2m_{idx}_.jpg"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
        im = Image.open(io.BytesIO(data)).convert('RGB')
        fname = f"lg-fhb1207z2m-vs-{idx}.jpg"
        target = os.path.join(IMG_DIR, fname)
        im.save(target, "JPEG", quality=92)
        print(f"Downloaded Vijay Sales {fname} ({im.size})")
    except Exception as e:
        print(f"Index {idx} failed:", e)
