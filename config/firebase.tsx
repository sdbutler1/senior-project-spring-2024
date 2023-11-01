// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8O1fII3b8pzcfJGs6XYqXTu89CsKD8ug",
  authDomain: "com-sci-dep-auth-project.firebaseapp.com",
  projectId: "com-sci-dep-auth-project",
  storageBucket: "com-sci-dep-auth-project.appspot.com",
  messagingSenderId: "1032602990265",
  appId: "1:1032602990265:web:698a4c1c342325728ccd68",
  measurementId: "G-5WJS0C7QS2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
