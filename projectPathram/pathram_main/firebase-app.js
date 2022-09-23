import { initializeApp, getApps } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  QuerySnapshot,
  DocumentData,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  limit,
  where,
  increment,
} from "firebase/firestore/lite";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  onIdTokenChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";


const firebaseConfig = {
  // config to be copied here
};

let app;
let db;
let auth;
let storage;
if (getApps().length == 0) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);

} else {
  app = getApps()[0];
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
}


export {
  db,
  collection,
  addDoc,
  setDoc,
  getDocs,
  orderBy,
  query,
  doc,
  getDoc,
  serverTimestamp,
  QuerySnapshot,
  DocumentData,
  updateDoc,
  auth,
  signInWithEmailAndPassword,
  signOut,
  deleteDoc,
  limit,
  where,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  onIdTokenChanged,
  sendPasswordResetEmail,
  increment,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,

};
