// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAOFfefBTYRhgMsYPox2g5F4W1YLfL1nSo",
    authDomain: "customer-support-app-87c2e.firebaseapp.com",
    projectId: "customer-support-app-87c2e",
    storageBucket: "customer-support-app-87c2e.appspot.com",
    messagingSenderId: "66106041230",
    appId: "1:66106041230:web:9c63adc42a77e521febadf"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app);

export { app, auth };
