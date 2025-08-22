export const API_CONFIG = {
  // Base URL for the Django backend
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
  
  // API endpoints - matching Django URL patterns
  ENDPOINTS: {
    QUESTIONS: '/quiz/questions/list-all/',
    CATEGORIES: '/quiz/categories/',
    QUESTIONS_BY_CATEGORY: '/quiz/questions/search-by-category/',
    RANDOM_QUESTION: '/quiz/questions/pick-one-random/',
    QUESTIONS_BY_DIFFICULTY: '/quiz/questions/difficulty/',
  },
  
  // Request timeout (in milliseconds)
  TIMEOUT: 10000,
  
  // Headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export const getApiUrl = (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`;
