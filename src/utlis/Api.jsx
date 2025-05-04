import axios from 'axios';

// Get API base URL from environment variable or use default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create API client for unauthenticated requests
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create API client for authenticated requests
const apiClientWithAuth = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Create API client for Roblox API requests through proxy
const robloxApiClient = axios.create({
  baseURL: '/roblox-api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to set token dynamically before each request
apiClientWithAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
apiClientWithAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to handle API errors
const handleApiError = (error, customMessage) => {
  console.error(customMessage, error);
  const errorMessage = error.response?.data?.message || error.message || customMessage;
  throw new Error(errorMessage);
};

export const getUserGames = async (userId) => {
  try {
    const response = await robloxApiClient.get(`/users/${userId}/games?limit=10`);
    return response.data.data || []; // array of games
  } catch (error) {
    return handleApiError(error, `Failed to fetch games for ${userId}`);
  }
};

export const createWithdrawal = async (gameId, amount) => {
  try {
    const response = await apiClientWithAuth.post('/withdrawals/create', { gameId, amount });
    return response.data;
  } catch (error) {
    // Log the full error response for debugging
    console.error('Withdrawal error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // Return a more specific error message
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'Error creating withdrawal';
    throw new Error(errorMessage);
  }
};

export const getWithdrawalHistory = async () => {
  try {
    const response = await apiClientWithAuth.get('/withdrawals/history');
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error fetching withdrawal history');
  }
};

export const login = async (username) => {
  try {
    const response = await apiClient.post('/auth/login', { username });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error logging in');
  }
};

export const updateUserProfile = async (email, phone) => {
  try {
    const response = await apiClientWithAuth.put('/auth/profile', { email, phone });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error updating user profile');
  }
};

export const getUserProfile = async () => {
  try {
    const response = await apiClientWithAuth.get('/auth/profile');
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error updating user profile');
  }
};
export const confirmLogin = async (username) => {
  try {
    const response = await apiClient.post('/auth/confirm-login', { username });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error confirming login');
  }
};

export const userData = async () => {
  try {
    const response = await apiClientWithAuth.get('/auth/me');
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error fetching user data');
  }
};

export const addPoints = async (amount, description) => {
  try {
    const response = await apiClientWithAuth.post('/points/add', { amount, description });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error adding points');
  }
};

export const deductPoints = async (amount, description) => {
  try {
    const response = await apiClientWithAuth.post('/points/deduct', { amount, description });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error deducting points');
  }
};

export const getPointsHistory = async () => {
  try {
    const response = await apiClientWithAuth.get('/points/history');
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error fetching points history');
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await apiClientWithAuth.get('/points/leaderboard');
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error fetching leaderboard');
  }
};

export const getOnboardingStatus = async () => {
  try {
    const response = await apiClientWithAuth.get('/onboarding/status');
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error fetching onboarding status');
  }
};
export const followSocials = async (platform) => {
  try {
    const response = await apiClientWithAuth.put('/onboarding/follow-socials', { platform });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error updating socials status');
  }
};

export const visitBlog = async () => {
  try {
    const response = await apiClientWithAuth.post('/onboarding/visit-blog');
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error updating blog visit status');
  }
};

export const completeOfferwall = async () => {
  try {
    const response = await apiClientWithAuth.post('/onboarding/complete-offerwall');
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error updating offerwall completion status');
  }
};

export const createPromoCode = async (promoCodeData) => {
  try {
    const response = await apiClientWithAuth.post('/promocodes/', promoCodeData);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error creating promo code');
  }
};

export const getPromoCodes = async () => {
  try {
    const response = await apiClientWithAuth.get('/promocodes/');
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error fetching promo codes');
  }
};

export const redeemPromoCode = async (code) => {
  try {
    const response = await apiClientWithAuth.post('/promocodes/redeem', { code });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error redeeming promo code');
  }
};

export const updateUserCoins = async (userId, coins) => {
  try {
    const response = await apiClientWithAuth.post('/users/update-coins', { userId, coins });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error updating user coins');
  }
};

export const adminLogin = async (credentials) => {
  try {
    const response = await apiClient.post('/admin/login', credentials);
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Admin login error:', error);
    throw error;
  }
};

export const verifyAdminToken = async () => {
  try {
    const response = await apiClientWithAuth.get('/admin/verify');
    return response.data;
  } catch (error) {
    console.error('Error verifying admin token:', error);
    throw error;
  }
};

