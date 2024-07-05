let editingRowIndex = null;

document.getElementById("myform")?.addEventListener("submit", (event) => {
  event.preventDefault();
  var fname = document.getElementById("firstname").value;
  var lname = document.getElementById("lastname").value;
  var email = document.getElementById("email").value;

  var storedata = {
    firstname: fname,
    lastname: lname,
    email: email
  };

  if (editingRowIndex === null) {
    saveData(storedata);
  } else {
    updateData(editingRowIndex, storedata);
    editingRowIndex = null;
  }

  window.location.href = 'index.html'; 
});

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

function insertNewRecord(data) {
  var table = document.getElementById("studentlist").getElementsByTagName('tbody')[0];
  var newRow = table.insertRow();

  newRow.insertCell(0).innerHTML = data.firstname;
  newRow.insertCell(1).innerHTML = data.lastname;
  newRow.insertCell(2).innerHTML = data.email;
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

  const data = JSON.parse(localStorage.getItem('storedata')) || [];
  const rowData = data[editingRowIndex];

  
  sessionStorage.setItem('editingRowIndex', editingRowIndex);
  sessionStorage.setItem('rowData', JSON.stringify(rowData));

  window.location.href = 'form.html'; 
}

document.addEventListener("DOMContentLoaded", loadTableData);

function loadTableData() {
  if (document.getElementById("studentlist")) { 
    const data = JSON.parse(localStorage.getItem('storedata')) || [];
    data.forEach(item => insertNewRecord(item));
  }

  
  if (document.getElementById("myform") && sessionStorage.getItem('rowData')) {
    const rowData = JSON.parse(sessionStorage.getItem('rowData'));
    editingRowIndex = parseInt(sessionStorage.getItem('editingRowIndex'));

    document.getElementById("firstname").value = rowData.firstname;
    document.getElementById("lastname").value = rowData.lastname;
    document.getElementById("email").value = rowData.email;

   
    sessionStorage.removeItem('editingRowIndex');
    sessionStorage.removeItem('rowData');
  }
}
