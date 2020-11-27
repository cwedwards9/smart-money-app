// on submit take the inputted data and send a post request to the /transaction route
$("#createTransaction").on("submit", e => {
    e.preventDefault();

    let newTransaction = {
        category: $("#tCategory").val().trim(),
        amount: $("#tAmount").val().trim(),
        source: $("#tSource").val().trim(),
        date: $("#tDate").val().trim(),
        UserId: $("#userid").html()
    };

    console.log(newTransaction);
    $.ajax("/transaction", {
        type: "POST",
        data: newTransaction
    }).then(() => {
        location.reload();
    });
});