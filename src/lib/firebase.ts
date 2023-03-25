import { getApps as _getApps, initializeApp } from "firebase/app";
import {
  getFirestore as _getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvj2YRPK5ZYBB2bv8lLy_ZC9xko3ojglM",
  authDomain: "splathon-streamkit.firebaseapp.com",
  projectId: "splathon-streamkit",
  storageBucket: "splathon-streamkit.appspot.com",
  messagingSenderId: "1099025681432",
  appId: "1:1099025681432:web:76825cc25e3ecf6b1b476d",
};

export const getApp = () => {
  return _getApps().length === 0
    ? initializeApp(firebaseConfig)
    : _getApps()[0];
};

export const getFirestore = () => {
  const db = _getFirestore(getApp());
  connectFirestoreEmulator(db, "localhost", 8080);
  return db;
};
