// Get the API base URL from environment variables with fallback
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://luxor-backend.vercel.app';

// Helper function for authenticated requests
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers,
  };
  
  try {
   
    if (import.meta.env.DEV) {
      console.log(`Making API request to: ${API_BASE_URL}${url}`);
    }
    
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    
    // Check if response is JSON (some endpoints might return non-JSON data)
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};