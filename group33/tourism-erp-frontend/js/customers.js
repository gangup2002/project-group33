loadCustomers();

function saveCustomer(){

const customer = {

fullName: document.getElementById("fullName").value,
email: document.getElementById("email").value,
phone: document.getElementById("phone").value,
preferences: document.getElementById("preferences").value,
feedback: document.getElementById("feedback").value

};

fetch("http://localhost:8084/api/customers",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(customer)

})

.then(response=>response.json())

.then(data=>{

alert("Customer Added Successfully");

loadCustomers();

clearForm();

});

}

function loadCustomers(){

fetch("http://localhost:8084/api/customers")

.then(response=>response.json())

.then(data=>{

let rows="";

data.forEach(customer=>{

rows += `

<tr>

<td>${customer.id}</td>

<td>${customer.fullName}</td>

<td>${customer.email}</td>

<td>${customer.phone}</td>

<td>${customer.preferences}</td>

<td>${customer.feedback}</td>

<td>

<button
class="btn btn-primary btn-sm"
onclick="editCustomer(
${customer.id},
'${customer.fullName}',
'${customer.email}',
'${customer.phone}',
'${customer.preferences}',
'${customer.feedback}'
)">

Edit

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteCustomer(${customer.id})">

Delete

</button>

</td>

</tr>

`;

});

document.getElementById("customerTable").innerHTML = rows;

});

}

function editCustomer(id,name,email,phone,preferences,feedback){

document.getElementById("customerId").value=id;
document.getElementById("fullName").value=name;
document.getElementById("email").value=email;
document.getElementById("phone").value=phone;
document.getElementById("preferences").value=preferences;
document.getElementById("feedback").value=feedback;

document.getElementById("saveBtn").style.display="none";
document.getElementById("updateBtn").style.display="inline-block";
document.getElementById("cancelBtn").style.display="inline-block";

}

function updateCustomer(){

const id=document.getElementById("customerId").value;

const customer = {

fullName: document.getElementById("fullName").value,
email: document.getElementById("email").value,
phone: document.getElementById("phone").value,
preferences: document.getElementById("preferences").value,
feedback: document.getElementById("feedback").value

};

fetch(`http://localhost:8084/api/customers/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(customer)

})

.then(response=>response.json())

.then(data=>{

alert("Customer Updated");

loadCustomers();

clearForm();

});

}

function deleteCustomer(id){

fetch(`http://localhost:8084/api/customers/${id}`,{

method:"DELETE"

})

.then(()=>{

alert("Customer Deleted");

loadCustomers();

});

}

function clearForm(){

document.getElementById("customerId").value="";
document.getElementById("fullName").value="";
document.getElementById("email").value="";
document.getElementById("phone").value="";
document.getElementById("preferences").value="";
document.getElementById("feedback").value="";

document.getElementById("saveBtn").style.display="inline-block";
document.getElementById("updateBtn").style.display="none";
document.getElementById("cancelBtn").style.display="none";

}