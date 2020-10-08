module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL|| 'postgres://cuevkolxrfyces:191d6bd18e4ae07abfa5fa6c3e972b88f51c93ab3255a029ce6c39b934605584@ec2-54-160-18-230.compute-1.amazonaws.com:5432/d81hpe70sa8k9b',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
}