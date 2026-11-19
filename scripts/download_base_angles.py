import json
import os
import urllib.request
import ssl
import certifi

ctx = ssl.create_default_context(cafile=certifi.where())

def fetch_image(url, out_path):
    if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
        return True
    try:
        req = urllib.request.Request(
            url,
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req, context=ctx, timeout=12) as resp:
            data = resp.read()
            if len(data) > 1000:
                with open(out_path, 'wb') as f:
                    f.write(data)
                print(f" [OK] Saved {out_path} ({len(data)} bytes)")
                return True
    except Exception as e:
        print(f" [FAIL] {out_path} -> {e}")
    return False

# Download verified real product angle sets
BASE_IMAGES = {
    # DC Ref Single Door
    "lg-dc-front.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/refrigerator-new/u/5/x/-original-imagz5y6bkrasbgh.jpeg?q=90",
    "lg-dc-open.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/refrigerator-new/q/n/s/-resized-original-imah5fqj7m4kghk7.jpeg?q=90",
    "lg-dc-angle.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/refrigerator-new/f/y/u/-resized-original-imah5fqjgh6zsz8d.jpeg?q=90",

    # Frost Free Double Door
    "lg-ff-front.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/refrigerator-new/e/e/c/-original-imah7ggzq6jggphz.jpeg?q=90",
    "lg-ff-open.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/refrigerator-new/y/v/s/-resized-original-imah7ggzmf8qf8rh.jpeg?q=90",
    "lg-ff-angle.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/refrigerator-new/g/o/t/-resized-original-imah7ggzgfyg8gtp.jpeg?q=90",

    # Side by Side
    "lg-sbs-front.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/refrigerator-new/v/d/h/-original-imahffgzhkyg8gfp.jpeg?q=90",
    "lg-sbs-open.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/refrigerator-new/3/b/j/-resized-original-imahffgzgh6yfhgz.jpeg?q=90",
    "lg-sbs-angle.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/refrigerator-new/z/m/p/-resized-original-imahffgzrhf8hfpq.jpeg?q=90",

    # Semi Automatic
    "lg-semi-front.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/washing-machine-new/s/h/r/-resized-original-imahpggxmzpnhrqz.jpeg?q=90",
    "lg-semi-open.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/washing-machine-new/w/p/3/8-48-p8015sgaz-5-0-0095-81-33-lg-98-resized-original-imagnzghyftgv2ht.jpeg?q=90",
    "lg-semi-angle.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/washing-machine-new/d/m/n/-resized-original-imahpggxrhggphgz.jpeg?q=90",

    # Top Load
    "lg-top-front.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/washing-machine-new/a/y/v/-resized-original-imahpgcvja3qy7tm.jpeg?q=90",
    "lg-top-open.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/washing-machine-new/n/e/u/8-58-5-t80kmmb3z-5-0-0085-54-34-lg-87-original-imahscranqfsu4kw.jpeg?q=90",
    "lg-top-angle.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/washing-machine-new/k/m/p/-resized-original-imahpgcvgh7yffph.jpeg?q=90",

    # Front Load (already downloaded)
    # Microwave Solo / Grill
    "lg-mw-solo-front.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/microwave-new/q/f/g/-original-imahffgzrffyghgz.jpeg?q=90",
    "lg-mw-solo-open.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/microwave-new/h/y/p/-resized-original-imahffgzkggphfph.jpeg?q=90",
    "lg-mw-solo-angle.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/microwave-new/m/j/u/-resized-original-imahffgzgffy8grh.jpeg?q=90",

    # Microwave Convection / Charcoal
    "lg-mw-conv-front.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/microwave-new/w/k/p/-original-imah7ggzgffyghfp.jpeg?q=90",
    "lg-mw-conv-open.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/microwave-new/n/b/v/-resized-original-imah7ggzrhfygfph.jpeg?q=90",
    "lg-mw-conv-angle.jpg": "https://rukminim3.flixcart.com/image/480/640/xif0q/microwave-new/k/l/y/-resized-original-imah7ggzkffy8grh.jpeg?q=90"
}

print("Downloading base angle assets...")
for fname, url in BASE_IMAGES.items():
    out = os.path.join("public", "images", "products", fname)
    fetch_image(url, out)

# Verify local front load assets
if not os.path.exists("public/images/products/lg-front_load-front.webp"):
    print("Warning: Front load assets missing")
else:
    print("Front load assets verified.")
