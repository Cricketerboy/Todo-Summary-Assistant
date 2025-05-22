require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const todosRoutes = require('./routes/todosRoutes');
const summarizeRoutes = require('./routes/summarizeRoutes');

app.use('/todos', todosRoutes);
app.use('/summarize', summarizeRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
