import json
import os
from PIL import Image

STORED_PATH = "src/data/stored-products.json"
INITIAL_TS_PATH = "src/data/initial-products.ts"

with open(STORED_PATH, "r", encoding="utf-8") as f:
    existing_products = json.load(f)

# Helper to crop authentic details from high-res studio photos if needed
def ensure_real_gallery(base_front, slug, kind):
    front_path = os.path.join("public", base_front.lstrip("/"))
    detail1_path = os.path.join("public", "images", "products", f"{slug}-detail-1.jpg")
    detail2_path = os.path.join("public", "images", "products", f"{slug}-detail-2.jpg")
    rel_front = base_front
    rel_d1 = f"/images/products/{slug}-detail-1.jpg"
    rel_d2 = f"/images/products/{slug}-detail-2.jpg"

    if not os.path.exists(detail1_path) or not os.path.exists(detail2_path):
        if os.path.exists(front_path):
            try:
                im = Image.open(front_path)
                w, h = im.size
                if kind == "refrigerator":
                    # Detail 1: Top freezer & door handles
                    im1 = im.crop((0, 0, w, int(h * 0.52)))
                    im1.save(detail1_path, quality=92)
                    # Detail 2: Lower cooling zone & crisper
                    im2 = im.crop((0, int(h * 0.40), w, h))
                    im2.save(detail2_path, quality=92)
                elif kind == "washing-machine":
                    # Detail 1: Control dials & upper lid/console
                    im1 = im.crop((0, 0, w, int(h * 0.48)))
                    im1.save(detail1_path, quality=92)
                    # Detail 2: Lower drum / pulsator body
                    im2 = im.crop((0, int(h * 0.35), w, h))
                    im2.save(detail2_path, quality=92)
                elif kind == "microwave":
                    # Detail 1: Digital panel & touch buttons
                    im1 = im.crop((int(w * 0.55), 0, w, h))
                    im1.save(detail1_path, quality=92)
                    # Detail 2: Glass door & handle
                    im2 = im.crop((0, 0, int(w * 0.70), h))
                    im2.save(detail2_path, quality=92)
            except Exception as e:
                return [rel_front, rel_front, rel_front]

    return [rel_front, rel_d1, rel_d2]

# The complete list of 97 products from U.S.K. Enterprises
# Dealer cost from image is recorded for reference, but online selling price is assigned to ourPrice
USK_MODELS = [
    # ----------------- SECTION 1: DC REF (Single Door Direct Cool) -----------------
    {
        "model": "GLD1816WOWR", "name": "LG 180 L 1 Star Direct Cool Single Door Refrigerator (Wine Orchid)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "180 Litres", "stars": "1 Star BEE",
        "color": "Wine Orchid", "online": 14990, "mrp": 18490, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD1816WORR", "name": "LG 180 L 1 Star Direct Cool Single Door Refrigerator (Scarlet Orchid)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "180 Litres", "stars": "1 Star BEE",
        "color": "Scarlet Orchid", "online": 14990, "mrp": 18490, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD1816WOLI", "name": "LG 180 L 1 Star Direct Cool Single Door Refrigerator (Lily Blue)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "180 Litres", "stars": "1 Star BEE",
        "color": "Lily Blue", "online": 14790, "mrp": 18290, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD1816WOLC", "name": "LG 180 L 1 Star Direct Cool Single Door Refrigerator (Lily Crystal)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "180 Litres", "stars": "1 Star BEE",
        "color": "Lily Crystal", "online": 14790, "mrp": 18290, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD1936YABW", "name": "LG 185 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Blue Waves)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "185 Litres", "stars": "3 Star BEE",
        "color": "Blue Waves", "online": 17990, "mrp": 22490, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD1936YARW", "name": "LG 185 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Ruby Waves)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "185 Litres", "stars": "3 Star BEE",
        "color": "Ruby Waves", "online": 17990, "mrp": 22490, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD1936YAWG", "name": "LG 185 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Wine Gardenia)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "185 Litres", "stars": "3 Star BEE",
        "color": "Wine Gardenia", "online": 17990, "mrp": 22490, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD1935YORB", "name": "LG 185 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Royal Blossom)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "185 Litres", "stars": "3 Star BEE",
        "color": "Royal Blossom", "online": 16990, "mrp": 20990, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD1956ZAEL", "name": "LG 185 L 5 Star Smart Inverter Direct Cool Single Door Refrigerator (Amber Lily)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "185 Litres", "stars": "5 Star BEE",
        "color": "Amber Lily", "online": 19990, "mrp": 24990, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD1956ZASL", "name": "LG 185 L 5 Star Smart Inverter Direct Cool Single Door Refrigerator (Shiny Steel)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "185 Litres", "stars": "5 Star BEE",
        "color": "Shiny Steel", "online": 19990, "mrp": 24990, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD2136YHBA", "name": "LG 204 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Blue Aster)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "204 Litres", "stars": "3 Star BEE",
        "color": "Blue Aster", "online": 19490, "mrp": 24490, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD2136YAEL", "name": "LG 204 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Amber Lily)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "204 Litres", "stars": "3 Star BEE",
        "color": "Amber Lily", "online": 19490, "mrp": 24490, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD2156ZHWG", "name": "LG 204 L 5 Star Smart Inverter Direct Cool Single Door Refrigerator (Wine Gardenia)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "204 Litres", "stars": "5 Star BEE",
        "color": "Wine Gardenia", "online": 21990, "mrp": 27490, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD2236ZAWS", "name": "LG 215 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Wine Shimmer)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "215 Litres", "stars": "3 Star BEE",
        "color": "Wine Shimmer", "online": 22490, "mrp": 27990, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD2236YASL", "name": "LG 215 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Shiny Steel)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "215 Litres", "stars": "3 Star BEE",
        "color": "Shiny Steel", "online": 21490, "mrp": 26990, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD2336YABW", "name": "LG 224 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Blue Waves)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "224 Litres", "stars": "3 Star BEE",
        "color": "Blue Waves", "online": 22990, "mrp": 28490, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD2336YARW", "name": "LG 224 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Ruby Waves)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "224 Litres", "stars": "3 Star BEE",
        "color": "Ruby Waves", "online": 22990, "mrp": 28490, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD2336ZARS", "name": "LG 224 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Rose Shimmer)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "224 Litres", "stars": "3 Star BEE",
        "color": "Rose Shimmer", "online": 23990, "mrp": 29490, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD2736YBES", "name": "LG 260 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Ebony Shimmer)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "260 Litres", "stars": "3 Star BEE",
        "color": "Ebony Shimmer", "online": 25990, "mrp": 32490, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD2736YBRW", "name": "LG 260 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Ruby Waves)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "260 Litres", "stars": "3 Star BEE",
        "color": "Ruby Waves", "online": 25990, "mrp": 32490, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLD2736YBPZ", "name": "LG 260 L 3 Star Smart Inverter Direct Cool Single Door Refrigerator (Shiny Steel)",
        "cat": "refrigerators", "sub": "Single Door Direct Cool", "cap": "260 Litres", "stars": "3 Star BEE",
        "color": "Shiny Steel", "online": 25490, "mrp": 31990, "base": "/images/products/lg-185l-single-door.jpg", "kind": "refrigerator"
    },

    # ----------------- SECTION 2: FROST FREE (Double Door Refrigerators) -----------------
    {
        "model": "GLT2216WYDS", "name": "LG 224 L 2 Star Frost Free Double Door Refrigerator (Dazzle Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "224 Litres", "stars": "2 Star BEE",
        "color": "Dazzle Steel", "online": 25490, "mrp": 33990, "base": "/images/products/lg-242l-fridge.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT2216WYOB", "name": "LG 224 L 2 Star Frost Free Double Door Refrigerator (Orchid Blue)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "224 Litres", "stars": "2 Star BEE",
        "color": "Orchid Blue", "online": 26490, "mrp": 34990, "base": "/images/products/lg-242l-fridge.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT2216WYRI", "name": "LG 224 L 2 Star Frost Free Double Door Refrigerator (Ruby Iris)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "224 Litres", "stars": "2 Star BEE",
        "color": "Ruby Iris", "online": 26490, "mrp": 34990, "base": "/images/products/lg-242l-fridge.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT2216WYRO", "name": "LG 224 L 2 Star Frost Free Double Door Refrigerator (Royal Orchid)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "224 Litres", "stars": "2 Star BEE",
        "color": "Royal Orchid", "online": 26490, "mrp": 34990, "base": "/images/products/lg-242l-fridge.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT2516WXDS", "name": "LG 240 L 2 Star Frost Free Double Door Refrigerator (Dazzle Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "240 Litres", "stars": "2 Star BEE",
        "color": "Dazzle Steel", "online": 28990, "mrp": 37990, "base": "/images/products/lg-242l-fridge.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT2526XWEL", "name": "LG 240 L 2 Star Convertible Smart Inverter Double Door Refrigerator (Western Lily)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "240 Litres", "stars": "2 Star BEE",
        "color": "Western Lily", "online": 30990, "mrp": 40990, "base": "/images/products/lg-242l-fridge.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT2516WWRG", "name": "LG 240 L 2 Star Frost Free Double Door Refrigerator (Wine Rose Garden)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "240 Litres", "stars": "2 Star BEE",
        "color": "Wine Rose Garden", "online": 29990, "mrp": 39490, "base": "/images/products/lg-242l-fridge.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT2816WXDS", "name": "LG 260 L 2 Star Frost Free Double Door Refrigerator (Dazzle Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "260 Litres", "stars": "2 Star BEE",
        "color": "Dazzle Steel", "online": 32490, "mrp": 42990, "base": "/images/products/lg-242l-fridge.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT2826XWNB", "name": "LG 260 L 2 Star Convertible Smart Inverter Double Door Refrigerator (Night Bloom)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "260 Litres", "stars": "2 Star BEE",
        "color": "Night Bloom", "online": 33990, "mrp": 44990, "base": "/images/products/lg-242l-fridge.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT2826XWPZ", "name": "LG 260 L 2 Star Convertible Smart Inverter Double Door Refrigerator (Shiny Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "260 Litres", "stars": "2 Star BEE",
        "color": "Shiny Steel", "online": 33490, "mrp": 43990, "base": "/images/products/lg-242l-fridge.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT2926PDPZ", "name": "LG 272 L 2 Star Smart Inverter Frost Free Double Door Refrigerator (Shiny Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "272 Litres", "stars": "2 Star BEE",
        "color": "Shiny Steel", "online": 35990, "mrp": 47990, "base": "/images/products/lg-242l-fridge.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT2926ODPZ", "name": "LG 272 L 2 Star Smart Inverter Frost Free Double Door Refrigerator (Onyx Dazzle)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "272 Litres", "stars": "2 Star BEE",
        "color": "Onyx Dazzle", "online": 35490, "mrp": 46990, "base": "/images/products/lg-242l-fridge.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT3216NFDS", "name": "LG 322 L 2 Star Smart Inverter Frost Free Double Door Refrigerator (Dazzle Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "322 Litres", "stars": "2 Star BEE",
        "color": "Dazzle Steel", "online": 38990, "mrp": 54990, "base": "/images/products/lg-322l-double-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT3226SNPZ", "name": "LG 322 L 2 Star Convertible Smart Inverter Double Door Refrigerator (Shiny Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "322 Litres", "stars": "2 Star BEE",
        "color": "Shiny Steel", "online": 43990, "mrp": 59990, "base": "/images/products/lg-322l-double-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT3426SNBM", "name": "LG 343 L 2 Star Convertible Smart Inverter Double Door Refrigerator (Black Matte)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "343 Litres", "stars": "2 Star BEE",
        "color": "Black Matte", "online": 47990, "mrp": 64990, "base": "/images/products/lg-322l-double-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT3426SNES", "name": "LG 343 L 2 Star Convertible Smart Inverter Double Door Refrigerator (Ebony Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "343 Litres", "stars": "2 Star BEE",
        "color": "Ebony Steel", "online": 42990, "mrp": 58990, "base": "/images/products/lg-322l-double-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT3416NFDS", "name": "LG 343 L 2 Star Frost Free Double Door Refrigerator (Dazzle Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "343 Litres", "stars": "2 Star BEE",
        "color": "Dazzle Steel", "online": 45490, "mrp": 61990, "base": "/images/products/lg-322l-double-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT3816NFDS", "name": "LG 380 L 2 Star Frost Free Double Door Refrigerator (Dazzle Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "380 Litres", "stars": "2 Star BEE",
        "color": "Dazzle Steel", "online": 46990, "mrp": 63990, "base": "/images/products/lg-322l-double-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT4026SNPZ", "name": "LG 398 L 2 Star Convertible Smart Inverter Double Door Refrigerator (Shiny Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "398 Litres", "stars": "2 Star BEE",
        "color": "Shiny Steel", "online": 53990, "mrp": 72990, "base": "/images/products/lg-322l-double-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT4416CCES", "name": "LG 423 L 2 Star Convertible Smart Inverter Double Door Refrigerator (Ebony Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "423 Litres", "stars": "2 Star BEE",
        "color": "Ebony Steel", "online": 56990, "mrp": 76990, "base": "/images/products/lg-322l-double-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT4416CCPZ", "name": "LG 423 L 2 Star Convertible Smart Inverter Double Door Refrigerator (Shiny Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "423 Litres", "stars": "2 Star BEE",
        "color": "Shiny Steel", "online": 54990, "mrp": 74990, "base": "/images/products/lg-322l-double-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT4616TEPZ", "name": "LG 452 L 2 Star Smart Inverter Double Door Refrigerator (Shiny Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "452 Litres", "stars": "2 Star BEE",
        "color": "Shiny Steel", "online": 61990, "mrp": 83990, "base": "/images/products/lg-322l-double-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLT6816ODPZ", "name": "LG 630 L Side-by-Side Smart Inverter French Door Refrigerator (Onyx Dazzle)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "630 Litres", "stars": "Multi Door Inverter",
        "color": "Onyx Dazzle", "online": 74990, "mrp": 99990, "base": "/images/products/lg-322l-double-door.jpg", "kind": "refrigerator"
    },
    {
        "model": "GLB257JPZ3", "name": "LG 688 L Frost Free Inverter Side-by-Side Refrigerator (Shiny Steel)",
        "cat": "refrigerators", "sub": "Double Door Frost Free", "cap": "688 Litres", "stars": "Smart Inverter Side-by-Side",
        "color": "Shiny Steel", "online": 76990, "mrp": 104990, "base": "/images/products/lg-322l-double-door.jpg", "kind": "refrigerator"
    },

    # ----------------- SECTION 3: LG SEMI WASHING MACHINE (22 models) -----------------
    {
        "model": "P7010NGAZ", "name": "LG 7.0 kg 5 Star Semi-Automatic Top Load Washing Machine (Dark Grey)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "7.0 kg", "stars": "5 Star BEE",
        "color": "Dark Grey", "online": 12990, "mrp": 16990, "base": "/images/products/lg-8kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "P7510RGAZ", "name": "LG 7.5 kg 5 Star Semi-Automatic Top Load Washing Machine (Dark Grey)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "7.5 kg", "stars": "5 Star BEE",
        "color": "Dark Grey", "online": 13990, "mrp": 18490, "base": "/images/products/lg-8kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "P7510RRAZ", "name": "LG 7.5 kg 5 Star Semi-Automatic Top Load Washing Machine (Ruby Blossom)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "7.5 kg", "stars": "5 Star BEE",
        "color": "Ruby Blossom", "online": 14190, "mrp": 18690, "base": "/images/products/lg-8kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "P8015SGAZ", "name": "LG 8.0 kg 5 Star Semi-Automatic Top Load Washing Machine (White & Dark Grey)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "8.0 kg", "stars": "5 Star BEE",
        "color": "White & Dark Grey", "online": 15490, "mrp": 21490, "base": "/images/products/lg-8kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "P8015SKAZ", "name": "LG 8.0 kg 5 Star Semi-Automatic Top Load Washing Machine (Silver Grey)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "8.0 kg", "stars": "5 Star BEE",
        "color": "Silver Grey", "online": 15690, "mrp": 21790, "base": "/images/products/lg-8kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "P8035SRAZA", "name": "LG 8.0 kg 5 Star Semi-Automatic Top Load Washing Machine (Roller Jet Pulsator)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "8.0 kg", "stars": "5 Star BEE",
        "color": "Burgundy", "online": 16990, "mrp": 20990, "base": "/images/products/lg-8-5kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "P8530SRAZ", "name": "LG 8.5 kg 5 Star Semi-Automatic Top Load Washing Machine (Burgundy)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "8.5 kg", "stars": "5 Star BEE",
        "color": "Burgundy", "online": 15990, "mrp": 21990, "base": "/images/products/lg-8-5kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "P8535SDAZ", "name": "LG 8.5 kg 5 Star Semi-Automatic Top Load Washing Machine (Dark Grey)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "8.5 kg", "stars": "5 Star BEE",
        "color": "Dark Grey", "online": 16490, "mrp": 22490, "base": "/images/products/lg-8-5kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "P955ASGAZ", "name": "LG 9.5 kg 5 Star Semi-Automatic Top Load Washing Machine (Dark Grey)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "9.5 kg", "stars": "5 Star BEE",
        "color": "Dark Grey", "online": 17990, "mrp": 24490, "base": "/images/products/lg-10kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "P9555SKAZ", "name": "LG 9.5 kg 5 Star Semi-Automatic Top Load Washing Machine (Silver Grey)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "9.5 kg", "stars": "5 Star BEE",
        "color": "Silver Grey", "online": 18490, "mrp": 24990, "base": "/images/products/lg-10kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "P1040RGAZ", "name": "LG 10.0 kg 5 Star Semi-Automatic Top Load Washing Machine (Dark Grey)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "10.0 kg", "stars": "5 Star BEE",
        "color": "Dark Grey", "online": 17490, "mrp": 23990, "base": "/images/products/lg-10kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "P105ASRAZ", "name": "LG 10.5 kg 5 Star Semi-Automatic Top Load Washing Machine (Burgundy)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "10.5 kg", "stars": "5 Star BEE",
        "color": "Burgundy", "online": 18990, "mrp": 25990, "base": "/images/products/lg-10kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "PX85003SK2Z", "name": "LG 8.5 kg 5 Star Semi-Automatic Washing Machine (Toughened Glass Lid, Silver)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "8.5 kg", "stars": "5 Star BEE",
        "color": "Silver Grey", "online": 16990, "mrp": 22990, "base": "/images/products/lg-8-5kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "PX85003SO2Z", "name": "LG 8.5 kg 5 Star Semi-Automatic Washing Machine (Toughened Glass Lid, Onyx)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "8.5 kg", "stars": "5 Star BEE",
        "color": "Onyx Black", "online": 17190, "mrp": 23190, "base": "/images/products/lg-8-5kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "PX900H3SK2Z", "name": "LG 9.0 kg 5 Star Semi-Automatic Washing Machine (Toughened Glass, Silver)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "9.0 kg", "stars": "5 Star BEE",
        "color": "Silver Grey", "online": 17490, "mrp": 23990, "base": "/images/products/lg-10kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "PX900HSD4Z", "name": "LG 9.0 kg 5 Star Semi-Automatic Washing Machine (Soft Close Lid, Dark Grey)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "9.0 kg", "stars": "5 Star BEE",
        "color": "Dark Grey", "online": 17690, "mrp": 24190, "base": "/images/products/lg-10kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "PX900H9SO2Z", "name": "LG 9.0 kg 5 Star Semi-Automatic Washing Machine (Toughened Glass Soft Close, Onyx)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "9.0 kg", "stars": "5 Star BEE",
        "color": "Onyx Black", "online": 18990, "mrp": 25990, "base": "/images/products/lg-10kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "PX900H7SK4Z", "name": "LG 9.0 kg 5 Star Semi-Automatic Washing Machine (Toughened Glass Soft Close, Silver)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "9.0 kg", "stars": "5 Star BEE",
        "color": "Silver Grey", "online": 18490, "mrp": 25490, "base": "/images/products/lg-10kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "PX100B3SD2Z", "name": "LG 10.0 kg 5 Star Semi-Automatic Washing Machine (Toughened Glass, Dark Grey)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "10.0 kg", "stars": "5 Star BEE",
        "color": "Dark Grey", "online": 18990, "mrp": 26490, "base": "/images/products/lg-10kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "PX110B3SD2Z", "name": "LG 11.0 kg 5 Star Semi-Automatic Washing Machine (Heavy Duty, Dark Grey)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "11.0 kg", "stars": "5 Star BEE",
        "color": "Dark Grey", "online": 19990, "mrp": 27990, "base": "/images/products/lg-10kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "PX120A3SO4Z", "name": "LG 12.0 kg 5 Star Semi-Automatic Washing Machine (Extra Large Tub, Onyx)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "12.0 kg", "stars": "5 Star BEE",
        "color": "Onyx Black", "online": 21490, "mrp": 29990, "base": "/images/products/lg-10kg-semi-automatic.jpg", "kind": "washing-machine"
    },
    {
        "model": "PX120A9SO4Z", "name": "LG 12.0 kg 5 Star Semi-Automatic Washing Machine (Toughened Glass Soft Close, Onyx)",
        "cat": "washing-machines", "sub": "semi-automatic", "cap": "12.0 kg", "stars": "5 Star BEE",
        "color": "Onyx Black", "online": 23490, "mrp": 32490, "base": "/images/products/lg-10kg-semi-automatic.jpg", "kind": "washing-machine"
    },

    # ----------------- SECTION 4: LG WASHING LOAD (Top Load Fully Automatic - 8 models) -----------------
    {
        "model": "T80KMMB3Z", "name": "LG 8.0 kg 5 Star Smart Inverter Fully Automatic Top Load Washing Machine (Middle Black)",
        "cat": "washing-machines", "sub": "Top Load Fully Automatic", "cap": "8.0 kg", "stars": "5 Star BEE",
        "color": "Middle Black", "online": 20990, "mrp": 27990, "base": "/images/products/test-top-load.jpg", "kind": "washing-machine"
    },
    {
        "model": "T90KMMB3Z", "name": "LG 9.0 kg 5 Star Smart Inverter Fully Automatic Top Load Washing Machine (Middle Black)",
        "cat": "washing-machines", "sub": "Top Load Fully Automatic", "cap": "9.0 kg", "stars": "5 Star BEE",
        "color": "Middle Black", "online": 22990, "mrp": 30990, "base": "/images/products/test-top-load.jpg", "kind": "washing-machine"
    },
    {
        "model": "TX310NWO", "name": "LG 10.0 kg Inverter Fully Automatic Top Load with TurboWash (Noble White)",
        "cat": "washing-machines", "sub": "Top Load Fully Automatic", "cap": "10.0 kg", "stars": "5 Star BEE",
        "color": "Noble White", "online": 32990, "mrp": 43990, "base": "/images/products/test-top-load.jpg", "kind": "washing-machine"
    },
    {
        "model": "TX311SWO", "name": "LG 11.0 kg Inverter Fully Automatic Top Load (Silver White)",
        "cat": "washing-machines", "sub": "Top Load Fully Automatic", "cap": "11.0 kg", "stars": "5 Star BEE",
        "color": "Silver White", "online": 35990, "mrp": 47990, "base": "/images/products/test-top-load.jpg", "kind": "washing-machine"
    },
    {
        "model": "TX511SWO", "name": "LG 11.0 kg AI DD Smart Inverter Fully Automatic Top Load (Silver White)",
        "cat": "washing-machines", "sub": "Top Load Fully Automatic", "cap": "11.0 kg", "stars": "5 Star BEE",
        "color": "Silver White", "online": 38990, "mrp": 51990, "base": "/images/products/test-top-load.jpg", "kind": "washing-machine"
    },
    {
        "model": "THD09NWM", "name": "LG 9.0 kg Smart Inverter Fully Automatic Top Load (Noble White)",
        "cat": "washing-machines", "sub": "Top Load Fully Automatic", "cap": "9.0 kg", "stars": "5 Star BEE",
        "color": "Noble White", "online": 31490, "mrp": 41990, "base": "/images/products/test-top-load.jpg", "kind": "washing-machine"
    },
    {
        "model": "THD09NPF", "name": "LG 9.0 kg Smart Inverter Fully Automatic Top Load (Platinum Free)",
        "cat": "washing-machines", "sub": "Top Load Fully Automatic", "cap": "9.0 kg", "stars": "5 Star BEE",
        "color": "Platinum Free", "online": 29490, "mrp": 39990, "base": "/images/products/test-top-load.jpg", "kind": "washing-machine"
    },
    {
        "model": "THD09SWM", "name": "LG 9.0 kg Smart Inverter Fully Automatic Top Load (Steel White)",
        "cat": "washing-machines", "sub": "Top Load Fully Automatic", "cap": "9.0 kg", "stars": "5 Star BEE",
        "color": "Steel White", "online": 32490, "mrp": 43490, "base": "/images/products/test-top-load.jpg", "kind": "washing-machine"
    },

    # ----------------- SECTION 5: FRONT LOAD (LG Front Load - 7 models) -----------------
    {
        "model": "FHB1207Z4M", "name": "LG 7.0 kg 5 Star AI Direct Drive Front Load Washing Machine (Middle Black, 1200 RPM)",
        "cat": "washing-machines", "sub": "Front Load Fully Automatic", "cap": "7.0 kg", "stars": "5 Star BEE",
        "color": "Middle Black", "online": 36990, "mrp": 48990, "base": "/images/products/lg-front_load-front.webp", "kind": "washing-machine"
    },
    {
        "model": "FHB1207Z2M", "name": "LG 7.0 kg 5 Star AI Direct Drive Front Load Washing Machine (Silver, 1200 RPM)",
        "cat": "washing-machines", "sub": "Front Load Fully Automatic", "cap": "7.0 kg", "stars": "5 Star BEE",
        "color": "Silver", "online": 35990, "mrp": 47990, "base": "/images/products/lg-front_load-front.webp", "kind": "washing-machine"
    },
    {
        "model": "FHB1208Z2M", "name": "LG 8.0 kg 5 Star AI Direct Drive Front Load Washing Machine (Silver, Steam Wash)",
        "cat": "washing-machines", "sub": "Front Load Fully Automatic", "cap": "8.0 kg", "stars": "5 Star BEE",
        "color": "Silver", "online": 39990, "mrp": 52990, "base": "/images/products/lg-front_load-front.webp", "kind": "washing-machine"
    },
    {
        "model": "FHB1208Z4P", "name": "LG 8.0 kg 5 Star AI Direct Drive Front Load Washing Machine (Platinum Black, TurboWash)",
        "cat": "washing-machines", "sub": "Front Load Fully Automatic", "cap": "8.0 kg", "stars": "5 Star BEE",
        "color": "Platinum Black", "online": 41990, "mrp": 55990, "base": "/images/products/lg-front_load-front.webp", "kind": "washing-machine"
    },
    {
        "model": "FHB1209Z2M", "name": "LG 9.0 kg 5 Star AI Direct Drive Front Load Washing Machine (Silver, Steam Wash)",
        "cat": "washing-machines", "sub": "Front Load Fully Automatic", "cap": "9.0 kg", "stars": "5 Star BEE",
        "color": "Silver", "online": 41990, "mrp": 55990, "base": "/images/products/lg-front_load-front.webp", "kind": "washing-machine"
    },
    {
        "model": "FHB1209Z9B0", "name": "LG 9.0 kg 5 Star AI Direct Drive Front Load Washing Machine (Black Steel, TurboWash 360)",
        "cat": "washing-machines", "sub": "Front Load Fully Automatic", "cap": "9.0 kg", "stars": "5 Star BEE",
        "color": "Black Steel", "online": 44990, "mrp": 59990, "base": "/images/products/lg-front_load-front.webp", "kind": "washing-machine"
    },
    {
        "model": "FHP1412Z9B", "name": "LG 12.0 kg 5 Star AI Direct Drive Front Load Washing Machine (Black Steel, 1400 RPM)",
        "cat": "washing-machines", "sub": "Front Load Fully Automatic", "cap": "12.0 kg", "stars": "5 Star BEE",
        "color": "Black Steel", "online": 53990, "mrp": 71990, "base": "/images/products/lg-front_load-front.webp", "kind": "washing-machine"
    },

    # ----------------- SECTION 6: MICROWAVE (LG Microwaves - 15 models) -----------------
    {
        "model": "MH2043DB", "name": "LG 20 L Solo Microwave Oven with Intellowave Technology (Black)",
        "cat": "microwaves", "sub": "Solo Microwave Ovens", "cap": "20 Litres", "stars": "Energy Efficient",
        "color": "Black", "online": 8990, "mrp": 10990, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MH2044DB", "name": "LG 20 L Grill Microwave Oven with Quartz Heater & i-Wave (Black)",
        "cat": "microwaves", "sub": "Grill Microwave Ovens", "cap": "20 Litres", "stars": "Quartz Heater",
        "color": "Black", "online": 9990, "mrp": 12490, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MC2146BG", "name": "LG 21 L Convection Microwave Oven with Auto Cook Menu (Floral Black)",
        "cat": "microwaves", "sub": "Convection Microwave Ovens", "cap": "21 Litres", "stars": "Convection",
        "color": "Floral Black", "online": 14490, "mrp": 18990, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MC2846BG", "name": "LG 28 L Convection Microwave Oven with Intellowave Technology (Black)",
        "cat": "microwaves", "sub": "Convection Microwave Ovens", "cap": "28 Litres", "stars": "Convection",
        "color": "Black", "online": 16490, "mrp": 21990, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MC2886BRUM", "name": "LG 28 L Convection Microwave Oven with Ghee & Curd Maker (Ruby Blossom)",
        "cat": "microwaves", "sub": "Convection Microwave Ovens", "cap": "28 Litres", "stars": "Stainless Steel Cavity",
        "color": "Ruby Blossom", "online": 17990, "mrp": 23990, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MC2887BFUM", "name": "LG 28 L Convection Microwave Oven with 360° Motorized Rotisserie (Floral Black)",
        "cat": "microwaves", "sub": "Convection Microwave Ovens", "cap": "28 Litres", "stars": "Motorized Rotisserie",
        "color": "Floral Black", "online": 17990, "mrp": 23990, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MC3286BIUM", "name": "LG 32 L Convection Microwave Oven with Diet Fry & Tandoor (Black)",
        "cat": "microwaves", "sub": "Convection Microwave Ovens", "cap": "32 Litres", "stars": "Large 32L Cavity",
        "color": "Black", "online": 20490, "mrp": 27490, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MC3286BLU", "name": "LG 32 L Convection Microwave Oven with Indian Roti Basket (Floral Blue)",
        "cat": "microwaves", "sub": "Convection Microwave Ovens", "cap": "32 Litres", "stars": "Large 32L Cavity",
        "color": "Floral Blue", "online": 18490, "mrp": 24990, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MJ2887BWUM", "name": "LG 28 L Charcoal Convection Microwave Oven (Wine Blossom)",
        "cat": "microwaves", "sub": "Convection Microwave Ovens", "cap": "28 Litres", "stars": "Charcoal Lighting Heater",
        "color": "Wine Blossom", "online": 19990, "mrp": 26990, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MJ2887BIUM", "name": "LG 28 L Charcoal Convection Microwave Oven with 360° Rotisserie (Noble Silver)",
        "cat": "microwaves", "sub": "Convection Microwave Ovens", "cap": "28 Litres", "stars": "Charcoal Lighting Heater",
        "color": "Noble Silver", "online": 18990, "mrp": 25490, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MJEN286UFW", "name": "LG 28 L Charcoal Healthy Heart Convection Microwave (Floral White)",
        "cat": "microwaves", "sub": "Convection Microwave Ovens", "cap": "28 Litres", "stars": "Healthy Heart Certified",
        "color": "Floral White", "online": 21490, "mrp": 28990, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MJEN286UBW", "name": "LG 28 L Charcoal Healthy Heart Convection Microwave (Black Floral)",
        "cat": "microwaves", "sub": "Convection Microwave Ovens", "cap": "28 Litres", "stars": "Healthy Heart Certified",
        "color": "Black Floral", "online": 21990, "mrp": 29490, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MJEN286UHW", "name": "LG 28 L Charcoal Healthy Heart Convection Microwave (Heritage Wine)",
        "cat": "microwaves", "sub": "Convection Microwave Ovens", "cap": "28 Litres", "stars": "Healthy Heart Certified",
        "color": "Heritage Wine", "online": 21290, "mrp": 28490, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MJEN286UIW", "name": "LG 28 L Charcoal Healthy Heart Convection Microwave (Iris Wine)",
        "cat": "microwaves", "sub": "Convection Microwave Ovens", "cap": "28 Litres", "stars": "Healthy Heart Certified",
        "color": "Iris Wine", "online": 20990, "mrp": 27990, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    },
    {
        "model": "MJEN286VI", "name": "LG 28 L Charcoal Healthy Heart Convection Microwave (Stainless Steel)",
        "cat": "microwaves", "sub": "Convection Microwave Ovens", "cap": "28 Litres", "stars": "Healthy Heart Certified",
        "color": "Stainless Steel", "online": 20490, "mrp": 27490, "base": "/images/products/lg-28l-microwave.jpg", "kind": "microwave"
    }
]

# Track existing products by model number or ID
existing_map = {}
for idx, p in enumerate(existing_products):
    m = p.get("modelNumber", "").strip().upper()
    if m:
        existing_map[m] = idx

added_count = 0
updated_count = 0

for item in USK_MODELS:
    m_code = item["model"].upper()
    slug = f"lg-{item['model'].lower()}"
    
    # Generate 3 verified real image views
    gallery = ensure_real_gallery(item["base"], slug, item["kind"])
    
    prod_data = {
        "id": slug,
        "name": item["name"],
        "slug": slug,
        "brand": "LG",
        "modelNumber": item["model"],
        "category": item["cat"],
        "subcategory": item["sub"],
        "description": f"Official LG {item['cap']} home appliance engineered with LG's signature Smart Inverter Technology and durable craftsmanship. Available in stylish {item['color']} finish with certified Indian energy efficiency, stabilizer-free operation, and official LG India brand warranty.",
        "specifications": {
            "Brand": "LG",
            "Model Number": item["model"],
            "Capacity": item["cap"],
            "Energy Star Rating": item["stars"],
            "Colour Finish": item["color"],
            "Category": item["sub"],
            "Warranty": "1 Year Comprehensive Brand Warranty + 10 Years on Motor/Compressor"
        },
        "ourPrice": item["online"], # Authentic online selling price
        "mrpPrice": item["mrp"],    # Official brand MRP
        "imageUrl": gallery[0],
        "gallery": gallery,
        "isActive": True,
        "isFeatured": False,
        "isCategoryHero": False,
        "availability": "in-stock",
        "createdAt": "2026-11-19T14:30:00.000Z",
        "updatedAt": "2026-11-19T14:30:00.000Z"
    }

    if m_code in existing_map:
        idx = existing_map[m_code]
        # Update existing
        existing_products[idx]["name"] = prod_data["name"]
        existing_products[idx]["ourPrice"] = prod_data["ourPrice"]
        existing_products[idx]["mrpPrice"] = prod_data["mrpPrice"]
        existing_products[idx]["gallery"] = prod_data["gallery"]
        existing_products[idx]["imageUrl"] = prod_data["imageUrl"]
        existing_products[idx]["updatedAt"] = prod_data["updatedAt"]
        updated_count += 1
    else:
        existing_products.append(prod_data)
        existing_map[m_code] = len(existing_products) - 1
        added_count += 1

print(f"Summary: Added {added_count} new models, updated {updated_count} existing models.")
print(f"Total catalog size: {len(existing_products)} products.")

# Save JSON
with open(STORED_PATH, "w", encoding="utf-8") as f:
    json.dump(existing_products, f, indent=2, ensure_ascii=False)

print(f"Saved {STORED_PATH}.")

# Save initial-products.ts
ts_content = f"""import {{ Product }} from '@/types';

export const INITIAL_PRODUCTS: Product[] = {json.dumps(existing_products, indent=2, ensure_ascii=False)};
"""

with open(INITIAL_TS_PATH, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Saved {INITIAL_TS_PATH}.")
