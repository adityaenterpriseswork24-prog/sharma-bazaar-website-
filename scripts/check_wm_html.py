import urllib.request
import re

url = "http://localhost:3000/electronics?category=washing-machines"
with urllib.request.urlopen(url) as r:
    html = r.read().decode("utf-8")

imgs = re.findall(r'<img[^>]+src="([^"]+)"', html)
print(f"Total imgs: {len(imgs)}")
for i in imgs[:8]:
    print(" -", i)

# Check specifically for bosch and fhb1208
for card in html.split('<div class="group relative'):
    if "WAJ2416SIN" in card or "FHB1208Z2M" in card or "FHB1207Z2M" in card:
        m = re.search(r'alt="([^"]+)".*?src="([^"]+)"', card, re.DOTALL)
        if m:
            print("\nCard:", m.group(1))
            print("Src: ", m.group(2))
