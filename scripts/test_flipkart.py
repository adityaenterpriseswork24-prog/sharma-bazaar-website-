import urllib.request
import re

url = "https://www.flipkart.com/lg-180-l-direct-cool-single-door-1-star-refrigerator/p/itm617942fd64a44"
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
})

try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print("Flipkart 200, length:", len(html))
        # Flipkart product images are hosted on rukminim1.flixcart.com or rukminim2.flixcart.com
        imgs = re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\']+', html)
        print("Found flixcart images:", len(imgs))
        for img in set(imgs)[:10]:
            print(" -", img)
except Exception as e:
    print("Flipkart Error:", e)
