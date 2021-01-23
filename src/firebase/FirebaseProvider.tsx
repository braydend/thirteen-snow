import React, { createContext, useContext } from 'react';
import type firebase from 'firebase';
import Firebase from './utils';

type FirebaseContext = {
  firestore?: firebase.firestore.Firestore;
  auth?: firebase.auth.Auth;
};

const defaultValue: FirebaseContext = {
  firestore: undefined,
  auth: undefined,
};

const firebaseContext = createContext<FirebaseContext>(defaultValue);

type FirebaseProviderProps = {
  customValues?: Partial<FirebaseContext>;
};

const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  customValues,
}) => {
  const defaultValues: FirebaseContext = {
    auth: Firebase.auth(),
    firestore: Firebase.firestore(),
  };

  const value: FirebaseContext = { ...defaultValues, ...customValues };

  return (
    <firebaseContext.Provider value={value}>
      {children}
    </firebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(firebaseContext);

export default FirebaseProvider;
