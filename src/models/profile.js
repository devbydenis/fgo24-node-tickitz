module.exports = (sequelize, DataTypes) => {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      primaryKey: true,
    },
    user_id: {
      allowNull: true,
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    firstname: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lastname: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    birthday: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    gender: {
      allowNull: true,
      type: DataTypes.ENUM("male", "female"),
    },
    profile_picture: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    phone_number: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    is_verified: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  };

  const options = {
    sequelize,
    modelName: "profile",
    tableName: "profiles",
    timestamps: true,
    indexes: [
      {
        name: "profile_id_key",
        unique: true,
        fields: [{name: "id"}],
      },
    ],
  };

  const Profile = sequelize.define("profile", attributes, options); // (nama model, attributes, options)
  Profile.associate = function (models) {
    Profile.belongsTo(models.user, {foreignKey: "user_id"});
  };
  return Profile;
};
