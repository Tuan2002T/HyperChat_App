// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE8uamfv02dtUENW29VTLG7OxFivx1yy8",
  authDomain: "hoanghien-multiservice.firebaseapp.com",
  projectId: "hoanghien-multiservice",
  storageBucket: "hoanghien-multiservice.appspot.com",
  messagingSenderId: "886528579232",
  appId: "1:886528579232:web:c3fc8f588881c2fd5d9bc5",
  measurementId: "G-72BQSMJLKR"
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};