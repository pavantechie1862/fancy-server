module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      emp_id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isPhoneNumber: function (value) {
            if (!/^\d{10}$/.test(value)) {
              throw new Error("Phone number must be 10 digits");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      married: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      spouse_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      spouse_contact: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isPhoneNumber: function (value) {
            // Custom validation for spouse contact (10 digits)
            if (value && !/^\d{10}$/.test(value)) {
              throw new Error("Spouse contact must be 10 digits");
            }
          },
        },
      },
      father_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emergency_contact: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isPhoneNumber: function (value) {
            // Custom validation for emergency contact (10 digits)
            if (!/^\d{10}$/.test(value)) {
              throw new Error("Emergency contact must be 10 digits");
            }
          },
        },
      },
      blood: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      aadhar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      pan: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      ssc: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      intermediate: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      degree: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      bankbook: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      department: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
          model: "Department",
          key: "dept_id",
        },
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Role",
          key: "role_id",
        },
      },
      doa: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      branch: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
          model: "Branch",
          key: "branch_id",
        },
      },
      reporting_manager: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
          model: "Employee",
          key: "emp_id",
        },
      },
      access_key: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "access_keys",
          key: "access_id",
        },
      },
      username: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: "",
      },
      hashed_password: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "employee",
    }
  );

  return Employee;
};
