// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//Bu bilgiler firebae projesi oluştuturken geliyor.
const firebaseConfig = {
  apiKey: "AIzaSyCdbni8U3aDoCdfeDucYZAxPdfHwvgJVf8",
  authDomain: "cypoint-tracking.firebaseapp.com",
  projectId: "cypoint-tracking",
  storageBucket: "cypoint-tracking.appspot.com",
  messagingSenderId: "484510589429",
  appId: "1:484510589429:web:2eb1a2450cb8e6b54a00bc",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
