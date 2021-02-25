
import firebase from "firebase/app"
import "firebase/auth"

 var firebaseConfig = {
    apiKey: "AIzaSyAvEYiu6OeO8Q71Lk2bblSGv1Y_WJRBRUM",
    authDomain: "gqlreactproject.firebaseapp.com",
    projectId: "gqlreactproject",
    storageBucket: "gqlreactproject.appspot.com",
   // messagingSenderId: "313332908684",
    appId: "1:313332908684:web:3267dcd2c5a897d57931a9",
    measurementId: "G-9SGE2K7EQN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 

//   export default firebase;

  export const auth=firebase.auth();

  export const googleAuthProvider=new firebase.auth.GoogleAuthProvider()
  