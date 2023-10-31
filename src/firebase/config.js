import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "olx-clone-22cea.firebaseapp.com",
    projectId: "olx-clone-22cea",
    storageBucket: "olx-clone-22cea.appspot.com",
    messagingSenderId: "593336304976",
    appId: "1:593336304976:web:a00bf1df085f26890b9855",
    measurementId: "G-7G39GR6BCE"
  };

export default firebase.initializeApp(firebaseConfig)