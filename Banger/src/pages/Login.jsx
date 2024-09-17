import React, { useState } from 'react';
import { login, signup } from '../firbase/firbase';
import { useNavigate } from 'react-router-dom';

// Placeholder for the logo component
const Logo = () => (
  <div className="text-5xl font-bold text-green-600 mb-6 animate-pulse">
    Banger
  </div>
);

const Login = () => {
  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all the fields.');
      setLoading(false);
      return;
    }

    try {
      if (signState === 'Sign In') {
        await login(email, password);
        navigate('/');
      } else {
        if (!name) {
          setError('Please enter your name for Sign Up.');
          setLoading(false);
          return;
        }
        await signup(name, email, password);
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-400 to-blue-500 animate-gradient-move">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-lg transform transition-all duration-300 hover:scale-105">
        <Logo />
        <h1 className="text-4xl font-bold text-center mb-6 text-green-600 animate-bounce">
          {signState}
        </h1>
        <form onSubmit={handleAuth}>
          {signState === 'Sign Up' && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 mb-4 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="w-full px-4 py-2 mb-4 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 font-bold text-white bg-green-500 rounded-md transition duration-200 ease-in hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? 'Loading...' : signState}
          </button>
        </form>
        <div className="mt-6 text-center">
          {signState === 'Sign In' ? (
            <p className="text-gray-600">
              New here?{' '}
              <span
                onClick={() => setSignState('Sign Up')}
                className="text-green-600 hover:text-green-800 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{' '}
              <span
                onClick={() => setSignState('Sign In')}
                className="text-green-600 hover:text-green-800 cursor-pointer"
              >
                Sign In
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
