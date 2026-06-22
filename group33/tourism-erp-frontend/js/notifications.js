loadNotifications();

function loadNotifications(){

fetch("http://localhost:8086/api/notifications")

.then(response=>response.json())

.then(data=>{

let rows="";

data.forEach(notification=>{

rows += `

<tr>

<td>${notification.id}</td>

<td>${notification.recipient}</td>

<td>${notification.message}</td>

<td>${notification.type}</td>

<td>${notification.status}</td>

<td>${notification.sentDate}</td>

</tr>

`;

});

document.getElementById("notificationTable").innerHTML = rows;

});

}