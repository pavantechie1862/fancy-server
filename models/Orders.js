module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "Orders",
    {
      order_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true, // Validate for email format
        },
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true, // Validate for numeric characters
        },
      },
      additional_info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      materials: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      registered_by: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "email",
        },
      },
    },
    {
      timestamps: false,
    }
  );

  return Orders;
};
