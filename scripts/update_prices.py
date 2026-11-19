import json
import os

STORED_PATH = "src/data/stored-products.json"
INITIAL_TS_PATH = "src/data/initial-products.ts"

with open(STORED_PATH, "r", encoding="utf-8") as f:
    products = json.load(f)

# Pricing updates mapping: id -> {ourPrice, mrpPrice, optional name, brand, subcategory, description, specifications}
UPDATES = {
    "haier-165l-1-star-direct-cool-hrd-1851smsa-p": {
        "ourPrice": 12990,
        "mrpPrice": 17390,
    },
    "godrej-238l-2-star-inverter-frost-free-rt-eonalpha-270bn": {
        "ourPrice": 21990,
        "mrpPrice": 32800,
    },
    "godrej-244l-2-star-inverter-frost-free-rt-eoncrystal-280b": {
        "ourPrice": 25990,
        "mrpPrice": 40990,
    },
    "lg-185l-3-star-smart-inverter-gld1935yarw": {
        "ourPrice": 16490,
        "mrpPrice": 20490,
    },
    "lg-322l-2-star-smart-inverter-gl-t3216vvyds": {
        "ourPrice": 37990,
        "mrpPrice": 54990,
    },
    "whirlpool-8kg-5-star-front-load-ults80": {
        "name": "Godrej 8 kg 5 Star Semi-Automatic Top Load Washing Machine (Edge Ultima, Steel Grey)",
        "brand": "Godrej",
        "subcategory": "semi-automatic",
        "description": "An 8 kg 5-star semi-automatic washing machine featuring a high-speed 1440 RPM spin motor, toughened glass soft-shut lid, rust-proof polypropylene body, and active soak technology for superior stain removal in Indian water conditions.",
        "ourPrice": 13990,
        "mrpPrice": 18200,
        "specifications": {
            "Capacity": "8 kg",
            "Energy Rating": "5 Star BEE",
            "Type": "Semi-Automatic Top Load",
            "Spin Speed": "1440 RPM",
            "Pulsator": "Active Soak & Tri-Roto Scrub Pulsator",
            "Body": "100% Rust-Proof Polypropylene Body",
            "Lid": "Toughened Glass Soft-Shut Lid",
            "Motor Warranty": "5 Years Motor Warranty"
        }
    },
    "whirlpool-9kg-inverter-front-load-edge": {
        "name": "Godrej 7.5 kg 5 Star Semi-Automatic Top Load Washing Machine (Edge Classic, Midnight Grey)",
        "brand": "Godrej",
        "subcategory": "semi-automatic",
        "description": "A reliable 7.5 kg 5-star semi-automatic top-load washing machine featuring a rust-proof body, powerful wash motor, 1400 RPM spin cycle, and rain shower rinse mechanism for water-efficient daily laundry.",
        "ourPrice": 10490,
        "mrpPrice": 16900,
        "specifications": {
            "Capacity": "7.5 kg",
            "Energy Rating": "5 Star BEE",
            "Type": "Semi-Automatic Top Load",
            "Spin Speed": "1400 RPM",
            "Wash Technology": "Power Wash & Rain Shower Rinse",
            "Body": "100% Rust-Proof Polypropylene",
            "Motor Warranty": "5 Years Motor Warranty"
        }
    },
    "samsung-8kg-digital-inverter-front-load-wt80f4560gd": {
        "name": "Samsung 8 kg 5 Star Semi-Automatic Top Load Washing Machine (Hexa Storm Pulsator, WT80F4560GD)",
        "brand": "Samsung",
        "subcategory": "semi-automatic",
        "description": "An 8 kg 5-star energy rated semi-automatic washing machine with Hexa Storm Pulsator for dynamic multi-directional water flow, Magic Filter to capture lint, Air Turbo Drying system, and rat protection body.",
        "ourPrice": 14990,
        "mrpPrice": 18490,
        "specifications": {
            "Capacity": "8 kg",
            "Energy Rating": "5 Star BEE",
            "Type": "Semi-Automatic Top Load",
            "Pulsator": "Hexa Storm Pulsator",
            "Drying System": "Air Turbo Drying System",
            "Filter": "Magic Filter (Dual Lint Filter)",
            "Body": "Non-Corrosive Rust-Proof Body",
            "Motor Warranty": "5 Years Motor Warranty"
        }
    },
    "haier-3-5kg-compact-semi-automatic-htw85-186bbk": {
        "name": "Haier 8.5 kg 5 Star Semi-Automatic Top Load Washing Machine (HTW85-186BBK, Black)",
        "brand": "Haier",
        "subcategory": "semi-automatic",
        "modelNumber": "HTW85-186BBK",
        "description": "A high-capacity 8.5 kg semi-automatic washing machine featuring 5-star energy efficiency, 1300 RPM spin speed, anti-bacterial vortex pulsator, transparent soft-fall lid, and durable rust-free plastic body.",
        "ourPrice": 12990,
        "mrpPrice": 17990,
        "specifications": {
            "Capacity": "8.5 kg",
            "Energy Rating": "5 Star BEE",
            "Type": "Semi-Automatic Top Load",
            "Spin Speed": "1300 RPM",
            "Pulsator": "Vortex Pulsator with Anti-Bacterial Technology",
            "Lid": "Toughened Glass Soft-Fall Lid",
            "Wash Modes": "3 Wash Programs (Gentle / Normal / Strong)",
            "Motor Warranty": "5 Years Motor Warranty"
        }
    },
    "lg-8-5kg-5-star-semi-automatic-p8035sraza": {
        "ourPrice": 16990,
        "mrpPrice": 20990,
    },
    "lg-10kg-5-star-semi-automatic-p1040rgaz": {
        "ourPrice": 17490,
        "mrpPrice": 23990,
    },
    "lg-8kg-5-star-semi-automatic-p8015sgaz": {
        "ourPrice": 15490,
        "mrpPrice": 21490,
    },
    "haier-9kg-semi-automatic-htw90-196bbk": {
        "name": "Haier 9 kg 5 Star Semi-Automatic Top Load Washing Machine (HTW90-196BBK, Black)",
        "modelNumber": "HTW90-196BBK",
        "ourPrice": 13490,
        "mrpPrice": 19990,
    },
    "samsung-43-inch-full-hd-smart-tv-ua43f5600fuxxl": {
        "ourPrice": 26990,
        "mrpPrice": 37900,
    },
    "samsung-32-inch-hd-ready-smart-tv-ua32h4680fuxxl": {
        "ourPrice": 13990,
        "mrpPrice": 19900,
    },
    "lg-32-inch-full-hd-smart-tv-32lb651cpla": {
        "ourPrice": 17490,
        "mrpPrice": 24990,
    },
    "samsung-32-inch-hd-ready-smart-tv-32h4600": {
        "ourPrice": 13490,
        "mrpPrice": 18900,
    }
}

updated_count = 0
for p in products:
    pid = p.get("id")
    if pid in UPDATES:
        for k, v in UPDATES[pid].items():
            p[k] = v
        p["updatedAt"] = "2026-11-19T13:30:00.000Z"
        updated_count += 1

print(f"Updated {updated_count} products with realistic online available prices.")

with open(STORED_PATH, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Saved {STORED_PATH} successfully.")

# Also update src/data/initial-products.ts
ts_content = f"""import {{ Product }} from '@/types';

export const INITIAL_PRODUCTS: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""

with open(INITIAL_TS_PATH, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Saved {INITIAL_TS_PATH} successfully.")
