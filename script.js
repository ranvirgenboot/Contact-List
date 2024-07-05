document.querySelector("#submit");
submit.addEventListener("click", () => {

 var fname = document.querySelector("#firstname").value;
 var lname = document.querySelector("#lastname").value;
 var email= document.querySelector("#email").value;
  

  var storedata = {
    firstname: fname,
    lastname: lname,
    email: email
   };
   console.log(storedata);
   saveData(storedata);
   insertNewRecord(fname,lname,email);
  });

 function saveData(storedata) {
  const data = JSON.parse(localStorage.getItem('storedata')) || [];
  data.push(storedata);
  localStorage.setItem('storedata', JSON.stringify(data));


 }
 function insertNewRecord(fname, lname, email) {
  var table = document.getElementById("studentlist").getElementsByTagName('tbody')[0];
  var newRow = table.insertRow();
  var fnamerow = newRow.insertCell(0);
  fnamerow.innerHTML = fname;
  var lnamerow = newRow.insertCell(1);
  lnamerow.innerHTML = lname;
  var emailrow = newRow.insertCell(2);
  emailrow.innerHTML = email;
  var actionrow = newRow.insertCell(3);
  actionrow.innerHTML = `<button onClick="onEdit(this)">Edit</button>
                     <button onClick="onDelete(this)">Delete</button>`;
}

function onDelete(td) {
   let row = td.parentElement.parentElement;
   document.getElementById("studentlist").deleteRow(row.rowIndex);
  
}

function onEdit(td) {
  let row = td.parentElement.parentElement;
  document.querySelector("#firstname").value = row.cells[0].innerHTML;
  document.querySelector("#lastname").value = row.cells[1].innerHTML;
  document.querySelector("#email").value = row.cells[2].innerHTML;
}

function add()
{
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";
}



 




  

  
  