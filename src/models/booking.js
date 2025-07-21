"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // sebuah booking hanya bisa jadi bagian dari satu user
      Booking.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      // sebuah booking hanya bisa jadi bagian dari satu showtime
      Booking.belongsTo(models.Showtime, {
        foreignKey: "showtime_id",
        as: "showtime",
      });

      // sebuah booking hanya bisa jadi bagian dari satu payment
      Booking.belongsTo(models.Payment, {
        foreignKey: "payment_id",
        as: "payment",
      });

      // sebuah booking bisa punya banyak seat
      Booking.belongsToMany(models.Seat, {
        through: models.BookingSeat,
        foreignKey: "booking_id",
        otherKey: "seat_id",
        as: "seats",
      });

      Booking.hasOne(models.PaymentTransaction, {
        foreignKey: "booking_id",
        as: "payment_transaction",
      });
    }
  }

  Booking.init(
    {
      booking_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      showtime_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "showtimes",
          key: "id",
        },
      },
      payment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "payments",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELLED", "EXPIRED"),
        defaultValue: "PENDING",
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      tax_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      booking_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expired_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Booking",
      tableName: "bookings",
      timestamps: false, // Using custom timestamp fields
    }
  );

  return Booking;
};
