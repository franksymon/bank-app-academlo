//Models
const { User } = require('../models/modelsUser');
const { Transfers } = require('../models/transfersModels');

//Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const transfersUser = catchAsync(async (req, res, next) => {
  const { amount, senderUserId, receiverUserId } = req.body;

  const userSender = await User.findOne({
    where: { accountNumber: senderUserId },
  });

  const userReceiver = await User.findOne({
    where: { accountNumber: receiverUserId },
  });

  if (!userSender) {
    return next(new AppError('useruser does not exist', 400));
  }

  if (userSender.amount <= amount) {
    return res.status(400).json({ status: 'insufficient funds' });
  }

  const userPlus = (userReceiver.amount += amount);

  const userMinos = (userSender.amount -= amount);

  const newtransfer = await Transfers.create({
    amount,
    senderUserId,
    receiverUserId,
  });

  await User.update(
    { amount: userPlus },
    { where: { accountNumber: senderUserId } }
  );

  await User.update(
    { amount: userMinos },
    { where: { accountNumber: receiverUserId } }
  );

  res.status(201).json({
    newtransfer,
    status: `successful operation. 
    Transfer amount ${amount},
    Current balance:
    user Receiver ${userPlus},
    user Sender ${userMinos}
    `,
  });
});

module.exports = { transfersUser };
