module.exports = (sequelize, DataTypes) => {
  const attributes = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    firstname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    birthday: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    gender: {
      allowNull: false,
      type: DataTypes.ENUM("male", "female"),
    },
    profile_picture: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone_number: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    is_verified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
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
