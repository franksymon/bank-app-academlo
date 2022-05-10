const express = require('express');

//Init express App
const app = express();

// Enable incoming JSON data
app.use(express.json());

//Router
const { usersRouter } = require('./routes/usersRouter');
const { transfersRouter } = require('./routes/transfersRouter');

//Middlewares
const { globalErrorHandler } = require('./controllers/errorsController');

// Endpoints
// http://localhost:4000/api/v1/users
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/transfers', transfersRouter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
