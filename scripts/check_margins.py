from PIL import Image

for i in [1, 2, 3, 4]:
    im = Image.open(f'public/images/products/test-angle-{i}.jpg')
    w, h = im.size
    # Sample top 10%
    top = im.crop((0, 0, w, int(h*0.1)))
    colors = top.getcolors(maxcolors=100000)
    bg = max(colors, key=lambda c: c[0])
    print(f"Angle {i} top margin dominant color: {bg[1]} (covers {bg[0]/(w*int(h*0.1))*100:.1f}%)")
