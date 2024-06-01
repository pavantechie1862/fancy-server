//another variable
//registration_done = false
//amount

module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "Orders",
    {
      order_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      razorpay_order_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      razorpay_payment_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      razorpay_signature: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      additional_info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      client_letter: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      samples_collection_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      driver_assigned_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      driver_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "employee",
          key: "emp_id",
        },
      },
      driver_assigned: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      registration_done: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      samples_received: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      samples_received_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      order_closed_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      order_closed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      added_by: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: false,
        references: {
          model: "users",
          key: "email",
        },
      },

      customer_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      proforma_issued: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      nhai_bool: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      parent_ref_bool: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      project_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      subject: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      parent_ref: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      nhai_hq_letter: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      additional_info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      letter: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      due_date: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      lab: {
        type: DataTypes.STRING,
        allowNull: true,

        references: {
          model: "branches",
          key: "branch_id",
        },
      },
    },

    {
      timestamps: false,
      tableName: "orders",
    }
  );

  return Orders;
};
