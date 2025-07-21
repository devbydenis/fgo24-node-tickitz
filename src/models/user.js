module.exports = (sequelize, DataTypes) => {
  const attributes = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: true,
      type: DataTypes.ENUM("user", "admin"),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  };
  const options = {
    sequelize,
    modelName: "user",
    tableName: "users",
    timestamps: true,
    indexes: [
      {
        name: "users_id_key",
        unique: true,
        fields: [{name: "id"}],
      },
      {
        name: "users_email_key",
        unique: true,
        fields: [{name: "email"}],
      },
    ],
  };

  const User = sequelize.define("user", attributes, options);
  User.associate = function (models) {
    User.hasOne(models.profile, {foreignKey: "user_id"});
  };
  return User;
};
