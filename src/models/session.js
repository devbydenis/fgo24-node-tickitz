module.exports = (sequelize, DataTypes) => {
  const attributes = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    token: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    device_info: {
      allowNull: false,
      type: DataTypes.STRING, 
    },
    is_active: {
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
    modelName: "session",
    tableName: "sessions",
    timestamps: true,
    indexes: [
      {
        name: "sessions_id_key",
        unique: true,
        fields: [{name: "id"}],
      },
      {
        name: "sessions_token_key",
        unique: true,
        fields: [{name: "token"}],
      },
    ],
  };

  const Session = sequelize.define("session", attributes, options);
  Session.associate = function (models) {
    Session.belongsTo(models.user, {foreignKey: "user_id"});
  };
  return Session;
};
