'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PaymentTransaction extends Model {
    static associate(models) {
      // sebuah payment transaction hanya bisa jadi bagian dari satu booking
      PaymentTransaction.belongsTo(models.Booking, {
        foreignKey: 'booking_id',
        as: 'booking'
      });
      
      // sebuah payment transaction hanya bisa jadi bagian dari satu payment
      PaymentTransaction.belongsTo(models.Payment, {
        foreignKey: 'payment_id',
        as: 'payment_method'
      });
    }
  }
  
  PaymentTransaction.init({
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bookings',
        key: 'id'
      }
    },
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'payments',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'success', 'failed', 'refunded', 'expired'),
      defaultValue: 'pending'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true // Can be null for pending transactions
    }
  }, {
    sequelize,
    modelName: 'PaymentTransaction',
    tableName: 'payment_transactions',
    timestamps: false // We're using custom createdAt field
  });
  
  return PaymentTransaction;
};