let db = require("../models");


module.exports = function(app){
    // Get bills for specific user
    app.get("/user/bills/:id", (req, res) => {
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
                bills: data.dataValues.Bills.map(bills => {
                    return Object.assign(
                        {},
                        {
                            bAmount: bills.amount,
                            bName: bills.name,
                            date: bills.date
                        }
                    )
                })
            });
            res.render("bill", {userBills: userBills});
        });
    });

    
    // POST new bill
    app.post("/bill", (req, res) => {
        db.Bill.create(req.body).then(data => {
            res.json(data);
        });
    });

}
