import urllib.request
import ssl
import certifi
import re
import json

ctx = ssl.create_default_context(cafile=certifi.where())

url = "https://www.flipkart.com/haier-9-kg-semi-automatic-top-load-washing-machine-black/p/itm2e947c69811e5"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})

try:
    with urllib.request.urlopen(req, context=ctx) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        matches = set(re.findall(r'https://rukminim\d\.flixcart\.com/image/[^\"\'\s]+\.(?:jpeg|jpg|png)', html))
        print(f"Found {len(matches)} images:")
        for m in sorted(matches):
            if "washing-machine" in m:
                print(m)
except Exception as e:
    print("Error:", e)
