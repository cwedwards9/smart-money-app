// On submit take the data from the form and send a post request to the /bill route
$("#createBill").on("submit", e => {
    e.preventDefault();

    let newBill = {
        name: $("#bName").val().trim(),
        amount: $("#bAmount").val().trim(),
        date: $("#bDate").val().trim(),
        UserId: $("#userid").html()
    };

    console.log(newBill);
    $.ajax("/bill", {
        type: "POST",
        data: newBill
    }).then(() => {
        location.reload();
    });
});

// When a user clicks the delete button, the corresponding bill will be deleted
$(".deleteBill").on("click", function() {
    let bid = $(this).attr("bid");
    
    $.ajax({
        url: `/bill/${bid}`,
        method: "DELETE"
    }).then(() => {
        location.reload();
    });
});



calculateAmountSpent();

// Calculates the total amount spent from all transactions by the user
function calculateAmountSpent() {
    // Get all elements with amountDisplay class
    let amount = $(".amountDisplay");
    // Create a copy of the array like object
    let amountArr = Array.from(amount);

    // If there are no transactions recorded, display $0.00 for amount spent
    if(amountArr.length === 0){
        $("#amountSpent").html("0.00");
    }

    // Map through array and make a new array with all HTML within each element
    let newArray = amountArr.map(val => {
        return Number(val.innerText);
    });

    // Add up each value to get a total number for the total amount spent
    let totalAmount = newArray.reduce((acc, curVal) => {
        return acc + curVal;
    });

    // Display the total amount spent in the element (with 2 decimal places)
    $("#amountSpent").html(totalAmount.toFixed(2));

    calculateBalance(totalAmount);

}


// Calculate balance
function calculateBalance(totalAmount) {
    // Select the user's montly budget
    let monthlyBudget = $("#monthlyBudget").html();

    // Subtract the total amount spent from the monthly budget to get the balance
    let remainingBalance = Number(monthlyBudget) - totalAmount;

    // Set the calculated balance to the html element
    $("#remainingBalance").html(remainingBalance.toFixed(2));
}
