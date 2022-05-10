const express = require('express');

//Controllers
const {
  createUser,
  login,
  getAllTransfer,
  getAlluser,
} = require('../controllers/usersController');

//Middlewares
const { userExists } = require('../middlewares/usersMiddleware');

const router = express.Router();

router.post('/signup', createUser);

router.post('/login', login);

router.get('/:id/history', getAllTransfer);

/********* */
router.get('/', getAlluser);
/********* */

module.exports = { usersRouter: router };
