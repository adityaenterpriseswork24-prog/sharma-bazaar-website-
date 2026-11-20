import urllib.request
import urllib.parse
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def get_front_load_images(brand, model, color, cap):
    q = f"{brand} {cap} front load washing machine {color}".strip()
    url = f"https://www.flipkart.com/search?q={urllib.parse.quote(q)}"
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        
    links = [l for l in re.findall(r'href="(/[^"]+/p/itm[a-zA-Z0-9]+[^"]*)"', html) if l.lower().startswith('/' + brand.lower())]
    # Filter by color if possible
    color_links = [l for l in links if color.lower() in l.lower()]
    chosen_link = color_links[0] if color_links else (links[0] if links else None)
    
    if not chosen_link:
        print(f"[{model}] No link found for {q}")
        return
        
    full_url = "https://www.flipkart.com" + chosen_link.split('?')[0]
    print(f"[{model}] {chosen_link.split('/p/')[0]} -> {full_url}")
    preq = urllib.request.Request(full_url, headers=HEADERS)
    with urllib.request.urlopen(preq, timeout=10) as presp:
        phtml = presp.read().decode('utf-8', errors='ignore')
        
    imgs = list(set(re.findall(r'https://rukminim[0-9]\.flixcart\.com/image/[^"\'\s]+/(?:-original-|-resized-original-)[^"\'\s]+', phtml)))
    clean_imgs = [re.sub(r'/image/[0-9]+/[0-9]+/', '/image/832/832/', img).split('?')[0] for img in imgs]
    print(f"  Found {len(clean_imgs)} images. Top 3:")
    for c in clean_imgs[:3]:
        print("   *", c)

get_front_load_images("LG", "FHB1207Z2M", "Silver", "7 kg")
get_front_load_images("LG", "FHB1208Z2M", "Silver", "8 kg")
get_front_load_images("LG", "FHB1208Z4P", "Black", "8 kg")
get_front_load_images("LG", "FHB1209Z2M", "Silver", "9 kg")
get_front_load_images("LG", "FHB1209Z9B0", "Black", "9 kg")
get_front_load_images("LG", "FHP1412Z9B", "Black", "12 kg")
get_front_load_images("Bosch", "WAJ2416SIN", "Silver", "7 kg")
