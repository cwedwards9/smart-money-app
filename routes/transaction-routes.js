const db = require("../models");
const isLoggedIn = require("../config/middleware/isLoggedIn");


module.exports = function(app){
    // GET transactions for specific user
    app.get("/user/transactions/:id", isLoggedIn, (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: db.Transaction
        })
        .then(data => {
            // Create a new object from the data we get from the database, user and their transactions
            const userTransactions = Object.assign({}, {
                user_id: data.dataValues.id,
                first_name: data.dataValues.f_name,
                last_name: data.dataValues.l_name,
                budget: data.dataValues.budget,
                transactions: data.dataValues.Transactions.map(transaction => {
                    return Object.assign(
                        {},
                        {
                            category: transaction.category,
                            amount: transaction.amount,
                            source: transaction.source,
                            date: transaction.date,
                            tid: transaction.id
                        }
                    )
                })
            });
            res.render("transaction", {userTransactions: userTransactions});
        });
    });

    
    // POST new transaction
    app.post("/transaction", isLoggedIn, (req, res) => {
        db.Transaction.create(req.body).then(data => {
            res.json(data);
        });
    });

    // DELETE a transaction
    app.delete("/transaction/:id", isLoggedIn, (req, res) => {
        db.Transaction.destroy({
            where: {
                id: req.params.id
            }
        }).then((transaction) => {
            res.json(transaction);
        });
    });
}
