import urllib.request
import re

url = "https://www.flipkart.com/lg-180-l-direct-cool-single-door-1-star-refrigerator/p/itm617942fd64a44"
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
})

with urllib.request.urlopen(req, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')
    imgs = list(set(re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\'\s]+', html)))
    print("Total images found:", len(imgs))
    for i in imgs[:10]:
        print(" -", i)
