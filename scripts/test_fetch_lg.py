import urllib.request
import re

url = "https://www.lg.com/in/refrigerators/single-door-refrigerators/gld1816worr"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print("Status 200, length:", len(html))
        imgs = re.findall(r'https://[^\s"\']+\.(?:jpg|png|webp)', html)
        media_imgs = [i for i in set(imgs) if 'media' in i or 'product' in i or 'channel' in i or 'gallery' in i or 'd1816' in i.lower()]
        print("Found media images:", len(media_imgs))
        for m in sorted(media_imgs)[:15]:
            print(" -", m)
except Exception as e:
    print("Error:", e)
