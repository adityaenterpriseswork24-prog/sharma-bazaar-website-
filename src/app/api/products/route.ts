import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/initial-products';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'stored-products.json');

async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // If file doesn't exist yet, return initial products
  }
  return [...INITIAL_PRODUCTS];
}

async function writeProducts(products: Product[]): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write stored products:', error);
  }
}

// GET /api/products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');

    let products = await readProducts();

    if (id) {
      const match = products.find((p) => p.id === id);
      return NextResponse.json({ product: match || null });
    }

    if (slug) {
      const match = products.find((p) => p.slug === slug || p.id === slug);
      return NextResponse.json({ product: match || null });
    }

    if (category && category !== 'all') {
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products (Create or Update)
export async function POST(request: NextRequest) {
  try {
    const body: Product = await request.json();

    if (!body || !body.name || !body.brand || !body.ourPrice) {
      return NextResponse.json({ error: 'Missing required product fields' }, { status: 400 });
    }

    let products = await readProducts();
    const existingIndex = products.findIndex((p) => p.id === body.id || p.slug === body.slug);

    if (existingIndex >= 0) {
      products[existingIndex] = {
        ...products[existingIndex],
        ...body,
        updatedAt: new Date().toISOString(),
      };
    } else {
      products.unshift({
        ...body,
        id: body.id || `prod-${Date.now()}`,
        createdAt: body.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    await writeProducts(products);
    return NextResponse.json({ success: true, product: body });
  } catch (error) {
    console.error('Failed to save product:', error);
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
  }
}

// DELETE /api/products?id=...
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    let products = await readProducts();
    products = products.filter((p) => p.id !== id);

    await writeProducts(products);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

// PUT /api/products/reset - resets to initial
export async function PUT(request: NextRequest) {
  try {
    await writeProducts(INITIAL_PRODUCTS);
    return NextResponse.json({ success: true, count: INITIAL_PRODUCTS.length });
  } catch (error) {
    console.error('Failed to reset products:', error);
    return NextResponse.json({ error: 'Failed to reset catalogue' }, { status: 500 });
  }
}
