'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export const useUser = () => {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user && firestore) {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (!userDoc.exists()) {
          // You might want to create the user document here if it doesn't exist
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth, firestore]);

  return { user, isLoading };
};
