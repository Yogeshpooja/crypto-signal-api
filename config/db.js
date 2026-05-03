const { Pool } = require('pg');

const pool = new Pool({
  user: 'crypto_user',
  password: 'crypto123',
  host: 'localhost',
  port: 5432,
  database: 'crypto_signals',
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('✅ PostgreSQL Connected');
    
    // Create tables if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS signals (
        id SERIAL PRIMARY KEY,
        coin VARCHAR(50) NOT NULL,
        type VARCHAR(10) NOT NULL,
        entry_price DECIMAL NOT NULL,
        target_price DECIMAL NOT NULL,
        stop_loss DECIMAL NOT NULL,
        status VARCHAR(20) DEFAULT 'active',
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    console.log('✅ Tables ready');
    return true;
  } catch (error) {
    console.error('❌ DB Error:', error.message);
    return false;
  }
};

module.exports = { connectDB, pool };
