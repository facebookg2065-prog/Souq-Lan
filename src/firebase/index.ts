'use server';
import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

function initializeFirebase(config: FirebaseOptions) {
  if (getApps().length) {
    return {
      app: getApp(),
      auth: getAuth(),
      firestore: getFirestore(),
    };
  }

  const app = initializeApp(config);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return { app, auth, firestore };
}

export const { app, auth, firestore } = initializeFirebase(firebaseConfig);

export { initializeFirebase };
export * from './provider';
export { useUser } from './auth/use-user';
