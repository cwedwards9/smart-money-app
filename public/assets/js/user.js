$("#createUser").on("submit", (e) => {
    e.preventDefault();

    // Select values from the form
    let firstName = $("#firstNameInput").val().trim();
    let lastName = $("#lastNameInput").val().trim();
    let monthlyBudget = $("#monthlyBudget").val().trim();
    
    // Create the new user object
    let newUser = {
        f_name: firstName,
        l_name: lastName,
        budget: monthlyBudget
    }

    // Post user data to the /register route
    $.ajax("/register", {
        type: "POST",
        data: newUser
    }).then(() => {
        // Once the user is registered, the page will reload
        window.location.reload();
    });

});


// GET request to get all users from the database
$("#loginBtn").on("click", () => {
    $.get("/login")
    .done(data => {
        // Remove list of users before repopulating them in the list
        $("#user-login").empty();
        // Loop through each user in the database and get the id, first and last name
        for(let i = 0; i < data.length; i++){
            let id = data[i].id;
            let name = data[i].f_name + " " + data[i].l_name;
            
            // Create a list item with the user's name and a link to their transactions page
            let user = $("<li><a href='/user/"+ id + "'>" + name + "</a></li>");
            $("#user-login").append(user);
        }
    });
});