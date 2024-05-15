module.exports = (sequelize, DataTypes) => {
  const SampleMaterials = sequelize.define(
    "SampleMaterials",
    {
      sample_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "orders",
          key: "order_id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      isOffer: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      offer: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      source: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      brandName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      week_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ref_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sample_id_optional_field: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "sample_materials",
    }
  );

  return SampleMaterials;
};
