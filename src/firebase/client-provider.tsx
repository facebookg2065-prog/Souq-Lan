'use client';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';

const { app, auth, firestore } = initializeFirebase();

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
