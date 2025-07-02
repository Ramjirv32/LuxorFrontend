import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1); // 1: Email form, 2: OTP verification, 3: New password
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true
    });
  }, []);

  // Request password reset
  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (!email) {
        throw new Error('Email is required');
      }
      
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to request password reset');
      }
      
      // Store email for next steps
      sessionStorage.setItem('resetEmail', email);
      
      // Show success and move to next step
      setSuccess('Verification code sent to your email');
      setStep(2);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Allow only numbers
    if (value !== '' && !/^[0-9]$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
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
      const newOtp = pastedData.split('').slice(0, 6);
      setOtp(newOtp);
      
      // Focus the last input
      const lastInput = document.getElementById('otp-input-5');
      if (lastInput) lastInput.focus();
    }
  };

  // Verify OTP and proceed to password reset
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const otpString = otp.join('');
      
      if (otpString.length !== 6) {
        throw new Error('Please enter the complete 6-digit OTP');
      }
      
      // Check if OTP is valid (no need for reset yet, just verification)
      // This is just a check - we'll actually reset the password in the next step
      const resetEmail = sessionStorage.getItem('resetEmail');
      if (!resetEmail) {
        throw new Error('Email not found. Please start over.');
      }
      
      const response = await fetch(`${API_BASE_URL}/api/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: resetEmail, 
          otp: otpString,
          purpose: 'password-reset',
          validate: true  // Just validate, don't resend
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Invalid OTP');
      }
      
      // Move to password reset step
      setSuccess('OTP verified successfully');
      setStep(3);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset password with verified OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      if (newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      const resetEmail = sessionStorage.getItem('resetEmail');
      const otpString = otp.join('');
      
      if (!resetEmail || !otpString) {
        throw new Error('Missing required information. Please start over.');
      }
      
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-reset-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: resetEmail,
          otp: otpString,
          newPassword
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }
      
      // Clear stored data
      sessionStorage.removeItem('resetEmail');
      
      // Show success message
      setSuccess('Password reset successful! Redirecting to login...');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/sign-in');
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    
    try {
      const resetEmail = sessionStorage.getItem('resetEmail');
      if (!resetEmail) {
        throw new Error('Email not found. Please start over.');
      }
      
      const response = await fetch(`${API_BASE_URL}/api/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: resetEmail,
          purpose: 'password-reset'
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend verification code');
      }
      
      setSuccess('A new verification code has been sent to your email');
      
      // Reset OTP fields
      setOtp(['', '', '', '', '', '']);
      
      // Focus first OTP field
      setTimeout(() => {
        const firstInput = document.getElementById('otp-input-0');
        if (firstInput) firstInput.focus();
      }, 100);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Render different forms based on the current step
  const renderStepContent = () => {
    switch (step) {
      case 1: // Email form
        return (
          <form onSubmit={handleRequestReset} className="space-y-6">
            <div data-aos="fade-up" data-aos-delay="100">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
                loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg hover:shadow-xl'
              }`}
              disabled={loading}
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                'Request Password Reset'
              )}
            </button>
          </form>
        );

      case 2: // OTP verification
        return (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="text-center mb-4" data-aos="fade-up">
              <p className="text-gray-600">
                Enter the 6-digit code sent to<br />
                <span className="font-medium text-gray-900">{sessionStorage.getItem('resetEmail')}</span>
              </p>
            </div>

            <div className="mb-6" data-aos="fade-up" data-aos-delay="100">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                Verification Code
              </label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
                loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg hover:shadow-xl'
              }`}
              disabled={loading || otp.some(digit => !digit)}
              data-aos="fade-up" 
              data-aos-delay="200"
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
                'Verify Code'
              )}
            </button>

            <div className="text-center mt-4" data-aos="fade-up" data-aos-delay="300">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                Resend code
              </button>
            </div>
          </form>
        );

      case 3: // New password
        return (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div data-aos="fade-up" data-aos-delay="100">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  placeholder="••••••••"
                  minLength="6"
                  required
                />
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="200">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  placeholder="••••••••"
                  minLength="6"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
                loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg hover:shadow-xl'
              }`}
              disabled={loading}
              data-aos="fade-up" 
              data-aos-delay="300"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        );

      default:
        return null;
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
        <div className="mb-8">
          <Link to="/" className="flex items-center">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="ml-2 text-gray-600 hover:text-gray-800">Back to Home</span>
          </Link>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {step === 1 && 'Reset Password'}
            {step === 2 && 'Verify Your Email'}
            {step === 3 && 'Create New Password'}
          </h2>
          <p className="text-gray-600">
            {step === 1 && 'Enter your email to receive a verification code'}
            {step === 2 && 'Enter the code sent to your email'}
            {step === 3 && 'Create a new password for your account'}
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
        
        {renderStepContent()}
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Remember your password?{' '}
            <Link to="/sign-in" className="text-emerald-600 hover:text-emerald-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
