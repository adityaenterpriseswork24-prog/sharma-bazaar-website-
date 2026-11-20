import re

with open('c:/Users/anura/.gemini/antigravity/brain/c1512f85-ac14-44f5-80ee-196a5d7a681f/.user_uploaded/media_1795091033153_c86de41e.html', encoding='utf-8', errors='ignore') as f:
    html = f.read()

print("HTML length:", len(html))

# Find cards or products
card_chunks = html.split('class="card"')
print("Card count:", len(card_chunks) - 1)

for idx, chunk in enumerate(card_chunks[1:5], 1):
    print(f"\n--- Card {idx} ---")
    title_m = re.search(r'<h3>(.*?)</h3>', chunk, re.DOTALL)
    if title_m:
        print("Title:", title_m.group(1).strip())
    model_m = re.search(r'Model:?\s*<strong>(.*?)</strong>', chunk, re.IGNORECASE)
    if not model_m:
        model_m = re.search(r'([A-Z0-9-]{6,})', chunk)
    print("Model match:", model_m.group(1) if model_m else "N/A")
    imgs = re.findall(r'src="([^"]+)"', chunk)
    print("Images:", imgs)
    links = re.findall(r'href="([^"]+)"', chunk)
    print("Links:", links)
