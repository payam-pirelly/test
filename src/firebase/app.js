import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCEPNoOUcY2UCHsTf1r2c3zxaJOw-DbJxo",
  authDomain: "pirelly360.firebaseapp.com",
  projectId: "pirelly360",
  storageBucket: "",
  messagingSenderId: "187498481907",
  appId: "",
  measurementId: "",
});

export const firebaseAuth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);
