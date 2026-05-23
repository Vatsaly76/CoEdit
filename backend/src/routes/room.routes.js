const express = require('express');
const router = express.Router();
const { create, getById } = require('../controllers/room.controller');

// POST /api/rooms/create  → create a new room
router.post('/create', create);

// GET  /api/rooms/:id     → get room metadata
router.get('/:id', getById);

module.exports = router;
