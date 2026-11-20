import json
import urllib.request
import urllib.parse
import re
import os
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

STORED_PATH = "src/data/stored-products.json"
INITIAL_TS_PATH = "src/data/initial-products.ts"
IMG_DIR = "public/images/products"
os.makedirs(IMG_DIR, exist_ok=True)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

with open(STORED_PATH, "r", encoding="utf-8") as f:
    products = json.load(f)

def get_category_keyword(cat, sub):
    sub = (sub or "").lower()
    cat = (cat or "").lower()
    if cat == "refrigerators" or "refrigerator" in sub:
        return "refrigerator"
    if cat == "washing-machines" or "washing" in sub:
        if "semi" in sub:
            return "semi automatic washing machine"
        elif "front" in sub:
            return "front load washing machine"
        elif "top" in sub:
            return "top load washing machine"
        return "washing machine"
    if cat == "microwaves" or "microwave" in sub:
        return "microwave"
    if cat == "televisions" or "tv" in sub:
        return "tv"
    if cat == "air-conditioners" or "ac" in sub:
        return "ac"
    if cat == "water-dispensers" or "water" in sub:
        return "water dispenser"
    return ""

def download_file(url, target_path):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=12) as resp:
            content = resp.read()
            if len(content) > 4000:
                with open(target_path, 'wb') as f:
                    f.write(content)
                return True
    except Exception:
        pass
    return False

def fetch_photos_for_product(prod):
    pid = prod.get("id", "")
    brand = prod.get("brand", "LG")
    model = prod.get("modelNumber", "")
    cat = prod.get("category", "")
    sub = prod.get("subcategory", "")
    
    cat_kw = get_category_keyword(cat, sub)
    
    # Check if we already have the real downloaded images for this model
    r1 = os.path.join(IMG_DIR, f"{pid}-real-1.jpg")
    r2 = os.path.join(IMG_DIR, f"{pid}-real-2.jpg")
    r3 = os.path.join(IMG_DIR, f"{pid}-real-3.jpg")
    if os.path.exists(r1) and os.path.exists(r2) and os.path.exists(r3) and os.path.getsize(r1) > 5000:
        return pid, [f"/images/products/{pid}-real-1.jpg", f"/images/products/{pid}-real-2.jpg", f"/images/products/{pid}-real-3.jpg"]

    # 1. Primary: Search Flipkart
    search_queries = [
        f"{brand} {model} {cat_kw}".strip(),
        f"{brand} {model}".strip()
    ]
    
    clean_imgs = []
    
    for sq in search_queries:
        search_url = f"https://www.flipkart.com/search?q={urllib.parse.quote(sq)}"
        try:
            req = urllib.request.Request(search_url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=10) as resp:
                html = resp.read().decode('utf-8', errors='ignore')
                
            links = re.findall(r'href="(/[^"]+/p/itm[a-zA-Z0-9]+[^"]*)"', html)
            if links:
                # Find the most relevant product link
                p_url = "https://www.flipkart.com" + links[0].split('?')[0]
                p_req = urllib.request.Request(p_url, headers=HEADERS)
                with urllib.request.urlopen(p_req, timeout=10) as presp:
                    p_html = presp.read().decode('utf-8', errors='ignore')
                    
                imgs = list(set(re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\'\s]+/(?:-original-|-resized-original-)[^"\'\s]+', p_html)))
                clean_imgs = [re.sub(r'/image/[0-9]+/[0-9]+/', '/image/832/832/', img).split('?')[0] for img in imgs]
                
                # Filter duplicates
                uniq = []
                for c in clean_imgs:
                    if c not in uniq:
                        uniq.append(c)
                clean_imgs = uniq
                
                if len(clean_imgs) >= 3:
                    break
        except Exception:
            pass

    if len(clean_imgs) >= 3:
        downloaded = []
        for idx, img_url in enumerate(clean_imgs[:3], 1):
            fname = f"{pid}-real-{idx}.jpg"
            fpath = os.path.join(IMG_DIR, fname)
            if download_file(img_url, fpath):
                downloaded.append(f"/images/products/{fname}")
        if len(downloaded) >= 3:
            print(f"[OK] {model} ({pid}): Successfully fetched 3 genuine photos")
            return pid, downloaded[:3]

    print(f"[RETAIN] {model} ({pid}): Retaining existing valid gallery ({len(prod.get('gallery', []))} images)")
    return pid, prod.get("gallery", [])

def main():
    print(f"Starting photo download for {len(products)} products across catalog...")
    start_time = time.time()
    
    results = {}
    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = {executor.submit(fetch_photos_for_product, p): p for p in products}
        for future in as_completed(futures):
            try:
                pid, gallery = future.result()
                results[pid] = gallery
            except Exception as e:
                pass

    updated_count = 0
    for p in products:
        pid = p.get("id")
        if pid in results and results[pid]:
            new_gallery = results[pid]
            p["gallery"] = new_gallery
            p["imageUrl"] = new_gallery[0]
            updated_count += 1

    print(f"\nCompleted in {time.time() - start_time:.1f}s. Updated {updated_count} products.")
    
    with open(STORED_PATH, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
        
    ts_content = f"""import {{ Product }} from '@/types';

export const INITIAL_PRODUCTS: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""
    with open(INITIAL_TS_PATH, "w", encoding="utf-8") as f:
        f.write(ts_content)
        
    print("Saved stored-products.json and initial-products.ts.")

if __name__ == "__main__":
    main()
