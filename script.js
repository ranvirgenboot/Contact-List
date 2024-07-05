let editingRowIndex = null; // To keep track of the row being edited

document.getElementById("submit").addEventListener("click", () => {
  var fname = document.getElementById("firstname").value;
  var lname = document.getElementById("lastname").value;
  var email = document.getElementById("email").value;

  var storedata = {
    firstname: fname,
    lastname: lname,
    email: email
  };

   
  validation(); 

  console.log(storedata);
  if (editingRowIndex === null) {
    saveData(storedata);
    insertNewRecord(fname, lname, email);
  } else {
    updateData(editingRowIndex, storedata);
    updateTableRow(editingRowIndex, storedata);
    editingRowIndex = null;
  }})


function saveData(storedata) {
  const data = JSON.parse(localStorage.getItem('storedata')) || [];
  data.push(storedata);
  localStorage.setItem('storedata', JSON.stringify(data));
}

function updateData(index, storedata) {
  const data = JSON.parse(localStorage.getItem('storedata')) || [];
  data[index] = storedata;
  localStorage.setItem('storedata', JSON.stringify(data));
}

function insertNewRecord(fname, lname, email) {
  var table = document.getElementById("studentlist").getElementsByTagName('tbody')[0];
  var newRow = table.insertRow();
  
  newRow.insertCell(0).innerHTML = fname;
  newRow.insertCell(1).innerHTML = lname;
  newRow.insertCell(2).innerHTML = email;
  newRow.insertCell(3).innerHTML = `<button onClick="onEdit(this)">Edit</button>
                                    <button onClick="onDelete(this)">Delete</button>`;
}

function updateTableRow(index, storedata) {
  var table = document.getElementById("studentlist").getElementsByTagName('tbody')[0];
  var row = table.rows[index];
  
  row.cells[0].innerHTML = storedata.firstname;
  row.cells[1].innerHTML = storedata.lastname;
  row.cells[2].innerHTML = storedata.email;
}

function onDelete(td) {
  let row = td.parentElement.parentElement;
  let rowIndex = row.rowIndex - 1;
  var table = document.getElementById("studentlist").getElementsByTagName('tbody')[0];
  table.deleteRow(rowIndex);
  
  const data = JSON.parse(localStorage.getItem('storedata')) || [];
  data.splice(rowIndex, 1);
  localStorage.setItem('storedata', JSON.stringify(data));
}

function onEdit(td) {
  let row = td.parentElement.parentElement;
  editingRowIndex = row.rowIndex - 1;

  document.getElementById("firstname").value = row.cells[0].innerHTML;
  document.getElementById("lastname").value = row.cells[1].innerHTML;
  document.getElementById("email").value = row.cells[2].innerHTML;
}

function add() {
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";
  editingRowIndex = null;
}

document.addEventListener("DOMContentLoaded", loadTableData);

function loadTableData() {
  const data = JSON.parse(localStorage.getItem('storedata')) || [];
  data.forEach(item => insertNewRecord(item.firstname, item.lastname, item.email));
}

function validation(){
if( document.getElementById("firstname").value == "" ||
  document.getElementById("lastname").value == "" ||
  document.getElementById("email").value == ""){
  alert("values cant be empty");
}
return false;
}