import json
import os

fixes = {
    # 1. Microwaves
    "MJEN286VI": {
        "imageUrl": "/images/products/lg-mjen286vi-real-2.jpg",
        "gallery": [
            "/images/products/lg-mjen286vi-real-2.jpg",
            "/images/products/lg-mjen286vi-detail-1.jpg",
            "/images/products/lg-mjen286vi-detail-2.jpg"
        ]
    },
    "MJEN286UHW": {
        "imageUrl": "/images/products/lg-mjen286uhw-authentic-front.jpg",
        "gallery": [
            "/images/products/lg-mjen286uhw-authentic-front.jpg",
            "/images/products/lg-mjen286uhw-real-1.jpg",
            "/images/products/lg-mjen286uhw-detail-1.jpg"
        ]
    },
    "MC3286BLU": {
        "name": "LG 32 L Convection Microwave Oven with Indian Roti Basket (Black)",
        "imageUrl": "/images/products/lg-mw-mc3286blu-real-1.jpg",
        "gallery": [
            "/images/products/lg-mw-mc3286blu-real-1.jpg",
            "/images/products/lg-mw-mc3286blu-real-2.jpg"
        ]
    },
    "MH2044DB": {
        "imageUrl": "/images/products/lg-mw-mh2044db-real-1.jpg",
        "gallery": [
            "/images/products/lg-mw-mh2044db-real-1.jpg",
            "/images/products/lg-solo-2.jpg",
            "/images/products/lg-mh2044db-real-1.jpg"
        ]
    },
    "MC2887BFUM": {
        "imageUrl": "/images/products/lg-mw-mc2887bfum-real-1.jpg",
        "gallery": [
            "/images/products/lg-mw-mc2887bfum-real-1.jpg",
            "/images/products/lg-mc2887bfum-detail-1.jpg"
        ]
    },
    "MJEN286UIW": {
        "imageUrl": "/images/products/lg-mw-mjen286uiw-real-1.jpg",
        "gallery": [
            "/images/products/lg-mw-mjen286uiw-real-1.jpg",
            "/images/products/lg-mjen286uiw-real-2.jpg"
        ]
    },

    # 2. Washing Machines
    "PX120A9SO4Z": {
        "imageUrl": "/images/products/lg-px120a3so4z-authentic-front.jpg",
        "gallery": [
            "/images/products/lg-px120a3so4z-authentic-front.jpg",
            "/images/products/lg-px120a9so4z-detail-1.jpg",
            "/images/products/lg-px120a9so4z-detail-2.jpg"
        ]
    },
    "P955ASGAZ": {
        "imageUrl": "/images/products/lg-p955asgaz-real-2.jpg",
        "gallery": [
            "/images/products/lg-p955asgaz-real-2.jpg",
            "/images/products/lg-p9555skaz-real-1.jpg"
        ]
    },
    "P8530SRAZ": {
        "imageUrl": "/images/products/lg-p8530sraz-real-2.jpg",
        "gallery": [
            "/images/products/lg-p8530sraz-real-2.jpg",
            "/images/products/lg-p8530sraz-detail-1.jpg"
        ]
    },
    "PX100B3SD2Z": {
        "imageUrl": "/images/products/lg-px100b3sd2z-real-1.jpg",
        "gallery": [
            "/images/products/lg-px100b3sd2z-real-1.jpg",
            "/images/products/lg-px100b3sd2z-detail-1.jpg"
        ]
    },

    # 3. Refrigerators
    "GLT6816ODPZ": {
        "name": "LG 674 L Frost Free Double Door Refrigerator (Shiny Steel)",
        "imageUrl": "/images/products/lg-glt6816odpz-verified-1.jpg",
        "gallery": [
            "/images/products/lg-glt6816odpz-verified-1.jpg",
            "/images/products/lg-glt6816odpz-verified-3.jpg",
            "/images/products/lg-glt6816odpz-verified-2.jpg"
        ]
    },
    "GLT2216WYDS": {
        "imageUrl": "/images/products/lg-glt2216wyds-clean-front.jpg",
        "gallery": [
            "/images/products/lg-glt2216wyds-clean-front.jpg",
            "/images/products/lg-glt2216wyds-clean-v2.jpg",
            "/images/products/lg-glt2216wyds-detail-1.jpg"
        ]
    },
    "GLD1956ZAEL": {
        "imageUrl": "/images/products/lg-gld1956zael-clean-front.jpg",
        "gallery": [
            "/images/products/lg-gld1956zael-clean-front.jpg",
            "/images/products/lg-gld1956zael-clean-v2.jpg"
        ]
    },
    "GLD2136YAEL": {
        "imageUrl": "/images/products/lg-gld2136yael-lily_1.jpg",
        "gallery": [
            "/images/products/lg-gld2136yael-lily_1.jpg",
            "/images/products/lg-gld2136yael-lily_0.jpg"
        ]
    },
    "GLD2136YHBA": {
        "imageUrl": "/images/products/lg-gld2136yhba-aster_1.jpg",
        "gallery": [
            "/images/products/lg-gld2136yhba-aster_1.jpg",
            "/images/products/lg-gld2136yhba-real-2.jpg"
        ]
    },
    "GLD2736YBES": {
        "imageUrl": "/images/products/lg-gld2736ybes-authentic-front.jpg",
        "gallery": [
            "/images/products/lg-gld2736ybes-authentic-front.jpg",
            "/images/products/lg-gld2736ybes-clean-front.jpg"
        ]
    },
    "GLD2736YBPZ": {
        "imageUrl": "/images/products/lg-gld2736ybes-clean-front.jpg",
        "gallery": [
            "/images/products/lg-gld2736ybes-clean-front.jpg"
        ]
    },
    "GLT4026SNPZ": {
        "imageUrl": "/images/products/lg-glt4026snpz-clean-front.jpg",
        "gallery": [
            "/images/products/lg-glt4026snpz-clean-front.jpg",
            "/images/products/lg-glt4026snpz-clean-v2.jpg"
        ]
    },

    # 4. Televisions
    "32LB651CPLA.ATR": {
        "imageUrl": "/images/products/lg-32-inch-full-hd-smart-tv-32lb651cpla-clean-studio.jpg",
        "gallery": [
            "/images/products/lg-32-inch-full-hd-smart-tv-32lb651cpla-clean-studio.jpg",
            "/images/products/lg-32-inch-fhd-tv.jpg"
        ]
    },
    "Samsung LED 32H4600": {
        "imageUrl": "/images/products/samsung-32-inch-h4600-tv-clean-studio.jpg",
        "gallery": [
            "/images/products/samsung-32-inch-h4600-tv-clean-studio.jpg",
            "/images/products/samsung-32-inch-h4600-tv-clean-side.jpg"
        ]
    },
    "UA32H4680FUXXL": {
        "imageUrl": "/images/products/samsung-32-inch-hd-ready-smart-tv-clean-studio.jpg",
        "gallery": [
            "/images/products/samsung-32-inch-hd-ready-smart-tv-clean-studio.jpg",
            "/images/products/samsung-32-inch-h4600-tv-clean-side.jpg"
        ]
    },
    "UA43F5600FUXXL": {
        "imageUrl": "/images/products/samsung-43-inch-full-hd-smart-tv-clean-studio.jpg",
        "gallery": [
            "/images/products/samsung-43-inch-full-hd-smart-tv-clean-studio.jpg",
            "/images/products/samsung-43-inch-fhd-tv-detail-1.jpg"
        ]
    }
}

# 1. Update src/data/stored-products.json
with open('src/data/stored-products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

updated_count = 0
for p in products:
    mid = p.get('modelNumber', '')
    if mid in fixes:
        fix = fixes[mid]
        for k, v in fix.items():
            p[k] = v
        updated_count += 1
        print(f"Updated {mid}: imageUrl -> {p['imageUrl']}")

with open('src/data/stored-products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Successfully updated {updated_count} products in stored-products.json")

# 2. Update src/data/initial-products.ts
# Read stored-products.json and write initial-products.ts with TypeScript export
ts_content = f"// Auto-generated initial product catalog (165 products)\n"
ts_content += f"import {{ Product }} from '@/types/product';\n\n"
ts_content += f"export const initialProducts: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};\n"

with open('src/data/initial-products.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Successfully synced initial-products.ts!")
