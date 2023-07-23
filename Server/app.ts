// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const businessTypesRouter = require('./src/routes/businessTypes.route');

// Middleware to parse request body
app.use(express.json());

// API routes
app.use('/business-types', businessTypesRouter);

// Connect to MongoDB
// const MONGODB_URI = 'mongodb://localhost:27017/your_database_name';
const MONGODB_URI = 'mongodb+srv://oussama:oussama2001@cluster0.aqunadl.mongodb.net/';
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
