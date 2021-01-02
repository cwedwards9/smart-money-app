// On submit of the edit button, send the updated budget to the '/user' PUT route
$("#editBudget").on("submit", (e) => {
    e.preventDefault();

    let id = $("#userid").html().trim();

    let updatedBudget = {
        budget: $("#updatedBudgetInput").val().trim(),
    }

    // Send updated budget as PUT request
    $.ajax(`/budget/${id}`, {
        method: "PUT",
        data: updatedBudget
    }).then(() => {
        location.reload();
    });
    
});