import firebase from 'firebase/compat/app';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const SignInContent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [/* error */, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <h1 className='sign-in-text'>Sign in to MediaMosaic</h1>                           
            <label htmlFor='email-input'>Email</label><br />
            <div className='email-input-container'>
                <input
                    id='email-input'
                    className='email-input'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <br />
            <label htmlFor='password-input'>Password</label>
            <div className='password-input-container'>
                <input
                    id='password-input'
                    className='password-input'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>
            <button
                className='sign-in-button'
                onClick={handleLogin}
            >Sign in</button>
            <hr />
            <div className='google-sign-in-container'>
                <img 
                    alt='google-sign-in'
                    src='https://www.oncrashreboot.com/images/create-apple-google-signin-buttons-quick-dirty-way-google.png' 
                    onClick={handleGoogleLogin} 
                    className='google-sign-in'
                />
            </div>
            <hr />
            <p style={{ justifyContent: 'right' }}>
                <Link to="/register">Don't have an account? Register here.</Link>
            </p>
        </>
    )
}

export default SignInContent