$("#createUser").on("submit", (e) => {
    e.preventDefault();

    // Select values from the form
    let email = $("#emailInput");
    let password = $("#passwordInput");
    let firstName = $("#firstNameInput");
    let lastName = $("#lastNameInput");
    let monthlyBudget = $("#monthlyBudget");
    
    // Create the new user object
    let newUser = {
        email: email.val().trim(),
        password: password.val().trim(),
        f_name: firstName.val().trim(),
        l_name: lastName.val().trim(),
        budget: monthlyBudget.val().trim()
    };

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
$("#userLogin").on("submit", (e) => {
    e.preventDefault();

    // Select the inputs
    let email = $("#emailLogin");
    let password = $("#passwordLogin");

    // Create a user object
    let userData = {
        email: email.val().trim(),
        password: password.val().trim()
    };

    // Post user data to the /login route
    $.ajax("/login", {
        type: "POST",
        data: userData
    }).then(data => {
        // Once the user is logged in, the page will reload
        console.log(data.id);
        location.replace(`/user/${data.id}`);
    });
});