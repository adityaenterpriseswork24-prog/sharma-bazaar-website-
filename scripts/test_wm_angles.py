import urllib.request
from PIL import Image
import io

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for name, u in [
    ("imahrbubgvyc8khg", "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/4/r/s/-original-imahrbubgvyc8khg.jpeg"),
    ("imahrbubhvmgmcpf", "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/b/v/x/-original-imahrbubhvmgmcpf.jpeg"),
    ("imahprhhh4hay5jj", "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/s/f/j/-original-imahprhhh4hay5jj.jpeg"),
    ("imahprhh8gsegmhh", "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/q/u/e/-original-imahprhh8gsegmhh.jpeg")
]:
    req = urllib.request.Request(u, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as resp:
        im = Image.open(io.BytesIO(resp.read())).convert('RGB')
    w, h = im.size
    box = im.crop((int(w * 0.3), int(h * 0.3), int(w * 0.7), int(h * 0.7)))
    colors = box.getcolors(maxcolors=200000)
    r = sum(c[0]*c[1][0] for c in colors)/sum(c[0] for c in colors)
    g = sum(c[0]*c[1][1] for c in colors)/sum(c[0] for c in colors)
    b = sum(c[0]*c[1][2] for c in colors)/sum(c[0] for c in colors)
    print(f"{name}: {w}x{h}, RGB=({r:.0f},{g:.0f},{b:.0f})")
