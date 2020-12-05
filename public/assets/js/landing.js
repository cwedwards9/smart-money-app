// On submit of the edit button, send the updated budget to the '/user' PUT route
$("#editBudget").on("submit", (e) => {
    e.preventDefault();

    let updatedBudget = {
        budget: $("#updatedBudgetInput").val().trim(),
        id: $("#userid").html().trim()
    }

    // Send updated budget as PUT request
    $.ajax("/budget", {
        method: "PUT",
        data: updatedBudget
    }).then(() => {
        location.reload();
    });
    
});