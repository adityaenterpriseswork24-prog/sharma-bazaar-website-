import urllib.request
import urllib.parse
import os
import json
import hashlib

STORED_PATH = "src/data/stored-products.json"
INITIAL_TS_PATH = "src/data/initial-products.ts"
IMG_DIR = "public/images/products"
os.makedirs(IMG_DIR, exist_ok=True)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

EXACT_MODELS = {
    "lg-gld1816worr": [
        "https://rukminim2.flixcart.com/image/832/832/xif0q/refrigerator-new/x/z/u/-original-imahn7cdjpyczufs.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/refrigerator-new/e/z/e/-original-imahs3nr27xx42ep.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/refrigerator-new/p/b/p/-resized-original-imahq7tmwfzjvpgd.jpeg"
    ],
    "lg-gld1816woli": [
        "https://rukminim2.flixcart.com/image/832/832/xif0q/refrigerator-new/r/8/1/-resized-original-imahn7csnx7gvspb.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/refrigerator-new/x/d/d/-original-imahn7cs7ahmr3gp.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/refrigerator-new/l/h/n/-original-imahsyjytbe8w5af.jpeg"
    ],
    "lg-fhb1207z2m": [
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/q/w/x/-original-imah5efwaxsrbzcf.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/o/u/j/-resized-original-imahphhmmbhsejyf.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/i/o/a/-resized-original-imahrf2ed2kkkwz9.jpeg"
    ],
    "lg-fhb1208z2m": [
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/x/v/c/-resized-original-imahghnduhtcxz6v.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/x/c/h/-resized-original-imahdtg9wgca93pb.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/j/n/j/-original-imahnjd25gx7gkgm.jpeg"
    ],
    "lg-fhb1208z4p": [
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/c/x/z/-resized-original-imahnvazjyhm85gr.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/w/g/w/-original-imahpcyxzzstyfzh.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/h/z/e/-original-imahrn74uwmqfceq.jpeg"
    ],
    "lg-fhb1209z2m": [
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/j/n/j/-original-imahnjd25gx7gkgm.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/x/c/h/-resized-original-imahdtg9wgca93pb.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/f/w/w/-original-imahmvsvffftkpr3.jpeg"
    ],
    "lg-fhb1209z9b0": [
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/a/i/s/-original-imahmvtwfkjyvtzz.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/x/j/v/-original-imahmvsvs8q5haww.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/y/5/c/-original-imahmvtwfehqngfj.jpeg"
    ],
    "lg-fhp1412z9b": [
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/c/y/5/-resized-original-imahphjxkfntbrae.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/g/h/a/-resized-original-imahpbqtgvv9d8he.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/f/h/i/-original-imah7bwkdmxw7sdb.jpeg"
    ],
    "bosch-7kg-5-star-front-load-waj2416sin": [
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/f/c/d/-original-imahn82eyscxj3zw.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/y/t/c/-original-imagu2rtbyp7kuqr.jpeg",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/3/p/d/-resized-original-imahg854b3fpkupk.jpeg"
    ]
}

def download_file(url, target_path):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=12) as resp:
        content = resp.read()
        if len(content) > 4000:
            with open(target_path, 'wb') as f:
                f.write(content)
            return True
    return False

with open(STORED_PATH, "r", encoding="utf-8") as f:
    products = json.load(f)

for pid, urls in EXACT_MODELS.items():
    print(f"Downloading verified photos for {pid}...")
    gallery = []
    for idx, u in enumerate(urls, 1):
        fname = f"{pid}-verified-{idx}.jpg"
        fpath = os.path.join(IMG_DIR, fname)
        if download_file(u, fpath):
            gallery.append(f"/images/products/{fname}")
            print(f"  [OK] {fname} ({os.path.getsize(fpath)} bytes)")
    
    if len(gallery) == 3:
        for p in products:
            if p["id"] == pid:
                p["gallery"] = gallery
                p["imageUrl"] = gallery[0]
                print(f"  Updated product {pid} with 3 verified views.")

# Now scan for any remaining file with IFB banner hash 6595131434fe59dad78e48b02e6e6a66
IFB_HASH = "6595131434fe59dad78e48b02e6e6a66"
for p in products:
    brand = p.get("brand", "")
    pid = p.get("id", "")
    g = p.get("gallery", [])
    new_g = []
    changed = False
    for img_rel in g:
        disk_path = os.path.join("public", img_rel.lstrip("/"))
        if os.path.exists(disk_path):
            with open(disk_path, "rb") as fp:
                h = hashlib.md5(fp.read()).hexdigest()
            if h == IFB_HASH and brand != "IFB":
                print(f"WARNING: Removed leaked IFB banner from {brand} {pid}: {img_rel}")
                changed = True
                continue
        new_g.append(img_rel)
    if changed:
        # If gallery dropped below 3, top up
        while len(new_g) < 3 and new_g:
            new_g.append(new_g[0])
        p["gallery"] = new_g
        p["imageUrl"] = new_g[0]

with open(STORED_PATH, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

ts_content = f"""import {{ Product }} from '@/types';

export const INITIAL_PRODUCTS: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""

with open(INITIAL_TS_PATH, "w", encoding="utf-8") as f:
    f.write(ts_content)

print("\nSuccessfully updated stored-products.json and initial-products.ts with verified model photography!")
