/*
    #display the current date
*/
document.addEventListener("DOMContentLoaded", function () {
    var currentDateElement = document.getElementById("currentDate");

    // gets the current date
    var currentDate = new Date();

    // formats the date as MM/DD/YYYY
    var formattedDate = '[' + currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' +  currentDate.getFullYear();

    // format the time as HH:MM:SS
    var formattedTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds() + ']';

    // update the content of the element
    currentDateElement.textContent += formattedDate + ' ' + formattedTime;
});

/*
    #put data in the leaderboard
*/
// Fetch data from the API
fetch('https://aproditedb-320d.restdb.io/rest/membership', {
    headers: {
        'Content-Type': 'application/json',
        'x-apikey': '65abfab7e0155af749808958', // Replace with your API key
    },
})
.then(response => response.json())
.then(data => {
    // Update the table with fetched data
    data.sort((a, b) => b.totalPurchase - a.totalPurchase);
    const leaderboardBody = document.getElementById('leaderboard-body');

    data.slice(0, 10).forEach((member, index) => {
        const row = document.createElement('tr');
        const position = index + 1;

        if (member.totalPurchase >= 1) {
        // Set color directly in JavaScript
        const color = getPositionColor(position);
        
        row.innerHTML = `
            <td style="color: ${color}">${position}</td>
            <td>${member.name}</td>
            <td>${member.totalPurchase}</td>
        `;
        leaderboardBody.appendChild(row);
        }
    });
})
.catch(error => console.error('Error fetching data:', error));

// Function to determine color based on position
function getPositionColor(position) {
    if (position === 1) {
        return 'gold';
    } else if (position === 2) {
        return 'silver';
    } else if (position === 3) {
        return 'orange';
    } else {
        return ''; // Default color for other positions
    }
}