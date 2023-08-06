import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './Components/Register';
import Home from './Components/Home';
import SignIn from './Components/SignIn';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { API_KEY_FIREBASE } from './apiKeys';

const firebaseConfig = {
  apiKey: `${API_KEY_FIREBASE}`,
  authDomain: "nh-react-news-aggregator-app.firebaseapp.com",
  projectId: "nh-react-news-aggregator-app",
  storageBucket: "nh-react-news-aggregator-app.appspot.com",
  messagingSenderId: "197322933099",
  appId: "1:197322933099:web:f516cb8bec8e726d21822e",
  measurementId: "G-6EW815S0L7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Router basename='media-mosaic'>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;