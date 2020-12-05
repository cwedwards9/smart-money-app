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

    // Send transaction as POST request
    $.ajax("/transaction", {
        method: "POST",
        data: newTransaction
    }).then(() => {
        location.reload();
    });
});


// When a user clicks the delete button, the corresponding transaction will be deleted
$(".deleteTransaction").on("click", function() {
    let tid = $(this).attr("tid");
    
    $.ajax({
        url: `/transaction/${tid}`,
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

        let monthlyBudget = $("#monthlyBudget").html();
        $("#remainingBalance").html(monthlyBudget);
    } 
    else {
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



// Creates an object containing each category and the total amount spent in that category
function getCategories() {
    // Get all transactions using the transactionRow class
    let transaction = $(".transactionRow");
    // Create a copy of the array like object
    let elementsArray = Array.from(transaction);

    // Create an array of objects that contain the category with its amount spent
    let categoryArray = elementsArray.map(element => {
        return {category: element.childNodes[3].innerText, amount: Number(element.childNodes[7].innerText)};
    });
    
    // Create an object which iterates throught the categoryArray and adds up the total amount spent by each category
    let categoryAmountCount = categoryArray.reduce((acc, next) => {
        if(next.category === "Groceries"){
            acc.groceries+= next.amount;
        } else if (next.category === "Healthcare"){
            acc.healthcare+= next.amount;
        } else if (next.category === "Travel"){
            acc.travel+= next.amount;
        } else if (next.category === "Entertainment"){
            acc.entertainment+= next.amount;
        } else if (next.category === "Food"){
            acc.food+= next.amount;
        } else if (next.category === "Household Items"){
            acc["household items"]+= next.amount;
        } 
        return acc;
    }, {groceries: 0, healthcare: 0, travel: 0, entertainment: 0, food: 0, "household items": 0});
    
    return categoryAmountCount;
}




// Load the chart data of transactions made by category
google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            // Call the getCategories function to get the object of categories by amount spent
            let category = getCategories();

            // Create the chart with the values from the getCategories chart
            var data = google.visualization.arrayToDataTable([
                ['Expenses', 'Cost/Amount'],
                ['Groceries', category.groceries],
                ['Healthcare', category.healthcare],
                ['Travel', category.travel],
                ['Entertainment', category.entertainment],
                ['Food', category.food],
                ['Household Items', category["household items"]]
            ]);
            var options = {
                pieHole: 0.2,
                chartArea: {'width': '100%', 'height': '80%'},
                legend: {'position': 'bottom'},
                width: 245,
                height: 280,
                colors: [ '#FF944D', '#E65139', '#79A6D2', '#38A99E', '#1F6197', '#003366']
            };
            var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
            chart.draw(data, options);
        }