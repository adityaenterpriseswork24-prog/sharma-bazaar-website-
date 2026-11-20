import urllib.request
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def inspect_product_page(slug):
    url = f"https://www.flipkart.com/{slug}/p/itm"
    # Search for this exact slug to get full URL with itm id
    s_url = f"https://www.flipkart.com/search?q={urllib.parse.quote(slug.replace('-', ' '))}"
    req = urllib.request.Request(s_url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    links = [l for l in re.findall(r'href="(/[^"]+/p/itm[a-zA-Z0-9]+[^"]*)"', html) if slug in l]
    if not links:
        print("Could not find full link for", slug)
        return
    full_url = "https://www.flipkart.com" + links[0]
    print(f"\nInspecting {slug} -> {full_url}")
    preq = urllib.request.Request(full_url, headers=HEADERS)
    with urllib.request.urlopen(preq, timeout=10) as presp:
        phtml = presp.read().decode('utf-8', errors='ignore')
        
    imgs = list(set(re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\'\s]+/(?:-original-|-resized-original-)[^"\'\s]+', phtml)))
    clean_imgs = [re.sub(r'/image/[0-9]+/[0-9]+/', '/image/832/832/', img).split('?')[0] for img in imgs]
    uniq = []
    for c in clean_imgs:
        if c not in uniq:
            uniq.append(c)
    print(f"Found {len(uniq)} images for {slug}:")
    for u in uniq[:5]:
        print(" -", u)

inspect_product_page("lg-8-kg-fully-automatic-front-load-washing-machine-silver")
inspect_product_page("bosch-7-kg-steam-fully-automatic-front-load-washing-machine-in-built-heater-silver")
