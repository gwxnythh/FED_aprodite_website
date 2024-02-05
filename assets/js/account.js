document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65abfab7e0155af749808958";

    if (document.getElementById("register-btn")) {
        document.getElementById("register-btn").addEventListener("click", function (e) {
            // prevents default action of button
            e.preventDefault();

            let Name = document.getElementById("create-name").value;
            let Email = document.getElementById("create-email").value;
            let Password = document.getElementById("create-password").value;

            // grabs all the data from the form into one json package

            let jsondata1 = {
                name: Name,
                email: Email,
                password: Password,
            };
            
            let jsondata2 = {
                name: Name,
                email: Email,
                totalPurchase: 0,
                tier: "Bronze",
            };

            // empty fields checker
            if (Name === "" || Email === "" || Password === "" || !Email.includes("@")) {
                window.alert("Please fill in all the fields! :) - Email must contain @ -");
                return false;
            }

            // create and check for unique email
            createAcc();
            createMembership();

            function createAcc() {
                fetch(`https://aproditedb-320d.restdb.io/rest/accounts?q={"email":"${Email}"}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "x-apikey": APIKEY,
                        "Cache-Control": "no-cache",
                    },
                })
                    .then((res) => res.json())
                    .then((response) => {
                        console.log(response);
                        if (response.length > 0) {
                            window.alert("Email already exists!");
                            return false;
                        } else {
                            let settings = {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "x-apikey": APIKEY,
                                    "Cache-Control": "no-cache",
                                },
                                body: JSON.stringify(jsondata1),
                            };
                            fetch("https://aproditedb-320d.restdb.io/rest/accounts", settings)
                                .then((response) => response.json())
                                .then((data) => {
                                    console.log(data);
                                    window.alert("Account created successfully!");
                                    // clears form after submitting
                                    document.getElementById("create-name").value = "";
                                    document.getElementById("create-email").value = "";
                                    document.getElementById("create-password").value = "";
                                });
                        }
                    });
            }

            function createMembership() {
                {
                    // CREATE OUR AJAX SETTINGS
                    let settings = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-apikey": APIKEY,
                            "Cache-Control": "no-cache",
                        },
                        body: JSON.stringify(jsondata2),
                    };
                    fetch("https://aproditedb-320d.restdb.io/rest/membership", settings)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data);
                        });
                }
            };
        }
        )
    };

    /* LOGIN FUNCTION */
    const loginBtn = document.getElementById("login-btn");

    if (loginBtn) {
        loginBtn.addEventListener("click", function (e) {
            var name = "";
            var checkiflogged = false;
            // Prevent default action of the button
            e.preventDefault();

            let Email = document.getElementById("login-email").value;
            let Password = document.getElementById("login-password").value;

            // GET EMAIL AND PASSWORD FROM DATABASE AND COMPARE
            fetch(`https://aproditedb-320d.restdb.io/rest/accounts?q={"email":"${Email}","password":"${Password}"}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache",
                },
            })
                .then((res) => res.json())
                .then((response) => {
                    console.log(response);
                    if (response.length > 0) {

                        name = response[0].name;
                        sessionStorage.setItem("name", name);

                        checkiflogged = true;
                        sessionStorage.setItem("checkiflogged", checkiflogged);

                        window.alert("Login successful!");
                        window.location.href = "index.html";
                    } else {
                        window.alert("Invalid email or password!");
                    }
                });
        });
    }
});
