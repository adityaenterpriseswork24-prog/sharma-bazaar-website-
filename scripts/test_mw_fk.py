import urllib.request
import re

query = "LG MH2043DB microwave"
url = f"https://www.flipkart.com/search?q={urllib.parse.quote(query)}"
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
})

with urllib.request.urlopen(req, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')
    links = re.findall(r'href="(/[^"]+/p/itm[a-zA-Z0-9]+[^"]*)"', html)
    print("Found links:", len(links))
    if links:
        p_url = "https://www.flipkart.com" + links[0].split('?')[0]
        print("Product URL:", p_url)
        p_req = urllib.request.Request(p_url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        with urllib.request.urlopen(p_req, timeout=10) as presp:
            p_html = presp.read().decode('utf-8', errors='ignore')
            imgs = list(set(re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\'\s]+/(?:-original-|-resized-original-)[^"\'\s]+', p_html)))
            clean_imgs = [re.sub(r'/image/[0-9]+/[0-9]+/', '/image/832/832/', img).split('?')[0] for img in imgs]
            uniq = []
            for c in clean_imgs:
                if c not in uniq:
                    uniq.append(c)
            print(f"Found {len(uniq)} real photographs:")
            for u in uniq[:5]:
                print("   ->", u)
