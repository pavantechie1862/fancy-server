module.exports = (sequelize, DataTypes) => {
  const Params = sequelize.define(
    "Params",
    {
      param_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      is_nabl: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      common_req: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subgroup: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
          onDelete: "CASCADE",
        },
      },
      params: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      additional_info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      discipline: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      requirements: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "Params", // Define the table name explicitly
    }
  );

  return Params;
};
