import urllib.request
import re

model = "GL-D1816WORR"
url = f"https://www.flipkart.com/search?q=LG+{model}"
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
})

try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print("Search status 200, length:", len(html))
        # Find product links
        product_links = re.findall(r'href="(/[^"]+/p/itm[a-zA-Z0-9]+[^"]*)"', html)
        print("Found product links:", len(product_links))
        if product_links:
            print("First link:", "https://www.flipkart.com" + product_links[0])
        # Find images on the search results
        imgs = re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\']+(?:refrigerator-new|washing-machine-new|microwave-new|television-new)[^"\']+', html)
        print("Found appliance images:", len(imgs))
        for img in set(imgs)[:5]:
            print(" -", img)
except Exception as e:
    print("Search Error:", e)
