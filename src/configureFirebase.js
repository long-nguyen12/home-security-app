import { initializeApp } from "firebase/app";

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAcB4kvirl8W__t3IXSyvZsOTF17XFrWOk",
  authDomain: "home-security-13375.firebaseapp.com",
  projectId: "home-security-13375",
  storageBucket: "home-security-13375.appspot.com",
  messagingSenderId: "250522666188",
  appId: "1:250522666188:web:c1d6706b01551b8d126e69",
  measurementId: "G-5Y8VG4Z1ZK",
};

export default function configureFirebase() {
  initializeApp(FIREBASE_CONFIG);
}
