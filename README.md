# budget-tracker
A full-stack app used for tracking monthly transactions and bills to pay.


module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        f_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        l_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        }
    });

    User.associate = function(models) {
        // Associating User with Transactions, if a user is deleted, the transactions for that user are also deleted
        User.hasMany(models.Transaction, {
          onDelete: "cascade"
        });
      };

      return User;
};


module.exports = function(sequelize, DataTypes) {
    let Transaction = sequelize.define("Transaction", {
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(7, 2),
            allowNull: false
        },
        source: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    Transaction.associate = function(models) {
        // A Transaction should belong to a User, a user must exist to create a transaction
        Transaction.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

      return Transaction;
};
