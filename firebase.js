import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXC9U7DkjEO3VEkRR9Zk1HyOPqp7u2o94",
  authDomain: "smartsign-a6126.firebaseapp.com",
  projectId: "smartsign-a6126",
  storageBucket: "smartsign-a6126.appspot.com",
  messagingSenderId: "677899350871",
  appId: "1:677899350871:web:e367d45426cb3e1a8b8412",
  measurementId: "G-FNTKDQWF13",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.database();
const auth = app.auth();

export {db, auth}
