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