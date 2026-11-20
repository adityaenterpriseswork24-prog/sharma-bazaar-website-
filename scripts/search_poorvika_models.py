import urllib.request
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

models = ["fhb1207z4m", "fhb1207z2m", "fhb1208z4p", "fhb1209z2m", "fhb1209z9b0", "fhp1412z9b"]

for m in models:
    url = f"https://www.poorvika.com/search?q={m}"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        imgs = [i for i in set(re.findall(r'https://img-prd-pim\.poorvika\.com/product/[^"\'\s]+', html)) if 'Front' in i]
        print(f"[{m}] found {len(imgs)} Poorvika images: {imgs[:2]}")
    except Exception as e:
        print(f"[{m}] error:", e)
