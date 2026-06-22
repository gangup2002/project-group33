loadBookings();

function saveBooking(){

const booking = {

customerName: document.getElementById("customerName").value,
tourId: parseInt(document.getElementById("tourId").value),
bookingDate: document.getElementById("bookingDate").value,
peopleCount: parseInt(document.getElementById("peopleCount").value),
status: document.getElementById("status").value

};

fetch("http://localhost:8083/api/bookings",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(booking)

})

.then(response=>response.json())

.then(data=>{

alert("Booking Added Successfully");

loadBookings();

clearForm();

});

}

function loadBookings(){

fetch("http://localhost:8083/api/bookings")

.then(response=>response.json())

.then(data=>{

let rows="";

data.forEach(booking=>{

rows += `

<tr>

<td>${booking.id}</td>

<td>${booking.customerName}</td>

<td>${booking.tourId}</td>

<td>${booking.bookingDate}</td>

<td>${booking.peopleCount}</td>

<td>${booking.status}</td>

<td>

<button
class="btn btn-primary btn-sm"
onclick="editBooking(
${booking.id},
'${booking.customerName}',
${booking.tourId},
'${booking.bookingDate}',
${booking.peopleCount},
'${booking.status}'
)">

Edit

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteBooking(${booking.id})">

Delete

</button>

</td>

</tr>

`;

});

document.getElementById("bookingTable").innerHTML = rows;

});

}

function editBooking(id,name,tourId,date,people,status){

document.getElementById("bookingId").value=id;
document.getElementById("customerName").value=name;
document.getElementById("tourId").value=tourId;
document.getElementById("bookingDate").value=date;
document.getElementById("peopleCount").value=people;
document.getElementById("status").value=status;

document.getElementById("saveBtn").style.display="none";

document.getElementById("updateBtn").style.display="inline-block";

document.getElementById("cancelBtn").style.display="inline-block";

}

function updateBooking(){

const id=document.getElementById("bookingId").value;

const booking = {

customerName: document.getElementById("customerName").value,
tourId: parseInt(document.getElementById("tourId").value),
bookingDate: document.getElementById("bookingDate").value,
peopleCount: parseInt(document.getElementById("peopleCount").value),
status: document.getElementById("status").value

};

fetch(`http://localhost:8083/api/bookings/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(booking)

})

.then(response=>response.json())

.then(data=>{

alert("Booking Updated");

loadBookings();

clearForm();

});

}

function deleteBooking(id){

fetch(`http://localhost:8083/api/bookings/${id}`,{

method:"DELETE"

})

.then(()=>{

alert("Booking Deleted");

loadBookings();

});

}

function clearForm(){

document.getElementById("bookingId").value="";
document.getElementById("customerName").value="";
document.getElementById("tourId").value="";
document.getElementById("bookingDate").value="";
document.getElementById("peopleCount").value="";
document.getElementById("status").value="";

document.getElementById("saveBtn").style.display="inline-block";

document.getElementById("updateBtn").style.display="none";

document.getElementById("cancelBtn").style.display="none";

}