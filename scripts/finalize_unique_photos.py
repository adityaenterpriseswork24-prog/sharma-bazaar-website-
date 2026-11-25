import json
import os

final_updates = {
    'GLD1816WORR': {
        'imageUrl': '/images/products/lg-gld1816worr-real-3.jpg',
        'gallery': [
            '/images/products/lg-gld1816worr-real-3.jpg',
            '/images/products/lg-gld1816worr-real-1.jpg',
            '/images/products/lg-gld1816worr-real-2.jpg'
        ]
    },
    'GLD2736YBES': {
        'imageUrl': '/images/products/lg-gld2736ybes-real-3.jpg',
        'gallery': [
            '/images/products/lg-gld2736ybes-real-3.jpg',
            '/images/products/unique-gld2736ybes-img1.jpg',
            '/images/products/unique-gld2736ybes-img2.jpg'
        ]
    },
    'GLD2736YBPZ': {
        'imageUrl': '/images/products/lg-gld2736ybpz-real-2.jpg',
        'gallery': [
            '/images/products/lg-gld2736ybpz-real-2.jpg',
            '/images/products/lg-gld2736ybpz-real-3.jpg'
        ]
    },
    'P8035SRAZA': {
        'imageUrl': '/images/products/unique-p8035sraza-img1.jpg',
        'gallery': [
            '/images/products/unique-p8035sraza-img1.jpg',
            '/images/products/unique-p8035sraza-img4.jpg',
            '/images/products/unique-p8035sraza-img5.jpg'
        ]
    },
    'PX100B3SD2Z': {
        'imageUrl': '/images/products/unique-px100b3sd2z-img1.jpg',
        'gallery': [
            '/images/products/unique-px100b3sd2z-img1.jpg',
            '/images/products/unique-px100b3sd2z-img2.jpg',
            '/images/products/unique-px100b3sd2z-img3.jpg'
        ]
    },
    'P8525SGAZ': {
        'imageUrl': '/images/products/lg-px85003so2z-real-3.jpg',
        'gallery': [
            '/images/products/lg-px85003so2z-real-3.jpg',
            '/images/products/lg-8-5kg-5-star-semi-automatic-washing-machine-p8525sgaz-detail-1.jpg',
            '/images/products/lg-8-5kg-5-star-semi-automatic-washing-machine-p8525sgaz-detail-2.jpg'
        ]
    },
    'PX120A3SO4Z': {
        'imageUrl': '/images/products/lg-px110b3sd2z-real-3.jpg',
        'gallery': [
            '/images/products/lg-px110b3sd2z-real-3.jpg',
            '/images/products/lg-12kg-semi-clean-side.jpg',
            '/images/products/lg-px120a3so4z-detail-1.jpg'
        ]
    },
    'MC2886BRUM': {
        'imageUrl': '/images/products/lg-mc2886brum-real-1.jpg',
        'gallery': [
            '/images/products/lg-mc2886brum-real-1.jpg',
            '/images/products/lg-mw-mc2886brum-real-2.jpg',
            '/images/products/lg-mw-mc2886brum-real-3.jpg'
        ]
    }
}

# 1. Update src/data/stored-products.json
with open('src/data/stored-products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

updated_count = 0
for p in products:
    mid = p.get('modelNumber')
    if mid in final_updates:
        for k, v in final_updates[mid].items():
            p[k] = v
        updated_count += 1
        print(f"Updated {mid}: imageUrl -> {p['imageUrl']}")

with open('src/data/stored-products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Successfully updated {updated_count} products in stored-products.json")

# 2. Update src/data/initial-products.ts
ts_content = f"// Auto-generated initial product catalog (165 products)\n"
ts_content += f"import {{ Product }} from '@/types';\n\n"
ts_content += f"export const initialProducts: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};\n\n"
ts_content += f"export const INITIAL_PRODUCTS = initialProducts;\n"

with open('src/data/initial-products.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Successfully synced initial-products.ts!")
