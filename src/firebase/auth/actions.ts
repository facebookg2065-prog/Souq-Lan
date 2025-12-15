'use server';

import {
  signInWithPopup as adminSignInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth as serverAuth, firestore as serverFirestore } from '@/firebase/server';
import { cookies } from 'next/headers';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import {
  signInWithPopup as clientSignInWithPopup,
  GoogleAuthProvider as ClientGoogleAuthProvider,
  FacebookAuthProvider as ClientFacebookAuthProvider,
} from 'firebase/auth';
import { auth as clientAuth } from '@/firebase/client';


async function handleSignIn(provider: GoogleAuthProvider | FacebookAuthProvider) {
  // This is a server-side representation. The actual popup happens on the client.
  // The result is then sent to a client-side endpoint that calls this action.
  // For the purpose of this simulation, we assume the client gets the user info
  // and we proceed to create session cookies and save user data.

  // The client will handle the popup and get the user credential.
  // This is a placeholder for the logic that would run on the server
  // after the client sends the user token.
  
  // In a real scenario, you'd verify the token from the client.
  // For now, let's simulate a user object.
  // The actual implementation on the client will use the client-side SDK.
}


export async function createSessionCookie(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  try {
     const decodedIdToken = await serverAuth.verifyIdToken(idToken, true);
     const sessionCookie = await serverAuth.createSessionCookie(idToken, { expiresIn });
     cookies().set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    // Save user data to Firestore
    if (decodedIdToken.uid && serverFirestore) {
        const userRef = doc(serverFirestore, 'users', decodedIdToken.uid);
        await setDoc(userRef, {
            name: decodedIdToken.name,
            email: decodedIdToken.email,
            avatar: decodedIdToken.picture,
            role: 'user', // default role
            createdAt: serverTimestamp(),
        }, { merge: true });
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating session cookie:', error);
    return { success: false, error: 'Failed to create session.' };
  }
}

export async function signOut() {
  cookies().delete('session');
}


// These functions will be called from the client-side login form
// They don't actually perform the sign-in here but represent the action.
// The real logic is in the client-side component which uses the Firebase client SDK.

export async function signInWithGoogle() {
  const provider = new ClientGoogleAuthProvider();
  try {
    const result = await clientSignInWithPopup(clientAuth, provider);
    const idToken = await result.user.getIdToken();
    
    const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
    });

    return await response.json();
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
}

export async function signInWithFacebook() {
  const provider = new ClientFacebookAuthProvider();
  try {
    const result = await clientSignInWithPopup(clientAuth, provider);
    const idToken = await result.user.getIdToken();
    
    const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
    });

    return await response.json();
  } catch (error) {
    console.error('Facebook Sign-In Error:', error);
    // This often fails if the app is not configured in Facebook Developers portal
    // and Firebase project.
    throw error;
  }
}
