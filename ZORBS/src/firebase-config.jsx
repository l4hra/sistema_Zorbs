// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiEwM4c99NsC7g-ZeWyE4M7HBgnn8bzlI",
  authDomain: "zorbs-b52f3.firebaseapp.com",
  projectId: "zorbs-b52f3",
  storageBucket: "zorbs-b52f3.appspot.com",
  messagingSenderId: "338803947548",
  appId: "1:338803947548:web:b42979dbafdc6abe5ac7d9",
  measurementId: "G-2KYX9D7725"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)