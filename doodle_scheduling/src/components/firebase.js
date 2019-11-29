import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAmcdm-nCXD4ahr4EwKddfHQ_vpqkMEPWA",
    authDomain: "cs180-schedulingapp.firebaseapp.com",
    databaseURL: "https://cs180-schedulingapp.firebaseio.com",
    projectId: "cs180-schedulingapp",
    storageBucket: "cs180-schedulingapp.appspot.com",
    messagingSenderId: "350264880268",
    appId: "1:350264880268:web:4fb4718431afc39b6e9fa9",
    measurementId: "G-DBB71H8E8J"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export {firebase, db};
export const storage = firebase.storage();