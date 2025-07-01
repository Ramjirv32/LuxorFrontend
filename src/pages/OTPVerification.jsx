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
  const { phoneNumber, name, isLogin } = location.state || {};
  
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
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  // Handle backspace key to focus previous input
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };
  
  // Handle paste for OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    if (/^\d{6}$/.test(pastedData)) {
      const newOTP = pastedData.split('').slice(0, 6);
      setOTP(newOTP);
      
      // Focus the last input
      const lastInput = document.getElementById('otp-input-5');
      if (lastInput) lastInput.focus();
    }
  };
  
  // Handle OTP verification
  const verifyOTP = async (e) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    setError('');
    
    try {
      // Get the full OTP string
      const otpString = otp.join('');
      
      if (otpString.length !== 6) {
        throw new Error('Please enter the complete 6-digit OTP');
      }
      
      // Get the confirmation result from session storage
      const confirmationResultString = sessionStorage.getItem('confirmationResult');
      if (!confirmationResultString) {
        throw new Error('Session expired. Please request a new OTP');
      }
      
      // Try to verify the OTP with Firebase
      try {
        // For security reasons, we can't directly stringify/parse the confirmationResult object
        // Instead, we'll make a request to our backend with the verificationId and OTP code
        const storedPhoneNumber = sessionStorage.getItem('phoneNumber');
        
        // Send verification request to backend
        const response = await fetch(`${API_BASE_URL}/api/auth/verify-phone-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            phoneNumber: storedPhoneNumber || phoneNumber,
            otp: otpString,
            name: name,
            isNewUser: !isLogin
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to verify OTP');
        }
        
        // Store authentication data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('userEmail', data.user.email || data.user.phoneNumber);
        
        // Update context
        setAuthToken(data.token);
        setUserData(data.user);
        
        // Show success message
        setSuccess('Phone number verified successfully!');
        
        // Clear session storage
        sessionStorage.removeItem('confirmationResult');
        sessionStorage.removeItem('phoneNumber');
        
        // Redirect after delay
        setTimeout(() => {
          // Check if there's a pending booking
          const pendingBooking = localStorage.getItem('pendingBooking');
          if (pendingBooking) {
            try {
              const bookingData = JSON.parse(pendingBooking);
              if (bookingData.returnUrl) {
                navigate(bookingData.returnUrl);
                return;
              } else if (bookingData.villaId) {
                navigate(`/villas/${bookingData.villaId}`);
                return;
              }
            } catch (error) {
              console.error("Error parsing pending booking:", error);
            }
          }
          navigate('/');
        }, 2000);
        
      } catch (firebaseError) {
        console.error("Firebase verification error:", firebaseError);
        throw new Error('Invalid OTP. Please check and try again.');
      }
      
    } catch (error) {
      console.error('OTP verification error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle resend OTP
  const resendOTP = async () => {
    if (resendDisabled) return;
    
    setLoading(true);
    setError('');
    setResendDisabled(true);
    
    try {
      // Make API call to resend OTP
      const response = await fetch(`${API_BASE_URL}/api/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }
      
      // Reset timer and OTP inputs
      setTimer(120);
      setOTP(['', '', '', '', '', '']);
      
      // Focus first input
      const firstInput = document.getElementById('otp-input-0');
      if (firstInput) firstInput.focus();
      
      setSuccess('OTP sent successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8" data-aos="fade-up">
        <div className="text-center mb-8">
          <div className="mb-6 inline-flex p-4 bg-emerald-100 rounded-full">
            <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Phone</h2>
          <p className="text-gray-600">
            We've sent a verification code to<br />
            <span className="font-medium text-gray-900">{phoneNumber}</span>
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded" data-aos="fade-up">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded" data-aos="fade-up">
            <p className="font-medium">Success</p>
            <p className="text-sm">{success}</p>
          </div>
        )}
        
        <form onSubmit={verifyOTP}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Enter 6-digit code
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
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
                loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg hover:shadow-xl'
              }`}
              disabled={loading || otp.some(digit => !digit)}
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
                'Verify OTP'
              )}
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive the code? {timer > 0 && `(${formatTime(timer)})`}
              </p>
              <button
                type="button"
                onClick={resendOTP}
                disabled={resendDisabled || loading}
                className={`text-sm font-medium ${
                  resendDisabled 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-emerald-600 hover:text-emerald-500'
                }`}
              >
                Resend OTP
              </button>
            </div>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/sign-in')}
                className="text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
