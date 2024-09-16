# Student Registration System

The **Student Registration System** is a web application designed to allow students to register their personal details such as their name, student ID, email address, and contact number. The system provides functionality to add, edit, and delete student records, which are displayed in a table. The data is dynamically handled through JavaScript and stored in the browser’s local storage for persistence.

## Table of Contents

- [Live Demo](#live-demo)
- [Github](#github-repository)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)

## Live Demo

You can access the live demo of the project [here](https://student-registration-system1.netlify.app/).


## GitHub Repository

The source code for this project is available on GitHub: [Student Registration System](https://github.com/KamiyaGaikwad/student-registration-system.git).


## Features

- **Add New Student**: Register students with details like name, student ID, email, and contact number.
- **Edit Student Details**: Modify a student's existing details except for the student ID.
- **Delete Student**: Remove a student’s record from the system.
- **Form Validations**: Input validation for all fields, including checks for correct name format, valid student ID (1-5 digits), valid email format, and 10-digit contact number.
- **Local Storage Persistence**: Data persists even after refreshing the page, because of local storage.
- **Dynamic Table**: Display added student data in a table that updates automatically.
- **Modal for Editing**: Students' details can be edited through a modal dialogue.

## Technologies Used

- **HTML5**: Structuring the web page using semantic HTML elements.
- **CSS3**: For styling the form, buttons, table, and modal, making it visually appealing.
- **JavaScript (ES6)**: For input validation, handling form submissions, dynamic table updates, and local storage operations.
- **Font Awesome**: Provide icons in the form and modal.
- **LocalStorage API**: To store student data persistently within the browser.

## Installation


1. **Clone the repository**:
    ```bash
    git clone https://github.com/KamiyaGaikwad/student-registration-system.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd student-registration-system
    ```

3. **Open `index.html` in a browser**:
    - You can simply double-click `index.html` to open it in your default browser.
    - Alternatively, you can use a live server extension in VSCode or any other local server setup to run the project.

## Usage

1. **Register New Students**: 
    - Enter a valid name, student ID, email address, and contact number in the form.
    - Click the "Add Student Details" button.
    - The student data will appear in the table below the form.

2. **Edit Student Details**:
    - Click the "Update" button next to the student in the table.
    - A modal will appear, allowing you to modify the student's name, email, or contact number.
    - Click the "Update Student Details" button to save the changes.

3. **Delete Student Details**:
    - Click the "Delete" button next to the student in the table.
    - The student’s data will be removed from the table and local storage.

## File Structure

```bash
.
├── favicon_io_student/   # Favicon images for the webpage
├── index.html            # Main HTML file for the student registration system
├── style.css             # Custom CSS for the web page styling
├── index.js              # JavaScript logic for handling form, table, and validations
└── README.md             # Documentation file
