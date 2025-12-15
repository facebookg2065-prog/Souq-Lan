'use client';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';
import { firebaseConfig } from './config';

const { app, auth, firestore } = initializeFirebase(firebaseConfig);

export const FirebaseClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
};
