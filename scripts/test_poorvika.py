import urllib.request
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

url = "https://www.poorvika.com/lg-8-0kg-fully-automatic-front-load-washing-machine-inverter-direct-drive-fhb1208z2m-middle-black/p"
req = urllib.request.Request(url, headers=HEADERS)
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    imgs = list(set(re.findall(r'https://img-prd-pim\.poorvika\.com/product/[^"\'\s]+', html)))
    print(f"Poorvika has {len(imgs)} images:")
    for img in sorted(imgs):
        print(" -", img)
except Exception as e:
    print("Poorvika error:", e)
