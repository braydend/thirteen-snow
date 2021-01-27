import React, { useRef } from 'react';
import { useFirebase } from '../firebase/FirebaseProvider';
import Firebase from '../firebase/utils';
import RegistrationForm from '../Forms/RegistrationForm';

const Auth: React.FC = () => {
  // const { auth } = useFirebase();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const auth = Firebase.auth();

  const handleRegister = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) return;

    auth.createUserWithEmailAndPassword(email, password);
  };

  // const handleLogin = () => {
  //   const email = emailRef.current?.value;
  //   const password = passwordRef.current?.value;

  //   if (!email || !password) return;

  //   auth?.signInWithEmailAndPassword(email, password);
  // };

  return (
    <>
      <div>
        <h1>{auth?.currentUser?.displayName}</h1>
        <h1>{auth?.currentUser?.email}</h1>
      </div>
      <RegistrationForm />
      {/* <div>
        <h2>Register</h2>
        <input ref={emailRef} />
        <input type="password" ref={passwordRef} />
        <button onClick={handleRegister}>register</button>
      </div> */}
      {/* <div>
        <h2>Login</h2>
        <input ref={emailRef} />
        <input type="password" ref={passwordRef} />
        <button onClick={handleLogin}>Login</button>
      </div> */}
    </>
  );
};

export default Auth;
