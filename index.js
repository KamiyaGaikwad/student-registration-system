// select required form elements
const addStudentDetailsBtn = document.querySelector("#add-student-details-btn");
const studentNameInput = document.getElementById("student-name");
const studentIdInput = document.getElementById("student-id");
const emailIdInput = document.getElementById("email-id");
const contactNoInput = document.getElementById("contact-no");

// select update form elements and associated buttons and containers
const updateStudentDetailsBtn = document.querySelector("#update-student-details-btn");
const updateStudentNameInput = document.getElementById("update-student-name");
const updateStudentIdInput = document.getElementById("update-student-id");
const updateEmailIdInput = document.getElementById("update-email-id");
const updateContactNoInput = document.getElementById("update-contact-no");
const modalContainer = document.getElementById("modal-container");

//select table elements
const tableBody = document.getElementById("table-body");
const table = document.querySelector("table");
const noTablePara = document.querySelector(".no-table");

//created empty single student object
let studentDetails = {};

// Check if data exists in localStorage, otherwise use default
let studentData = JSON.parse(localStorage.getItem("studentData")) || [{ studentName: "John Doe", studentId: 12345, emailId: "john@example.com", contactNo: 1023456789 }];


// error flag to check if all fields are correct
let errorIntialFlag = { name: false, id: false, email: false, contact: false };
let errorFlag = { name: false, id: false, email: false, contact: false };
let updateErrorIntialFlag = { name: true, email: true, contact: true };
let updateErrorFlag = { name: true, email: true, contact: true };

// add initial student data to the table (default or from local storage)
addStudentData();


// Add an event listener to the add student details button 
addStudentDetailsBtn.addEventListener("click", function (e) {
    // prevent the default behaviour
    e.preventDefault();

    // if all fields are validated then create a object, push to data array and add to data table as well as local storage
    if (errorFlag.name && errorFlag.id && errorFlag.email && errorFlag.contact) {
        studentDetails = { studentName: studentNameInput.value, studentId: studentIdInput.value, emailId: emailIdInput.value, contactNo: contactNoInput.value };
        studentData.push(studentDetails);

        // reset form data
        studentNameInput.value = "";
        studentIdInput.value = "";
        emailIdInput.value = "";
        contactNoInput.value = "";

        // call function to add to table and local storage
        addStudentData();

        //reset error flags
        errorFlag = { ...errorIntialFlag };
    }
});

function addStudentData() {
    // Update localStorage
    localStorage.setItem("studentData", JSON.stringify(studentData));

    let data = '';

    // map student data and create new table rows dynamically
    if (studentData.length > 0) {
        studentData.map(({ studentName, studentId, emailId, contactNo }) => {
            data += `<tr><td>${studentName}</td><td>${studentId}</td><td>${emailId}</td><td>${contactNo}</td><td><button onclick="updateStudentData(${studentId})">Update</button></td><td><button onclick="deleteStudentData(${studentId})">Delete</button></td></tr>`;
        });
        // set the new table data
        tableBody.innerHTML = data;
        table.style.display = "block";
        noTablePara.style.display = "none";
    }
    else {
        // if no student data is saved show an empty state
        table.style.display = "none";
        noTablePara.style.display = "block";
        noTablePara.innerHTML = `No student data table found. Please add student data by the form.`;
    }

    modalContainer.classList.add("hide"); //hide modal which is the update form
}

// update existing student data
function updateStudentData(studentIdValue) {
    modalContainer.classList.remove("hide"); //show modal which is update form

    //add student id related data to update form which needs to be edited
    let oneStudentDetails = studentData.find(({ studentId }) => Number(studentIdValue) === Number(studentId));
    updateStudentNameInput.value = oneStudentDetails.studentName;
    updateStudentIdInput.value = oneStudentDetails.studentId;
    updateEmailIdInput.value = oneStudentDetails.emailId;
    updateContactNoInput.value = oneStudentDetails.contactNo;
}

// remove student data by removing selected id from array and updating the local storage and existing table
function deleteStudentData(studentIdValue) {
    studentData = studentData.filter(({ studentId }) => Number(studentIdValue) !== Number(studentId));
    addStudentData(); // update data on table and local storage
}

// add an event listner to the update student data button
updateStudentDetailsBtn.addEventListener("click", function (e) {
    e.preventDefault();  // Prevent default form submission if inside a form

    //if no errors are found
    if (updateErrorFlag.name && updateErrorFlag.email && updateErrorFlag.contact) {

        modalContainer.classList.add("hide");  // Hide the modal

        // Update studentData with new values
        studentData = studentData.map(({ studentName, studentId, emailId, contactNo }) => {
            if (updateStudentIdInput.value == studentId) {
                // Return updated student data
                return {
                    studentName: updateStudentNameInput.value,
                    studentId,  // Keep the student ID unchanged
                    emailId: updateEmailIdInput.value,
                    contactNo: updateContactNoInput.value
                };
            }
            else {
                return { studentName, studentId, emailId, contactNo }; //else return data as it is
            }

        });

        addStudentData(); //update table and local storage data

        //reset updated form error flag
        updateErrorFlag = { ...updateErrorIntialFlag };
    }
});

// Function to prevent adding dot by clicking double space
function defaultPreventDoubleSpaceToAddDot(e) {
    if (e.key == " ") {
        e.preventDefault();
    }
};

// function to close the modal
function closeModal() {
    modalContainer.classList.add("hide");
}

// validate email id using regex and show error message accordingly
function validateEmail(event) {
    const emailInput = event.target.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailErrorMessage = document.getElementById('email-error');

    if (!(emailRegex.test(emailInput))) {
        emailErrorMessage.textContent = "Invalid email! Valid Email Format: ab1@def.com";
        emailIdInput.style.border = "1px solid #dc3545";
        errorFlag.email = false;

    } else {
        emailErrorMessage.textContent = "";
        emailIdInput.style.border = "1px solid gray";
        errorFlag.email = true;
    }
}

// function to validate the name entered by the user and showing an error if incorrect.
function validateName(e) {

    const nameErrorMessage = document.getElementById('name-error');
    const nameRegex = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
    let nameValue = e.target.value.trim();

    // Check for errors
    if (nameValue.length < 2) {
        nameErrorMessage.textContent = "Name must be at least 2 characters long.";
        studentNameInput.style.border = "1px solid #dc3545";
        errorFlag.name = false;
    }

    else if (!(nameRegex.test(nameValue))) {
        nameErrorMessage.textContent = "Name cannot contain numbers or special characters.";
        studentNameInput.style.border = "1px solid #dc3545";
        errorFlag.name = false;
    }

    else {
        nameErrorMessage.textContent = '';
        studentNameInput.style.border = "1px solid gray";
        errorFlag.name = true;
    }

}

// validate the student ID to be a number having 1-5 digits, show error in all other cases.
function validateId(e) {

    const idErrorMessage = document.getElementById('id-error');
    let idValue = e.target.value;

    // Check for errors
    if (idValue.length < 1) {
        idErrorMessage.textContent = "Id must be at least 1 digit long.";
        studentIdInput.style.border = "1px solid #dc3545";
        errorFlag.id = false;
    }

    else if (idValue.length > 5) {
        idErrorMessage.textContent = "Id cannot contain more than 5 digits.";
        studentIdInput.style.border = "1px solid #dc3545";
        errorFlag.id = false;
    }

    else {
        idErrorMessage.textContent = '';
        studentIdInput.style.border = "1px solid gray";
        errorFlag.id = true;
    }

}

// validate that contact number is a 10 digit number
function validateContact(e) {

    const contactErrorMessage = document.getElementById('contact-error');
    let contactValue = e.target.value;

    // Check for errors
    if (contactValue.length < 10 || contactValue.length > 10) {
        contactErrorMessage.textContent = "Contact number must be of 10 digits.";
        contactNoInput.style.border = "1px solid #dc3545";
        errorFlag.contact = false;
    }

    else {
        contactErrorMessage.textContent = '';
        contactNoInput.style.border = "1px solid gray";
        errorFlag.contact = true;
    }

}

// validate name during updating
function validateUpdateName(e) {

    const nameErrorMessage = document.getElementById('update-name-error');
    const nameRegex = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
    let nameValue = e.target.value.trim();

    // Check for errors
    if (nameValue.length < 2) {
        nameErrorMessage.textContent = "Name must be at least 2 characters long.";
        studentNameInput.style.border = "1px solid #dc3545";
        updateErrorFlag.name = false;
    }

    else if (!(nameRegex.test(nameValue))) {
        nameErrorMessage.textContent = "Name cannot contain numbers or special characters.";
        studentNameInput.style.border = "1px solid #dc3545";
        updateErrorFlag.name = false;
    }

    else {
        nameErrorMessage.textContent = '';
        studentNameInput.style.border = "1px solid gray";
        updateErrorFlag.name = true;
    }

}

// validate the email id during updating
function validateUpdateEmail(event) {
    const emailInput = event.target.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailErrorMessage = document.getElementById('update-email-error');

    if (!(emailRegex.test(emailInput))) {
        emailErrorMessage.textContent = "Invalid email! Valid Email Format: ab1@def.com";
        emailIdInput.style.border = "1px solid #dc3545";
        updateErrorFlag.email = false;

    } else {
        emailErrorMessage.textContent = "";
        emailIdInput.style.border = "1px solid gray";
        updateErrorFlag.email = true;
    }
}

// validate contact during updating
function validateUpdateContact(e) {

    const contactErrorMessage = document.getElementById('update-contact-error');
    let contactValue = e.target.value;

    // Check for errors
    if (contactValue.length < 10 || contactValue.length > 10) {
        contactErrorMessage.textContent = "Contact number must be of 10 digits.";
        contactNoInput.style.border = "1px solid #dc3545";
        updateErrorFlag.contact = false;
    }

    else {
        contactErrorMessage.textContent = '';
        contactNoInput.style.border = "1px solid gray";
        updateErrorFlag.contact = true;
    }

}