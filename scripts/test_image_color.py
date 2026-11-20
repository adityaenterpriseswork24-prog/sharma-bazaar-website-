import urllib.request
from PIL import Image
import io

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

urls = [
    ("imahn7csnx7gvspb", "https://rukminim2.flixcart.com/image/832/832/xif0q/refrigerator-new/r/8/1/-resized-original-imahn7csnx7gvspb.jpeg"),
    ("imahn7cdjpyczufs", "https://rukminim2.flixcart.com/image/832/832/xif0q/refrigerator-new/x/z/u/-original-imahn7cdjpyczufs.jpeg")
]

for name, url in urls:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as resp:
        im = Image.open(io.BytesIO(resp.read())).convert('RGB')
    w, h = im.size
    # Sample middle center of door (door is usually middle 40-70% height, 30-70% width)
    door_box = im.crop((int(w * 0.35), int(h * 0.35), int(w * 0.65), int(h * 0.65)))
    colors = door_box.getcolors(maxcolors=100000)
    # average color
    r_total = sum(c[0] * c[1][0] for c in colors)
    g_total = sum(c[0] * c[1][1] for c in colors)
    b_total = sum(c[0] * c[1][2] for c in colors)
    n = sum(c[0] for c in colors)
    r, g, b = int(r_total/n), int(g_total/n), int(b_total/n)
    print(f"{name} avg RGB: ({r}, {g}, {b})")
    if r > b + 20 and r > g + 20:
        print(f" -> RED / SCARLET / WINE")
    elif b > r + 15:
        print(f" -> BLUE")
    elif abs(r - g) < 15 and abs(g - b) < 15:
        print(f" -> STEEL / GREY / SILVER")
    else:
        print(f" -> OTHER")
