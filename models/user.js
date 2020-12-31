const bcrypt = require("bcryptjs");


module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
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

    // Custom method for validating the inputted password, comparing it to the hashed password in our database
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };
      
    // Before we create a User, we automatically hash their password
    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(12), null);
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