import React, { useState, useContext } from 'react';
import { login, confirmLogin } from '../utlis/Api.jsx';
import AvatarPopup from './confrimation';
import { useNavigate } from 'react-router-dom';
import { ContextApi } from '../helper/ContextApi';

const Login = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const history = useNavigate();
  const { setUser } = useContext(ContextApi);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username);
      console.log('Login successful:', response);
      setAvatarUrl(response.avatar);
      setShowPopup(true);
    } catch {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleConfirmLogin = async (name) => {
    try {
      const response = await confirmLogin(name);
      console.log('confirm Login successful:', response);
      
      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(response));
    localStorage.setItem('token', response.token);
      // Update user data in context
      await setUser(response);
      
      // Redirect based on user status
      if(!response.isNew) {
        history('/dashboard');
      } else {
        history('/onboarding');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
      // Clear authentication state on error
      localStorage.removeItem('isAuthenticated');
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121215]">
      <div className={`max-w-md w-full bg-[#1E2237] rounded-lg p-8 shadow-lg border border-[#21395e] ${showPopup ? 'hidden' : ''}`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            BLX<span className="text-[#5B6DF6]">.GG</span>
          </h1>
          <h2 className="text-xl font-bold text-white mt-2">Login</h2>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-md text-center font-semibold">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md bg-[#121215] text-white border border-[#21395e] focus:outline-none focus:ring-2 focus:ring-[#5B6DF6]"
              placeholder="Enter your username"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#5B6DF6] hover:bg-[#4a5bd4] text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>

      {showPopup && (
        <AvatarPopup
          avatarUrl={avatarUrl}
          onConfirm={handleConfirmLogin}
          onCancel={handleCancel}
          username={username}
        />
      )}
    </div>
  );
};

export default Login;
