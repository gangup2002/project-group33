loadStaff();

function saveStaff(){

const staff = {

fullName: document.getElementById("fullName").value,
position: document.getElementById("position").value,
department: document.getElementById("department").value,
taskAssigned: document.getElementById("taskAssigned").value,
schedule: document.getElementById("schedule").value

};

fetch("http://localhost:8085/api/staff",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(staff)

})

.then(response=>response.json())

.then(data=>{

alert("Staff Added Successfully");

loadStaff();

clearForm();

});

}

function loadStaff(){

fetch("http://localhost:8085/api/staff")

.then(response=>response.json())

.then(data=>{

let rows="";

data.forEach(staff=>{

rows += `

<tr>

<td>${staff.id}</td>

<td>${staff.fullName}</td>

<td>${staff.position}</td>

<td>${staff.department}</td>

<td>${staff.taskAssigned}</td>

<td>${staff.schedule}</td>

<td>

<button
class="btn btn-primary btn-sm"
onclick="editStaff(
${staff.id},
'${staff.fullName}',
'${staff.position}',
'${staff.department}',
'${staff.taskAssigned}',
'${staff.schedule}'
)">

Edit

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteStaff(${staff.id})">

Delete

</button>

</td>

</tr>

`;

});

document.getElementById("staffTable").innerHTML = rows;

});

}

function editStaff(id,name,position,department,task,schedule){

document.getElementById("staffId").value=id;
document.getElementById("fullName").value=name;
document.getElementById("position").value=position;
document.getElementById("department").value=department;
document.getElementById("taskAssigned").value=task;
document.getElementById("schedule").value=schedule;

document.getElementById("saveBtn").style.display="none";
document.getElementById("updateBtn").style.display="inline-block";
document.getElementById("cancelBtn").style.display="inline-block";

}

function updateStaff(){

const id=document.getElementById("staffId").value;

const staff = {

fullName: document.getElementById("fullName").value,
position: document.getElementById("position").value,
department: document.getElementById("department").value,
taskAssigned: document.getElementById("taskAssigned").value,
schedule: document.getElementById("schedule").value

};

fetch(`http://localhost:8085/api/staff/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(staff)

})

.then(response=>response.json())

.then(data=>{

alert("Staff Updated");

loadStaff();

clearForm();

});

}

function deleteStaff(id){

fetch(`http://localhost:8085/api/staff/${id}`,{

method:"DELETE"

})

.then(()=>{

alert("Staff Deleted");

loadStaff();

});

}

function clearForm(){

document.getElementById("staffId").value="";
document.getElementById("fullName").value="";
document.getElementById("position").value="";
document.getElementById("department").value="";
document.getElementById("taskAssigned").value="";
document.getElementById("schedule").value="";

document.getElementById("saveBtn").style.display="inline-block";
document.getElementById("updateBtn").style.display="none";
document.getElementById("cancelBtn").style.display="none";

}