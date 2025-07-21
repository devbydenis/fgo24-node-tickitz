"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      // sebuah payment bisa jadi bagian dari banyak booking
      Payment.hasMany(models.PaymentTransaction, {
        foreignKey: "payment_id",
        as: "transactions",
      });
    }
  }

  Payment.init(
    {
      method_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fee_process: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "payments",
    }
  );

  return Payment;
};
