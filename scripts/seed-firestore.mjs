process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { initializeApp } from 'firebase/app';
import { initializeFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const firebaseConfig = {
  apiKey: "AIzaSyASols64hbz_Xe0ehvfqh3WzIHyIJ4HceA",
  authDomain: "sharma-bazaar.firebaseapp.com",
  projectId: "sharma-bazaar",
  storageBucket: "sharma-bazaar.firebasestorage.app",
  messagingSenderId: "341703769711",
  appId: "1:341703769711:web:9291d9312b55b9c350d79a"
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

// Read INITIAL_PRODUCTS
const storedPath = path.join(process.cwd(), 'src', 'data', 'stored-products.json');
const raw = fs.readFileSync(storedPath, 'utf-8');
const products = JSON.parse(raw);

console.log(`Starting Firestore synchronization for project "sharma-bazaar"...`);
console.log(`Found ${products.length} showroom products to sync.`);

async function syncAll() {
  let uploaded = 0;
  for (const product of products) {
    try {
      await setDoc(doc(db, 'products', product.id), product);
      console.log(` [OK] Synced: ${product.name} (${product.id})`);
      uploaded++;
    } catch (e) {
      console.error(` [FAIL] Could not sync ${product.id}:`, e.message);
    }
  }
  console.log(`\nSynchronization finished: ${uploaded}/${products.length} products stored in Firestore.`);
}

syncAll().then(() => process.exit(0)).catch((err) => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
