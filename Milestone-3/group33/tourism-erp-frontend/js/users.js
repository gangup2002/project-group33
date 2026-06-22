loadUsers();

function saveUser(){

const user = {

fullName: document.getElementById("fullName").value,
email: document.getElementById("email").value,
password: document.getElementById("password").value,
role: document.getElementById("role").value

};

fetch("http://localhost:8081/api/users",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(user)

})

.then(response=>response.json())

.then(data=>{

alert("User Added Successfully");

loadUsers();

clearForm();

});

}

function loadUsers(){

fetch("http://localhost:8081/api/users")

.then(response=>response.json())

.then(data=>{

let rows="";

data.forEach(user=>{

rows += `

<tr>

<td>${user.id}</td>

<td>${user.fullName}</td>

<td>${user.email}</td>

<td>${user.role}</td>

<td>

<button
class="btn btn-danger btn-sm"
onclick="deleteUser(${user.id})">

Delete

</button>

</td>

</tr>

`;

});

document.getElementById("userTable").innerHTML = rows;

});

}

function deleteUser(id){

fetch(`http://localhost:8081/api/users/${id}`,{

method:"DELETE"

})

.then(()=>{

alert("User Deleted");

loadUsers();

});

}

function clearForm(){

document.getElementById("fullName").value="";
document.getElementById("email").value="";
document.getElementById("password").value="";
document.getElementById("role").value="";

}