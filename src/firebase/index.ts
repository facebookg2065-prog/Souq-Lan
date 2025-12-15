'use client';

import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: ReturnType<typeof initializeApp> | undefined;
let auth: ReturnType<typeof getAuth> | undefined;
let firestore: ReturnType<typeof getFirestore> | undefined;

function initializeFirebase(config?: FirebaseOptions) {
  if (getApps().length > 0) {
    app = getApp();
  } else if (config) {
    app = initializeApp(config);
  } else {
    // This will likely throw an error, which is what we see.
    // It should only be called on client with config.
    app = initializeApp({}); 
  }
  auth = getAuth(app);
  firestore = getFirestore(app);
  
  return { app, auth, firestore };
}

// Initialize for client-side use
if (typeof window !== 'undefined') {
    const firebase = initializeFirebase(firebaseConfig);
    app = firebase.app;
    auth = firebase.auth;
    firestore = firebase.firestore;
}


export { app, auth, firestore, initializeFirebase };
export * from './provider';
export { useUser } from './auth/use-user';
