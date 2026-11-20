import urllib.request
import re

url = "https://www.flipkart.com/lg-180-l-direct-cool-single-door-1-star-refrigerator/p/itm617942fd64a44"
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
})

with urllib.request.urlopen(req, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')
    imgs = list(set(re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\'\s]+', html)))
    # High res images are /image/832/832/ or /image/416/416/
    high_res = [i for i in imgs if '/832/832/' in i or '/416/416/' in i or '/128/128/' in i]
    print(f"Total high-res product images found: {len(high_res)}")
    for i in high_res[:8]:
        # You can upgrade resolution by replacing dimensions with /832/832/
        clean_url = re.sub(r'/image/[0-9]+/[0-9]+/', '/image/832/832/', i)
        print(" -", clean_url)
