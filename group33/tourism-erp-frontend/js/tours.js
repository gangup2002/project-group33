loadTours();

function saveTour(){

const tour = {

tourName: document.getElementById("tourName").value,
destination: document.getElementById("destination").value,
duration: parseInt(document.getElementById("duration").value),
price: parseFloat(document.getElementById("price").value),
availability: document.getElementById("availability").value

};

fetch("http://localhost:8082/api/tours",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(tour)

})

.then(response=>response.json())

.then(data=>{

alert("Tour Added Successfully");

loadTours();

clearForm();

});

}

function loadTours(){

fetch("http://localhost:8082/api/tours")

.then(response=>response.json())

.then(data=>{

let rows="";

data.forEach(tour=>{

rows += `

<tr>

<td>${tour.id}</td>

<td>${tour.tourName}</td>

<td>${tour.destination}</td>

<td>${tour.duration}</td>

<td>${tour.price}</td>

<td>${tour.availability}</td>

<td>

<button
class="btn btn-primary btn-sm"
onclick="editTour(${tour.id},
'${tour.tourName}',
'${tour.destination}',
${tour.duration},
${tour.price},
'${tour.availability}')">

Edit

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteTour(${tour.id})">

Delete

</button>

</td>

</tr>

`;

});

document.getElementById("tourTable").innerHTML=rows;

});

}

function editTour(id,name,destination,duration,price,availability){

document.getElementById("tourId").value=id;
document.getElementById("tourName").value=name;
document.getElementById("destination").value=destination;
document.getElementById("duration").value=duration;
document.getElementById("price").value=price;
document.getElementById("availability").value=availability;

document.getElementById("updateBtn").style.display="inline-block";

}

function updateTour(){

const id=document.getElementById("tourId").value;

const tour={

tourName: document.getElementById("tourName").value,
destination: document.getElementById("destination").value,
duration: parseInt(document.getElementById("duration").value),
price: parseFloat(document.getElementById("price").value),
availability: document.getElementById("availability").value

};

fetch(`http://localhost:8082/api/tours/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(tour)

})

.then(response=>response.json())

.then(data=>{

alert("Tour Updated");

loadTours();

clearForm();

});

}

function deleteTour(id){

fetch(`http://localhost:8082/api/tours/${id}`,{

method:"DELETE"

})

.then(()=>{

alert("Tour Deleted");

loadTours();

});

}

function clearForm(){

document.getElementById("tourId").value="";
document.getElementById("tourName").value="";
document.getElementById("destination").value="";
document.getElementById("duration").value="";
document.getElementById("price").value="";
document.getElementById("availability").value="";

document.getElementById("updateBtn").style.display="none";

}