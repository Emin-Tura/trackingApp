// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//Bu bilgiler firebae projesi oluştuturken geliyor.
const firebaseConfig = {
  apiKey: "AIzaSyBQqYlA-2N3lkTW9socF6LxQjMEL8H3yWA",
  authDomain: "cypointapp.firebaseapp.com",
  projectId: "cypointapp",
  storageBucket: "cypointapp.appspot.com",
  messagingSenderId: "130164951451",
  appId: "1:130164951451:web:fe37581721f5ae98def93e",
  measurementId: "G-FQ2HWPM09J",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
