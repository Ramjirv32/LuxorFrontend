import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { useAuth } from '../context/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OTPVerification = () => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(120); // 2 minutes countdown
  const [resendDisabled, setResendDisabled] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthToken, setUserData } = useAuth();
  
  // Get user data from location state
  const { email, name, password, isLogin } = location.state || {};

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);
  
  // Timer effect
  useEffect(() => {
    if (!timer) {
      setResendDisabled(false);
      return;
    }
    
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timer]);
  
  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Handle OTP input change
  const handleChange = (index, value) => {
    // Allow only numbers
    if (value !== '' && !/^[0-9]$/.test(value)) return;
    
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    
    // Auto-focus next input
    if (value !== '' && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };
  
  // Handle key press
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      // Focus previous input when backspace is pressed on an empty input
      document.getElementById(`otp-input-${index - 1}`).focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };
  
  // Paste OTP from clipboard
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6).split('');
    
    if (pasteData.length === 0 || !/^\d+$/.test(pasteData.join(''))) return;
    
    const newOTP = [...otp];
    pasteData.forEach((value, index) => {
      if (index < 6) newOTP[index] = value;
    });
    
    setOTP(newOTP);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newOTP.findIndex(val => val === '');
    if (nextEmptyIndex !== -1) {
      document.getElementById(`otp-input-${nextEmptyIndex}`).focus();
    } else {
      document.getElementById('otp-input-5').focus();
    }
  };
  
  // Resend OTP
  const handleResendOTP = async () => {
    if (resendDisabled) return;
    
    try {
      setLoading(true);
      setError('');
      
      const endpoint = isLogin ? 'send-login-otp' : 'send-registration-otp';
      
      const response = await fetch(`${API_BASE_URL}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend OTP');
      }
      
      setSuccess('OTP resent successfully!');
      setTimer(120); // Reset timer
      setResendDisabled(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  
  // Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate OTP
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const endpoint = isLogin ? 'verify-login' : 'verify-register';
      const body = isLogin 
        ? { email, otp: otpValue }
        : { name, email, password, otp: otpValue };
      
      const response = await fetch(`${API_BASE_URL}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }
      
      // Save authentication data
      if (data.token && data.user) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.user._id || data.user.id);
        localStorage.setItem('userEmail', data.user.email);
        
        setAuthToken(data.token);
        setUserData(data.user);
        
        setSuccess(isLogin ? 'Login successful!' : 'Registration successful!');
        
        // Redirect to homepage after short delay
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1500);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };
  
  // Redirect if no email in state
  useEffect(() => {
    if (!email) {
      navigate('/sign-in', { replace: true });
    }
  }, [email, navigate]);
  
  // If no email, show nothing while redirecting
  if (!email) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-emerald-50 px-4 py-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="w-full max-w-md" data-aos="zoom-in">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
            <p className="mt-2 text-gray-600">
              We've sent a 6-digit code to <span className="font-medium">{email}</span>
            </p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
              <p className="font-medium">Success</p>
              <p className="text-sm">{success}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Verification Code
              </label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-gray-500 text-center">
                Didn't receive the code?{' '}
                <button 
                  type="button"
                  onClick={handleResendOTP}
                  disabled={resendDisabled || loading}
                  className={`${
                    resendDisabled 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-emerald-600 hover:text-emerald-500'
                  } font-medium transition-colors`}
                >
                  {resendDisabled ? `Resend in ${formatTime(timer)}` : 'Resend OTP'}
                </button>
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading || otp.some(d => d === '')}
              className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : otp.some(d => d === '')
                  ? 'bg-emerald-400 opacity-70 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Verifying...
                </div>
              ) : (
                'Verify & Continue'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate('/sign-in')} 
              className="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Go back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
