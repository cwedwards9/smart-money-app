$("#createUser").on("submit", (e) => {
    e.preventDefault();

    let firstName = $("#firstNameInput").val().trim();
    let lastName = $("#lastNameInput").val().trim();

    // Validation
    if(firstName.length < 0 && lastName.length < 0) {
        alert("Please fill in a valid value for all inputs");
    }

    let newUser = {
        f_name: firstName,
        l_name: lastName
    }

    $.ajax("/register", {
        type: "POST",
        data: newUser
    }).then(() => {
        // Once the user is registered, they will be redirected to the 'login' page
        window.location.replace("/login");
    });

});