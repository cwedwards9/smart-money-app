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
