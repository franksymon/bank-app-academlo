const express = require('express');

//Controller
const { transfersUser } = require('../controllers/transfersController');

const router = express.Router();

router.post('/', transfersUser);

module.exports = { transfersRouter: router };
