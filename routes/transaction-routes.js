let db = require("../models");


module.exports = function(app){
    // Get transactions for specific user, 
    app.get("/user/transactions/:id", (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: db.Transaction
        })
        .then(data => {
            // console.log(data);
                const obj = Object.assign({}, {
                    first_name: data.dataValues.f_name,
                    last_name: data.dataValues.l_name,
                    transactions: data.dataValues.Transactions.map(t => {
                        return Object.assign(
                            {},
                            {
                                category: t.category,
                                amount: t.amount,
                                source: t.source
                            }
                        )
                    })
                })
                console.log(obj);
                res.render("transaction", {userTransactions: obj});
            })
        });

    // POST new transaction
    app.post("/transaction", (req, res) => {

    });

}
