import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import SignInContent from './SignInContent';

const UserAuth = ({ isMenuOpen, setIsMenuOpen }) => {
    const [user, setUser] = useState(null);
    const [error, /* setError */] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        firebase.auth().signOut();
        window.location.reload();
    };
    
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
        // Clean up the subscription
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div>
            {user ? (
                <div className='email-and-logout-button'>
                    <i className='email'>{ user.email }</i>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <>
                    <div className='desktop-no-user-content'>
                        <span 
                            onClick={() => {
                                setShowModal(true);
                                setIsMenuOpen(false);
                            }}
                            className='sign-in-link'
                        >Sign in</span>
                        <Link
                            className='register-link'
                            to="/register"
                        >Register</Link>         
                        {showModal && (
                            <div className='modal-overlay'>
                                <div className='modal-content'>
                                    <div className='close-modal-container'>
                                        <span
                                            className='close-modal-button'
                                            onClick={() => setShowModal(false)}
                                        >X</span>
                                    </div>
                                    <SignInContent />
                                </div>
                            </div>
                        )}
                        {error && <p>{error}</p>}
                    </div>
                    <div className='mobile-no-user-content'>
                        <Link to='/sign-in' className='mobile-sign-in-link'>Sign In</Link>
                        <Link to='/register' className='mobile-register-link'>Register</Link>
                    </div>
                </>            
            )}
        </div>
    );
};

export default UserAuth;
