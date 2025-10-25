import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJIreinPiiUSN97CQ6rRtgtFgiOIA1LwI",
  authDomain: "alexhardinan-recipebook.firebaseapp.com",
  projectId: "alexhardinan-recipebook",
  storageBucket: "alexhardinan-recipebook.firebasestorage.app",
  messagingSenderId: "817611791799",
  appId: "1:817611791799:web:debcdacccb7a99c7781c32",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
