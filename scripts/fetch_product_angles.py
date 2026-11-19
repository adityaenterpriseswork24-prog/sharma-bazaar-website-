import urllib.request
import ssl
import certifi
import re
import os
import json

ctx = ssl.create_default_context(cafile=certifi.where())

def download_image(url, output_path):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            data = resp.read()
            if len(data) > 2000:
                with open(output_path, 'wb') as f:
                    f.write(data)
                print(f"Downloaded {output_path} ({len(data)} bytes)")
                return True
    except Exception as e:
        print(f"Failed {url}: {e}")
    return False

# 1. Download real Haier 165L angles
download_image(
    "https://image.haier.com/in/refrigerators/W020260211679799526925_480.jpg",
    "public/images/products/haier-165l-single-door.jpg"
)

# 2. Check Haier page for interior image
try:
    url = "https://www.haier.com/in/refrigerators/165-litres-direct-cool-refrigerator-hrd-1851smsa-p.shtml"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        matches = set(re.findall(r'https://image\.haier\.com/[^\s\"\'\\]+\.(?:jpg|png)', html))
        print("Haier images found:", len(matches))
        for idx, m in enumerate(matches):
            print("Haier img:", m)
            download_image(m, f"public/images/products/haier-165l-angle-{idx}.jpg")
except Exception as e:
    print("Error fetching Haier angles:", e)

# 3. Download Godrej Refrigerator angles
godrej_angles = [
    ("https://www.godrejenterprises.com/appliances/images/EONCRYSTAL_interior.jpg", "public/images/products/godrej-244l-interior.jpg"),
    ("https://www.godrejenterprises.com/appliances/images/EONALPHA_interior.jpg", "public/images/products/godrej-238l-interior.jpg"),
]
for g_url, out in godrej_angles:
    download_image(g_url, out)
