// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcwyWxFWPNonVTTK6cSGpimQIugVGIIFI",
  authDomain: "comp3000-3aab7.firebaseapp.com",
  projectId: "comp3000-3aab7",
  storageBucket: "comp3000-3aab7.firebasestorage.app",
  messagingSenderId: "864637754099",
  appId: "1:864637754099:web:c974b25061c653ed0db586",
  measurementId: "G-8RFB965YV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);