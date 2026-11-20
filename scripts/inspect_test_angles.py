from PIL import Image
import numpy as np

for i in [1, 2, 3, 4]:
    im = Image.open(f'public/images/products/test-angle-{i}.jpg')
    w, h = im.size
    # Door area is center
    center = im.crop((int(w*0.25), int(h*0.35), int(w*0.75), int(h*0.75)))
    c_arr = np.array(center)
    # Check if door circle is visible (std dev of pixels)
    std = np.std(c_arr)
    # Check top panel (dial)
    top = im.crop((int(w*0.1), int(h*0.05), int(w*0.9), int(h*0.25)))
    top_std = np.std(np.array(top))
    print(f"Angle {i}: size={w}x{h}, center_std={std:.1f}, top_std={top_std:.1f}")
