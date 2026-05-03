const { pool } = require('../config/db');

const getActiveSignals = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, u.name as created_by_name 
      FROM signals s 
      JOIN users u ON s.created_by = u.id 
      WHERE s.status = 'active'
      ORDER BY s.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSignals = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, u.name as created_by_name 
      FROM signals s 
      JOIN users u ON s.created_by = u.id 
      ORDER BY s.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSignal = async (req, res) => {
  try {
    const { coin, type, entryPrice, targetPrice, stopLoss } = req.body;
    const createdBy = req.user.id;

    const result = await pool.query(`
      INSERT INTO signals (coin, type, entry_price, target_price, stop_loss, created_by)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [coin, type, entryPrice, targetPrice, stopLoss, createdBy]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSignal = async (req, res) => {
  try {
    const { id } = req.params;
    const { coin, type, entryPrice, targetPrice, stopLoss, status } = req.body;

    const result = await pool.query(`
      UPDATE signals 
      SET coin = $1, type = $2, entry_price = $3, target_price = $4, stop_loss = $5, status = $6
      WHERE id = $7
      RETURNING *
    `, [coin, type, entryPrice, targetPrice, stopLoss, status, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Signal not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSignal = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM signals WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Signal not found' });
    }
    res.json({ message: 'Signal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getActiveSignals, getAllSignals, createSignal, updateSignal, deleteSignal };
