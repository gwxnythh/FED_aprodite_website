/*
    get membership
*/
// Function to get membership details
function getMembership() {
    try {
        // get the name from sessionStorage
        let name = sessionStorage.getItem("name");
        // fetch data from the API using the name as a query parameter
        fetch(`https://aproditedb-320d.restdb.io/rest/membership?q={"name":"${name}"}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache",
            },
        })
            .then(response => {
                // check if the response status is OK (200)
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error fetching membership. Status: " + response.status);
                }
            })
            .then(data => {
                // assuming the response is an array of membership objects
                const membership = data.find((member) => member.name === name);

                if (membership) {
                    const { email, totalPurchase, tier } = membership;
                    const capitalizedTier = tier.charAt(0).toUpperCase() + tier.slice(1); //
                    console.log("Email:", email);
                    console.log("Tier:", tier);
                    console.log("Total Purchases:", totalPurchase);
                    // Update HTML with membership details
                    document.getElementById("member-name").innerHTML = name;
                    document.getElementById("member-email").innerHTML = email;
                    document.getElementById("member-tier").innerHTML = capitalizedTier; //
                    document.getElementById("member-purchases").innerHTML = totalPurchase;
                } else {
                    console.log("Member not found");
                }
            })
            .catch(error => {
                console.error("Error fetching membership:", error);
            });
    } catch (error) {
        console.error("Error fetching membership:", error);
    }
}

// Call the function to get membership details and update HTML
getMembership();

/*
    update membership
*/
function UpdateMember() {
    try {
        let name = sessionStorage.getItem("name");
        let id = sessionStorage.getItem("memberid"); // assuming you store memberid in sessionStorage

        // Fetch current membership details
        fetch(`https://aproditedb-320d.restdb.io/rest/membership/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache",
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error fetching membership for update. Status: " + response.status);
                }
            })
            .then(data => {
                let totalpurchased = data.totalpurchase + 1;

                // determine tier based on totalPurchase
                let tier = "Bronze";
                if (totalpurchased > 4) {
                    tier = "Silver";
                }
                if (totalpurchased > 9) {
                    tier = "Gold";
                }
                if (totalpurchased > 14) {
                    tier = "Platinum";
                }

                let jsondata = {
                    totalpurchase: totalpurchased,
                    Tier: tier,
                };

                fetch(`https://aproditedb-320d.restdb.io/rest/membership/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "x-apikey": APIKEY,
                        "Cache-Control": "no-cache",
                    },
                    body: JSON.stringify(jsondata),
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw new Error("Error updating member. Status: " + res.status);
                        }
                    })
                    .then((response) => {
                        console.log("Member updated successfully:", response);
                        window.alert("Member updated successfully!");
                    })
                    .catch((error) => {
                        console.error("Error updating member:", error);
                        window.alert("Error updating member. Please check the console for details.");
                    });
            })
            .catch(error => {
                console.error("Error fetching membership for update:", error);
                window.alert("Error updating member. Please check the console for details.");
            });
    } catch (error) {
        console.error("Error updating member:", error);
        window.alert("Error updating member. Please check the console for details.");
    }
}