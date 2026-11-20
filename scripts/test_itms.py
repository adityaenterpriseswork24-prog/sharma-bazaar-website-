import urllib.request
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for itm in ['itm617942fd64a44', 'itmfff9278c10285', 'itm92dd4ea3d8a20']:
    url = f"https://www.flipkart.com/p/p/p/{itm}"
    # or get direct
    s_url = f"https://www.flipkart.com/search?q={itm}"
    req = urllib.request.Request(s_url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    titles = re.findall(r'<div class="KzDlHZ">(.*?)</div>', html) or re.findall(r'title="([^"]+)"', html)
    print(f"{itm} title:", titles[:2])
