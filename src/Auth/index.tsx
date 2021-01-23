import React, { useRef } from 'react';
import { useFirebase } from '../firebase/FirebaseProvider';

const Auth: React.FC = () => {
  const { auth } = useFirebase();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleRegister = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) return;

    auth?.createUserWithEmailAndPassword(username, password);
  };

  const handleLogin = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) return;

    auth?.signInWithEmailAndPassword(username, password);
  };

  return (
    <>
      <div>
        <h1>{auth?.currentUser?.email}</h1>
      </div>
      <div>
        <h2>Register</h2>
        <input ref={usernameRef} />
        <input type="password" ref={passwordRef} />
        <button onClick={handleRegister}>register</button>
      </div>
      <div>
        <h2>Login</h2>
        <input ref={usernameRef} />
        <input type="password" ref={passwordRef} />
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default Auth;
