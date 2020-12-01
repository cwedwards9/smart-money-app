module.exports = function(sequelize, DataTypes) {
    var Transaction = sequelize.define("Transaction", {
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
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        freezeTableName: true
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