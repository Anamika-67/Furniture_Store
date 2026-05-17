require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/furniture_store',
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret_change_me',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  nodeEnv: process.env.NODE_ENV || 'development',
};
