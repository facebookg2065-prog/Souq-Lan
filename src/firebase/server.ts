import { initializeApp, getApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;

if (process.env.VERCEL) {
  // Production on Vercel, credentials are automatically provided
  app = getApps().length > 0 ? getApp() : initializeApp();
} else {
  // Local development
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
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
