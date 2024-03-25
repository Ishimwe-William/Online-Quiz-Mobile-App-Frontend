// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBRnBrKiGGxl4f-VImcsWZj61PAqq0UBkU",
    authDomain: "online-quiz-mobile-app.firebaseapp.com",
    projectId: "online-quiz-mobile-app",
    storageBucket: "online-quiz-mobile-app.appspot.com",
    messagingSenderId: "997918310344",
    appId: "1:997918310344:web:f4f16b4f17b29cbd29cafd",
    measurementId: "G-LCTG9B3TGB"
};

// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireBaseApp);
