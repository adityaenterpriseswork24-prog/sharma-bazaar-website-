import urllib.request
import json

# Test searching for model images via duckduckgo or other public endpoints
query = "LG GL-D1816WORR refrigerator"
url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
})

try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print("DDG Status 200, length:", len(html))
        import re
        links = re.findall(r'href="([^"]+)"', html)
        print("Sample links:", [l for l in links if 'flipkart' in l or 'amazon' in l or 'croma' in l][:5])
except Exception as e:
    print("DDG Error:", e)
