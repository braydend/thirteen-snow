import React, { useRef, useState } from 'react';
import Firebase from '../firebase/utils';

type RegistrationFields = {
  username?: string;
  email?: string;
  password?: string;
};

type RegistrationErrors = {
  username?: string[];
  email?: string[];
  password?: string[];
};

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegistrationForm: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const auth = Firebase.auth();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const newErrors = validateForm({
      username: usernameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    });

    const errorCount =
      (newErrors.email?.length ?? 0) +
      (newErrors.password?.length ?? 0) +
      (newErrors.username?.length ?? 0);

    if (errorCount) {
      setErrors(newErrors);
      return;
    }

    handleRegister();
  };

  const handleRegister = async () => {
    const username = emailRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password || !username) return;

    // try {
    //   console.log('registering');
    const u = await auth.createUserWithEmailAndPassword(email, password);
    await u.user?.updateProfile({ displayName: username });
    auth.updateCurrentUser(u.user);
    //   console.log(u);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const validateForm = ({ username, email, password }: RegistrationFields) => {
    const newErrors: RegistrationErrors = {
      username: [],
      email: [],
      password: [],
    };

    if (!username) {
      newErrors.username?.push('Username cannot be blank');
    } else {
      if (username.length < 6)
        newErrors.username?.push('Username must be greater than 6 characters');
      if (username.length > 25)
        newErrors.username?.push('Username must be less than 25 characters');
    }

    if (!email) {
      newErrors.email?.push('Email cannot be blank');
    } else {
      if (!emailRegex.test(email))
        newErrors.email?.push('Invalid email entered.');
    }

    if (!password) {
      newErrors.password?.push('Password cannot be blank');
    } else {
      if (password.length < 8)
        newErrors.password?.push('Password must be more than 8 characters.');
      if (password.length > 25)
        newErrors.password?.push('Password must be less than 25 characters');
      if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        newErrors.password?.push(
          'Password must contain at least one lowercase letter, one uppercase letter and one number.',
        );
      }
    }

    return newErrors;
  };

  return (
    <form>
      <h2>Register</h2>
      <input ref={emailRef} placeholder="email" required />
      {errors.email && <span>{errors.email.join('. ')}</span>}{' '}
      <input ref={usernameRef} placeholder="username" required />
      {errors.username && <span>{errors.username.join('. ')}</span>}
      <input
        type="password"
        ref={passwordRef}
        placeholder="password"
        required
      />
      {errors.password && <span>{errors.password.join('. ')}</span>}
      <button onClick={handleSubmit}>Register</button>
    </form>
  );
};

export default RegistrationForm;
