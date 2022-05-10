const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Transfers = db.define('transfers', {
  id: {
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Transfers };
