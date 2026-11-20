import urllib.request
import urllib.parse
import re
import os
import time

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

IMG_DIR = "public/images/products"
os.makedirs(IMG_DIR, exist_ok=True)

def download_file(url, target_path):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15) as resp:
        content = resp.read()
        if len(content) > 5000: # at least 5KB
            with open(target_path, 'wb') as f:
                f.write(content)
            return True
    return False

def fetch_real_model_images(brand, model_num, category_kw, slug):
    query = f"{brand} {model_num} {category_kw}"
    search_url = f"https://www.flipkart.com/search?q={urllib.parse.quote(query)}"
    
    req = urllib.request.Request(search_url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            
        links = re.findall(r'href="(/[^"]+/p/itm[a-zA-Z0-9]+[^"]*)"', html)
        if not links:
            print(f"[{model_num}] No search product link")
            return None
            
        p_url = "https://www.flipkart.com" + links[0].split('?')[0]
        p_req = urllib.request.Request(p_url, headers=HEADERS)
        with urllib.request.urlopen(p_req, timeout=12) as presp:
            p_html = presp.read().decode('utf-8', errors='ignore')
            
        # Extract images matching category
        imgs = list(set(re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\'\s]+/(?:-original-|-resized-original-)[^"\'\s]+', p_html)))
        clean_imgs = [re.sub(r'/image/[0-9]+/[0-9]+/', '/image/832/832/', img).split('?')[0] for img in imgs]
        
        uniq = []
        for c in clean_imgs:
            if c not in uniq:
                uniq.append(c)
                
        if len(uniq) < 3:
            print(f"[{model_num}] Less than 3 photos found: {len(uniq)}")
            return None
            
        print(f"[{model_num}] Found {len(uniq)} photos! Downloading top 3 for {slug}...")
        downloaded = []
        for idx, img_url in enumerate(uniq[:3], 1):
            fname = f"{slug}-real-{idx}.jpg"
            fpath = os.path.join(IMG_DIR, fname)
            success = download_file(img_url, fpath)
            if success:
                downloaded.append(f"/images/products/{fname}")
                print(f"   Downloaded {fname} ({os.path.getsize(fpath)} bytes)")
                
        if len(downloaded) >= 3:
            return downloaded[:3]
    except Exception as e:
        print(f"[{model_num}] Error: {e}")
        
    return None

test_cases = [
    ("LG", "GLD1816WORR", "refrigerator", "lg-gld1816worr"),
    ("LG", "GLD1816WOLI", "refrigerator", "lg-gld1816woli"),
    ("LG", "GLT2216WYRO", "refrigerator", "lg-glt2216wyro"),
    ("LG", "P8015SKAZ", "washing machine", "lg-p8015skaz"),
    ("LG", "FHB1207Z4M", "washing machine", "lg-fhb1207z4m"),
]

for brand, model, cat, slug in test_cases:
    res = fetch_real_model_images(brand, model, cat, slug)
    print(f"Result for {model}: {res}\n")
