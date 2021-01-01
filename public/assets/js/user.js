// $("#createUser").on("submit", (e) => {
//     e.preventDefault();

//     // Select values from the form
//     let email = $("#emailInput");
//     let password = $("#passwordInput");
//     let firstName = $("#firstNameInput");
//     let lastName = $("#lastNameInput");
//     let monthlyBudget = $("#monthlyBudget");
    
//     // Create the new user object
//     let newUser = {
//         email: email.val().trim(),
//         password: password.val().trim(),
//         f_name: firstName.val().trim(),
//         l_name: lastName.val().trim(),
//         budget: monthlyBudget.val().trim()
//     };

//     // Post user data to the /register route
//     $.ajax("/register", {
//         type: "POST",
//         data: newUser
//     }).then(data => {
//         // If the user successfully signs up, redirect them to the user landing page using their id
//         location.href = `/user/${data}`;
//     }).catch(err => {
//         console.log(err);
//     });
// });


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
        // If the user successfully logs in, redirect them to the user landing page using their id
        location.href = `/user/${data.id}`;
    }).catch(err => {
        // If there is an error, log the error
        console.log(err);
    });
});