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
        window.location.reload();
    });

});


// GET request to get all users from the database
$("#loginBtn").on("click", () => {
    $.get("/login")
    .done(data => {
        console.log(data);
        for(let i = 0; i < data.length; i++){
            let id = data[i].id;
            let name = data[i].f_name + " " + data[i].l_name;
            let user = $("<li><a href='/user/transactions/"+ id + "'>" + name + "</a></li>");
            $("#user-login").append(user);
        }
    });
})