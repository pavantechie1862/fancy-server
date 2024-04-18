module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      responsibilities: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      min_salary: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      department: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "role",
    }
  );

  return Role;
};
