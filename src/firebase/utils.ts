import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

type FirebaseConfig = {
  apiKey?: string;
  authDomain?: string;
  databaseURL?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
};

const defaultConfig: FirebaseConfig = {
  authDomain: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env
    .SNOWPACK_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_APP_ID,
  apiKey: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_API_KEY,
  measurementId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const getFirestoreInstance = (app: firebase.app.App) => {
  return app.auth();
};

const Firebase = firebase.initializeApp(defaultConfig);

export default Firebase;
