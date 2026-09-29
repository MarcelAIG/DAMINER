import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWcjOlPrdYH6_k-rdSUbck0kwksv5Wr5s",
  authDomain: "daminer-admin.firebaseapp.com",
  projectId: "daminer-admin",
  storageBucket: "daminer-admin.firebasestorage.app",
  messagingSenderId: "460656264766",
  appId: "1:460656264766:web:6fb6e4a012cd4a4b12b36f",
  measurementId: "G-557RHVJXM8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
