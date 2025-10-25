// /lib/firebase.ts
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID!;

// Hard fail early if any var is missing
const missing = [
  ["NEXT_PUBLIC_FIREBASE_API_KEY", apiKey],
  ["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", authDomain],
  ["NEXT_PUBLIC_FIREBASE_PROJECT_ID", projectId],
  ["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", storageBucket],
  ["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", messagingSenderId],
  ["NEXT_PUBLIC_FIREBASE_APP_ID", appId],
].filter(([, v]) => !v);

if (missing.length) {
  throw new Error(
    `Firebase env missing: ${missing.map(([k]) => k).join(", ")}`
  );
}

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

let app: FirebaseApp;
if (!getApps().length) app = initializeApp(firebaseConfig);
else app = getApps()[0];

export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
