import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-2vIlukJaqt37jl_s78lzSIPwk6v0uVo",
  authDomain: "pulsepoint-5d568.firebaseapp.com",
  databaseURL: "https://pulsepoint-5d568-default-rtdb.firebaseio.com",
  projectId: "pulsepoint-5d568",
  storageBucket: "pulsepoint-5d568.firebasestorage.app",
  messagingSenderId: "994769164321",
  appId: "1:994769164321:web:e96053392e5089e547ab60",
  measurementId: "G-G7S7CR45GL"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const firestore = getFirestore(app);