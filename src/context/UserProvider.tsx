import React, { createContext, useContext, useEffect, useState } from 'react';
import type firebase from 'firebase';
import Firebase from '../firebase/utils';

type UserContext = {
  user?: firebase.User;
  loading: boolean;
};

const userContext = createContext<UserContext>({
  user: undefined,
  loading: true,
});

export const useUser = () => useContext(userContext);

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User>();
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
      setUser(user || undefined), setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <userContext.Provider value={{ user, loading }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
