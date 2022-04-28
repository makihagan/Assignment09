// CREATE AN ARRAY OF EMPLOYEES
let tempEmp = [
        [12345678, "Nick Cage", 1234, "nickc@email.com", "Executive"], 
        [23456789, "Saul Goodman", 2345, "saulg@email.com", "Marketing"], 
        [34567890, "Walter White", 3456, "walterw@email.com", "Engineering"], 
        [45678901, "Erin Brockovich", 4567, "erinb@email.com", "Administrative"],
        [56789012, "Napoleon Dynamite", 5678, "napoleond@email.com", "Sales"]];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY

let storedEmp = JSON.parse(localStorage.getItem('storedEmp'));
let arrayEmp = [];

if (storedEmp === null) {
    arrayEmp = tempEmp;
} else {
    arrayEmp = storedEmp;
}

// GET DOM ELEMENTS
const $ = (id) => document.getElementById(id);
let form = $('addForm');
let employees = $('employees');
let tbody = document.querySelector('tbody');
tbody.setAttribute('id', 'empData');
let empData = $('empData');
let empCount = $('empCount');
let count = 0;
let tr, td, deleteButton, texteDelete;


// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
window.addEventListener('load', () => {
    $('id').focus();
    for (let emp of arrayEmp) {
        tr = document.createElement('tr');
        empData.appendChild(tr);
        let objArray = Object.entries(emp);
        objArray.forEach((arr) => {
            td = document.createElement('td');
            td.textContent = arr[1];
            tr.appendChild(td);
        })
        td = document.createElement('td');
        deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        textDelete = document.createTextNode('X');
        deleteBtn.appendChild(textDelete);
        td.appendChild(deleteBtn);
        tr.appendChild(td);
    }
    empCount.innerHTML = `(${arrayEmp.length})`;
});

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();
    // GET THE VALUES FROM THE TEXT BOXES
    let id = $('id').value;
    let name = $('name').value;
    let extension = $('extension').value;
    let email = $('email').value;
    let department = $('department').value;
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newEmp =[id, name, extension, email, department]
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    arrayEmp.push(newEmp);
    // BUILD THE GRID
    tr = document.createElement('tr');
    empData.appendChild(tr);
    for (emp of newEmp) {
        td = document.createElement('td');
        let newEmpData = document.createTextNode(emp);
        td.appendChild(newEmpData);
        tr.appendChild(td);
    }
    td = document.createElement('td');
    deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    textDelete = document.createTextNode('X');
    deleteBtn.appendChild(textDelete);
    td.appendChild(deleteBtn);
    tr.appendChild(td);

    empCount.innerHTML = `(${arrayEmp.length})`;
    localStorage.setItem("storedEmp", JSON.stringify(arrayEmp));

    // RESET THE FORM
    form.reset();
    // SET FOCUS BACK TO THE ID TEXT BOX
    $('id').focus();
});

// DELETE EMPLOYEE
employees.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if(e.target.tagName === 'BUTTON') {
        if (confirm('Are you sure you want to delete this employee?')) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let targetRow = e.target.parentElement.parentElement.rowIndex;
        // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
            employees.deleteRow(targetRow);
        // REMOVE EMPLOYEE FROM ARRAY
            // console.log(targetRow)
            let removeArray = arrayEmp.splice((targetRow - 1),1);
            
            empCount.innerHTML = `(${arrayEmp.length})`;
            localStorage.setItem("storedEmp", JSON.stringify(arrayEmp));
            $('id').focus();
        }
    }
});

localStorage.setItem('storedEmp', JSON.stringify(arrayEmp));

// BUILD THE EMPLOYEES GRID
// function buildGrid() {
//     // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION

//     // REBUILD THE TBODY FROM SCRATCH

//     // LOOP THROUGH THE ARRAY OF EMPLOYEES
//     // REBUILDING THE ROW STRUCTURE

//     // BIND THE TBODY TO THE EMPLOYEE TABLE

//     // UPDATE EMPLOYEE COUNT

//     // STORE THE ARRAY IN STORAGE

// };
