import json
import os
import urllib.request
import ssl
import certifi

ctx = ssl.create_default_context(cafile=certifi.where())

# Image mapping for each platform series (front, interior/open, angle/panel)
# We download authentic high-res photos for each platform
SERIES_IMAGE_SOURCES = {
    # 1. DC REF 180L / 185L Direct Cool
    "dc_185l": {
        "front": "https://img-prd-pim.poorvika.com/product/lg-185-litres-3-star-single-door-refrigerator-gl-d1935yarw-aster-waltz-Front-View.webp",
        "open": "https://img-prd-pim.poorvika.com/product/lg-185-litres-3-star-single-door-refrigerator-gl-d1935yarw-aster-waltz-Door-Open-View.webp",
        "angle": "https://img-prd-pim.poorvika.com/product/lg-185-litres-3-star-single-door-refrigerator-gl-d1935yarw-aster-waltz-Left-Side-View.webp"
    },
    # 2. DC REF 204L / 215L / 224L Direct Cool
    "dc_215l": {
        "front": "https://img-prd-pim.poorvika.com/product/lg-215-litres-4-star-single-door-refrigerator-gl-d221abey-blue-euphoria-Front-View.webp",
        "open": "https://img-prd-pim.poorvika.com/product/lg-215-litres-4-star-single-door-refrigerator-gl-d221abey-blue-euphoria-Door-Open-View.webp",
        "angle": "https://img-prd-pim.poorvika.com/product/lg-215-litres-4-star-single-door-refrigerator-gl-d221abey-blue-euphoria-Left-Side-View.webp"
    },
    # 3. Frost Free 240L / 260L Double Door
    "ff_260l": {
        "front": "https://img-prd-pim.poorvika.com/product/lg-242-litres-3-star-double-door-refrigerator-gl-i292rpzx-shiny-steel-Front-View.webp",
        "open": "https://img-prd-pim.poorvika.com/product/lg-242-litres-3-star-double-door-refrigerator-gl-i292rpzx-shiny-steel-Door-Open-View.webp",
        "angle": "https://img-prd-pim.poorvika.com/product/lg-242-litres-3-star-double-door-refrigerator-gl-i292rpzx-shiny-steel-Left-Side-View.webp"
    },
    # 4. Frost Free 322L / 343L Double Door
    "ff_340l": {
        "front": "https://img-prd-pim.poorvika.com/product/lg-322-litres-3-star-double-door-refrigerator-gl-t342vesx-ebony-steel-Front-View.webp",
        "open": "https://img-prd-pim.poorvika.com/product/lg-322-litres-3-star-double-door-refrigerator-gl-t342vesx-ebony-steel-Door-Open-View.webp",
        "angle": "https://img-prd-pim.poorvika.com/product/lg-322-litres-3-star-double-door-refrigerator-gl-t342vesx-ebony-steel-Left-Side-View.webp"
    },
    # 5. Side by Side 630L / 688L
    "ff_side_by_side": {
        "front": "https://img-prd-pim.poorvika.com/product/lg-674-litres-frost-free-inverter-side-by-side-refrigerator-gl-b257epz3-shiny-steel-Front-View.webp",
        "open": "https://img-prd-pim.poorvika.com/product/lg-674-litres-frost-free-inverter-side-by-side-refrigerator-gl-b257epz3-shiny-steel-Door-Open-View.webp",
        "angle": "https://img-prd-pim.poorvika.com/product/lg-674-litres-frost-free-inverter-side-by-side-refrigerator-gl-b257epz3-shiny-steel-Left-Side-View.webp"
    },
    # 6. LG Semi-Automatic 7kg - 8.5kg
    "semi_8kg": {
        "front": "https://img-prd-pim.poorvika.com/product/lg-8-kg-5-star-semi-automatic-top-load-washing-machine-p8015sgaz-dark-grey-Front-View.webp",
        "open": "https://img-prd-pim.poorvika.com/product/lg-8-kg-5-star-semi-automatic-top-load-washing-machine-p8015sgaz-dark-grey-Top-View.webp",
        "angle": "https://img-prd-pim.poorvika.com/product/lg-8-kg-5-star-semi-automatic-top-load-washing-machine-p8015sgaz-dark-grey-Back-View.webp"
    },
    # 7. LG Semi-Automatic 9kg - 12kg (Toughened Glass Soft Close)
    "semi_10kg": {
        "front": "https://img-prd-pim.poorvika.com/product/lg-10-kg-5-star-semi-automatic-top-load-washing-machine-p1040rgaz-dark-grey-Front-View.webp",
        "open": "https://img-prd-pim.poorvika.com/product/lg-10-kg-5-star-semi-automatic-top-load-washing-machine-p1040rgaz-dark-grey-Top-View.webp",
        "angle": "https://img-prd-pim.poorvika.com/product/lg-10-kg-5-star-semi-automatic-top-load-washing-machine-p1040rgaz-dark-grey-Back-View.webp"
    },
    # 8. LG Top Load Fully Automatic 8kg - 11kg
    "top_load": {
        "front": "https://img-prd-pim.poorvika.com/product/lg-8-0kg-5-star-smart-inverter-fully-automatic-top-load-washing-machine-t80kmmb3z-middle-black-Front-View.webp",
        "open": "https://img-prd-pim.poorvika.com/product/lg-8-0kg-5-star-smart-inverter-fully-automatic-top-load-washing-machine-t80kmmb3z-middle-black-Top-View.webp",
        "angle": "https://img-prd-pim.poorvika.com/product/lg-8-0kg-5-star-smart-inverter-fully-automatic-top-load-washing-machine-t80kmmb3z-middle-black-Left-Side-View.webp"
    },
    # 9. LG Front Load Fully Automatic 7kg - 12kg
    "front_load": {
        "front": "https://img-prd-pim.poorvika.com/product/Lg-8-0kg-fully-automatic-front-load-washing-machine-inverter-direct-drive-fhb1208z2m-middle-black-Front-View.webp",
        "open": "https://img-prd-pim.poorvika.com/product/Lg-8-0kg-fully-automatic-front-load-washing-machine-inverter-direct-drive-fhb1208z2m-middle-black-Top-View.webp",
        "angle": "https://img-prd-pim.poorvika.com/product/Lg-8-0kg-fully-automatic-front-load-washing-machine-inverter-direct-drive-fhb1208z2m-middle-black-Back-View.webp"
    },
    # 10. LG Solo / Grill Microwave 20L
    "mw_solo": {
        "front": "https://img-prd-pim.poorvika.com/product/lg-20-litres-solo-microwave-oven-ms2043db-black-Front-View.webp",
        "open": "https://img-prd-pim.poorvika.com/product/lg-20-litres-solo-microwave-oven-ms2043db-black-Door-Open-View.webp",
        "angle": "https://img-prd-pim.poorvika.com/product/lg-20-litres-solo-microwave-oven-ms2043db-black-Left-Side-View.webp"
    },
    # 11. LG Convection Microwave 21L - 32L
    "mw_convection": {
        "front": "https://img-prd-pim.poorvika.com/product/lg-28-litres-convection-microwave-oven-mc2886brum-ruby-blossom-Front-View.webp",
        "open": "https://img-prd-pim.poorvika.com/product/lg-28-litres-convection-microwave-oven-mc2886brum-ruby-blossom-Door-Open-View.webp",
        "angle": "https://img-prd-pim.poorvika.com/product/lg-28-litres-convection-microwave-oven-mc2886brum-ruby-blossom-Left-Side-View.webp"
    },
    # 12. LG Charcoal Convection Microwave 28L
    "mw_charcoal": {
        "front": "https://img-prd-pim.poorvika.com/product/lg-28-litres-charcoal-convection-microwave-oven-mj2886bfum-black-Front-View.webp",
        "open": "https://img-prd-pim.poorvika.com/product/lg-28-litres-charcoal-convection-microwave-oven-mj2886bfum-black-Door-Open-View.webp",
        "angle": "https://img-prd-pim.poorvika.com/product/lg-28-litres-charcoal-convection-microwave-oven-mj2886bfum-black-Left-Side-View.webp"
    }
}

os.makedirs("public/images/products", exist_ok=True)

# Download all 3-angle series assets
print("Downloading 3-angle real image packages...")
DOWNLOADED_IMAGES = {}
for series_key, views in SERIES_IMAGE_SOURCES.items():
    DOWNLOADED_IMAGES[series_key] = {}
    for view_type, url in views.items():
        fname = f"lg-{series_key}-{view_type}.webp"
        rel_path = f"/images/products/{fname}"
        local_path = os.path.join("public", "images", "products", fname)
        DOWNLOADED_IMAGES[series_key][view_type] = rel_path
        
        if not os.path.exists(local_path) or os.path.getsize(local_path) < 1000:
            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
                with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
                    data = resp.read()
                    if len(data) > 1000:
                        with open(local_path, "wb") as f:
                            f.write(data)
                        print(f" [OK] Downloaded {local_path} ({len(data)} bytes)")
                    else:
                        print(f" [ERR] Data too small for {local_path}")
            except Exception as e:
                print(f" [FAIL] {url} -> {e}")
        else:
            print(f" [CACHE] Already exists: {local_path}")

print("Image download check finished.")
