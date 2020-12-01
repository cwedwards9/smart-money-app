module.exports = function(sequelize, DataTypes) {
    var Bill = sequelize.define("Bill", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(7, 2),
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    Bill.associate = function(models) {
        // A Transaction should belong to a User, a user must exist to create a transaction
        Bill.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

      return Bill;
};