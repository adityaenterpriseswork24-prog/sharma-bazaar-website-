from PIL import Image

for i in [1, 2, 3, 4]:
    im = Image.open(f'public/images/products/silver-view-{i}.jpg')
    w, h = im.size
    print(f"silver-view-{i}: {w}x{h}, aspect={w/h:.2f}")
    # Sample upper, middle, lower
    u = im.crop((int(w*0.2), int(h*0.1), int(w*0.8), int(h*0.3)))
    m = im.crop((int(w*0.2), int(h*0.35), int(w*0.8), int(h*0.65)))
    l = im.crop((int(w*0.2), int(h*0.7), int(w*0.8), int(h*0.9)))
    
    def avg_rgb(crop):
        cols = crop.getcolors(maxcolors=200000)
        r = sum(c[0]*c[1][0] for c in cols)/sum(c[0] for c in cols)
        g = sum(c[0]*c[1][1] for c in cols)/sum(c[0] for c in cols)
        b = sum(c[0]*c[1][2] for c in cols)/sum(c[0] for c in cols)
        return int(r), int(g), int(b)

    print(f"  upper RGB: {avg_rgb(u)}, middle RGB: {avg_rgb(m)}, lower RGB: {avg_rgb(l)}")
