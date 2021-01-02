const db = require("../models");
const isLoggedIn = require("../config/middleware/isLoggedIn");


module.exports = function(app){
    // Get bills for specific user
    app.get("/user/bills/:id", isLoggedIn, (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: db.Bill
        })
        .then(data => {
            
            const userBills = Object.assign({}, {
                user_id: data.dataValues.id,
                first_name: data.dataValues.f_name,
                last_name: data.dataValues.l_name,
                budget: data.dataValues.budget,
                bills: data.dataValues.Bills.map(bills => {
                    return Object.assign(
                        {},
                        {
                            bAmount: bills.amount,
                            bName: bills.name,
                            date: bills.date,
                            bid: bills.id,
                        }
                    )
                })
            });
            res.render("bill", {userBills: userBills});
        });
    });

    
    // POST new bill
    app.post("/bill", isLoggedIn, (req, res) => {
        db.Bill.create(req.body).then(data => {
            res.json(data);
        });
    });


    // DELETE a bill
    app.delete("/bill/:id", isLoggedIn, (req, res) => {
        db.Bill.destroy({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            res.json(bill);
        });
    });

}
