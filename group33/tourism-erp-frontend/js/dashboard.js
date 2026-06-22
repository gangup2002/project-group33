loadDashboard();

function loadDashboard(){

fetch("http://localhost:8081/api/users")
.then(res=>res.json())
.then(data=>{
document.getElementById("userCount").innerText=data.length;
});

fetch("http://localhost:8082/api/tours")
.then(res=>res.json())
.then(data=>{
document.getElementById("tourCount").innerText=data.length;
});

fetch("http://localhost:8083/api/bookings")
.then(res=>res.json())
.then(data=>{
document.getElementById("bookingCount").innerText=data.length;
});

fetch("http://localhost:8084/api/customers")
.then(res=>res.json())
.then(data=>{
document.getElementById("customerCount").innerText=data.length;
});

fetch("http://localhost:8085/api/staff")
.then(res=>res.json())
.then(data=>{
document.getElementById("staffCount").innerText=data.length;
});

fetch("http://localhost:8086/api/notifications")
.then(res=>res.json())
.then(data=>{
document.getElementById("notificationCount").innerText=data.length;
});

}