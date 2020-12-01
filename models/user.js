module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
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
        },
        budget: {
            type: DataTypes.DECIMAL(7, 2),
            allowNull: false,
            validate: {
                isNumeric: true,
                min: 1
            }
        }
    },{
        freezeTableName: true
    });

    User.associate = function(models) {
        // Associating User with Transactions/Bills, if a user is deleted, the transactions/bills for that user are also deleted
        User.hasMany(models.Transaction, {
          onDelete: "cascade"
        });
        User.hasMany(models.Bill, {
            onDelete: "cascade"
          });
      };

      return User;
};