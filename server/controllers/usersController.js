//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

//Models
const { User } = require('../models/modelsUser');
const { Transfers } = require('../models/transfersModels');

/********* */

const getAlluser = catchAsync(async (req, res) => {
  const users = await User.findAll();

  res.status(200).json({ users });
});

/********* */

const createUser = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const randomAccount = Math.floor(100000 + Math.random() * 900000);

  const newUser = await User.create({
    name,
    accountNumber: randomAccount,
    password,
  });

  res.status(201).json({ newUser });
});

const login = catchAsync(async (req, res, next) => {
  const { password, accountNumber } = req.body;

  const user = await User.findOne({
    where: { password, accountNumber },
  });

  if (!user) {
    return next(new AppError('Invalid credentials', 400));
  }

  res.status(200).json({ status: 'success user login' });
});

const getAllTransfer = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const userExists = await User.findOne({ where: { id } });

  if (!userExists) {
    return next(new AppError('User does not exist with given Id', 404));
  }

  const userAccount = userExists.accountNumber;

  const transferUser = await Transfers.findAll({
    where: { senderUserId: userAccount },
  });

  if (transferUser.length === 0) {
    return res.status(200).json({ message: 'No Transfers Made' });
  }

  res.status(200).json({ transferUser });
});

module.exports = { createUser, login, getAllTransfer, getAlluser };
