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

calculateTotalAmount();

function calculateTotalAmount() {
    // Get all elements with amountDisplay class
    let amount = $(".amountDisplay");
    // Create a new array from array like object
    let amountArr = Array.from(amount);

    // Map through array and make a new array with all HTML within each element
    let newArray = amountArr.map(val => {
        return Number(val.innerText);
    });

    // Add up each value to get a total number for the total amount spent
    let totalAmount = newArray.reduce((acc, curVal) => {
        return acc + curVal;
    });

    // Display the total amount spent in the element
    $("#amountSpent").html(totalAmount);
}