import 'dotenv/config';

export default {
  "expo": {
    "name": "online-quiz",
    "scheme": "online-quiz",
    "slug": "online-quiz",
    "version": "1.0.0",
    "assetBundlePatterns": [
      "**/*"
    ],
    "android": {
      "googleServicesFile": "./android/app/google-services.json",
      "package": "com.bunsenwill.onlinequiz"
    },
    // "plugins": [
    //   "@react-native-google-signin/google-signin"
    // ]
  },
  "extra": {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID
  }
}
