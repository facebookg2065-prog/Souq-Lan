import { initializeApp, getApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let app;

// Check if running in a Vercel production environment
if (process.env.VERCEL_ENV === 'production') {
  // Initialize without credentials, Vercel provides them automatically
  app = getApps().length > 0 ? getApp() : initializeApp();
} else {
  // Use service account for local development
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : undefined;

  if (getApps().length === 0) {
    app = initializeApp({
      credential: serviceAccount ? cert(serviceAccount) : undefined,
    });
  } else {
    app = getApp();
  }
}

const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
