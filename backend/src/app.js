const express = require('express');
const cors = require('cors');
const executeRoutes = require('./routes/execute.routes');
const roomRoutes = require('./routes/room.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/execute', executeRoutes);
app.use('/api/rooms', roomRoutes);

app.get('/', (req, res) => {
  res.send('Server is running perfectly! 🚀');
});

module.exports = app;
