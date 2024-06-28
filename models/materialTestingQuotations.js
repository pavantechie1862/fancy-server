module.exports = (sequelize, DataTypes) => {
  const MaterialTestingQuotation = sequelize.define(
    "MaterialTestingQuotation",
    {
      qtn_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "material_testing_quotations",
      timestamps: false,
    }
  );

  return MaterialTestingQuotation;
};
