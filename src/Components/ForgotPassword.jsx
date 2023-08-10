import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [resetSent, setResetSent] = useState(false);
    const [error, setError] = useState('');
    
    const handleResetPassword = async () => {
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            setResetSent(true);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='newspaper-bg'>
            <div className='forgot-password-container'>
                <h1 className='forgot-password-title'>Forgot MediaMosaic Password</h1>
                {resetSent ? (
                    <p>An email with instructions to reset your password has been sent.</p>
                ) : (
                    <>
                        <label htmlFor='forgot-password-input'>Enter your email to receive a password reset link:</label>
                        <div className='forgot-password-input-container'>
                            <input
                                id='forgot-password-input'
                                className='forgot-password-input'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <button 
                            onClick={handleResetPassword}
                            className='forgot-password-button'
                        >Send Reset Email</button>
                        {error && <p>{error}</p>}
                    </>
                )}
                <p>
                    <Link to="/sign-in">Back to Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword