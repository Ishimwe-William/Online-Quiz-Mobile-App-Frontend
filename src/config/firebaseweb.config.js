// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8ND0l1YU4_o3ws1RDHtHX2ItL7_mU_wk",
    authDomain: "online-quiz-mobile-app.firebaseapp.com",
    projectId: "online-quiz-mobile-app",
    storageBucket: "online-quiz-mobile-app.appspot.com",
    messagingSenderId: "997918310344",
    appId: "1:997918310344:web:f4f16b4f17b29cbd29cafd",
    measurementId: "G-LCTG9B3TGB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export {app, auth}
