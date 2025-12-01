import Constants from 'expo-constants';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = Constants?.expoConfig?.extra?.firebase;

const REQUIRED_KEYS = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
];

const hasFirebaseConfig = REQUIRED_KEYS.every(
  (key) => typeof firebaseConfig?.[key] === 'string' && firebaseConfig[key].length > 0,
);

if (!hasFirebaseConfig) {
  console.warn(
    'Firebase config is missing or incomplete. Add your values to expo.extra.firebase in app.json.',
  );
}

const firebaseApp = hasFirebaseConfig
  ? getApps()[0] ?? initializeApp(firebaseConfig)
  : undefined;

const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : undefined;
const firebaseDb = firebaseApp ? getFirestore(firebaseApp) : undefined;

export { firebaseApp, firebaseAuth, firebaseDb, firebaseConfig, hasFirebaseConfig };
