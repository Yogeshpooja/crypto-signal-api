const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const { getActiveSignals, getAllSignals, createSignal, updateSignal, deleteSignal } = require('../controllers/signalController');
const router = express.Router();

router.get('/active', protect, getActiveSignals);
router.get('/all', protect, adminOnly, getAllSignals);
router.post('/', protect, adminOnly, createSignal);
router.put('/:id', protect, adminOnly, updateSignal);
router.delete('/:id', protect, adminOnly, deleteSignal);

module.exports = router;
