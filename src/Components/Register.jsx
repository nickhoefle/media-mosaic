import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
        const authResult = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (authResult) {
          navigate('/');
        }
    } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            setError('Invalid email format. Please enter a valid email address.');
            break;
          case 'auth/weak-password':
            setError('Weak password. Please choose a stronger password.');
            break;
          case 'auth/email-already-in-use':
            setError('This email is already registered. Please use a different email.');
            break;
          default:
            setError('An error occurred during registration. Please try again later.');
            break;
        }
    }
  };

  return (
    <div className='newspaper-bg'>
      <div className='register-container'>
        <h1 className='register-title'>Create a MediaMosiac Account</h1>
        <label htmlFor='register-email-input'>Email</label>
        <br />
        <div className='email-input-container'>
          <input
            className='register-email-input'
            id='register-email-input' 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
          />
        </div>
        <br />
        <label htmlFor='register-password-input'>Password</label>
        <br />
        <div className='password-input-container'>
          <input 
            className='register-password-input'
            id='register-password-input'
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
          />
        </div>
        <button 
          className='sign-in-button'
          onClick={handleRegister}
        >Register</button>
        <p>
          Already have an account? <Link to="/sign-in">Sign in!</Link>
        </p>
        {error && <p className='error-text'>{error}</p>}
      </div>
    </div>
  );
};

export default Register;