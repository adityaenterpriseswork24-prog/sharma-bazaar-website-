import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getStorage, Storage } from 'firebase-admin/storage';

export const isFirebaseAdminConfigured = Boolean(
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY
);

function getAdminApp(): App | null {
  const currentApps = getApps();
  if (currentApps.length > 0) {
    return currentApps[0];
  }

  if (isFirebaseAdminConfigured) {
    try {
      const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
      return initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } catch (e) {
      console.warn('Firebase Admin initialization error:', e);
    }
  }
  return null;
}

const adminAppInstance = getAdminApp();

export const adminApp = adminAppInstance;
export const adminDb: Firestore | null = adminAppInstance ? getFirestore(adminAppInstance) : null;
export const adminAuth: Auth | null = adminAppInstance ? getAuth(adminAppInstance) : null;
export const adminStorage: Storage | null = adminAppInstance ? getStorage(adminAppInstance) : null;
