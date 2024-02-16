
window.addEventListener("DOMContentLoaded", () => {
  // Fetch existing data and display on screen 
  axios.get("https://crudcrud.com/api/a1577291827046f69345718fd63985fd/passwordDetails")
      .then((response) => {
          response.data.forEach(passwordDetails => {
              displayPasswordDetailsOnScreen(passwordDetails);
          });
          updatePasswordCounter();
      })
      .catch((error) => {
          console.error(error);
      });
});

function handleFormSubmit(event) {
  event.preventDefault();
  // Get password details from the form
  const passwordDetails = {
      title: event.target.title.value,
      password: event.target.password.value
  };
  // Post password details to the server
  axios.post("https://crudcrud.com/api/a1577291827046f69345718fd63985fd/passwordDetails", passwordDetails)
      .then((response) => {
          displayPasswordDetailsOnScreen(response.data);
          updatePasswordCounter();
      })
      .catch((error) => {
          console.log(error);
      });
     
  // Clear input fields after form submission
  event.target.title.value = "";
  event.target.password.value = "";
}

// Display inputs on screen
function displayPasswordDetailsOnScreen(passwordDetails) {
  const passwordList = document.createElement('li');
  const display = document.createTextNode(`${passwordDetails.title} - ${passwordDetails.password} - `);
  passwordList.appendChild(display);

  // Create a delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', function () {
      // Make delete request to crud-crud api
      axios.delete(`https://crudcrud.com/api/a1577291827046f69345718fd63985fd/passwordDetails/${passwordDetails._id}`)
          .then((response) => {
              if (response.status === 200) {
                  passwordList.remove();
                  updatePasswordCounter();
              }
          })
          .catch((error) => {
              console.log(error);
          });
  });
  passwordList.appendChild(deleteBtn);

  // Create an edit button
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', function () {
      // Populate the form with the entered details for editing
      document.getElementById("title").value = passwordDetails.title;
      document.getElementById("password").value = passwordDetails.password;
      passwordList.remove();
  });
  passwordList.appendChild(editBtn);

  // Append password list to the user list
  const userList = document.querySelector("ul");
  userList.appendChild(passwordList);
}
// Update password counter
function updatePasswordCounter() {
  const passwordCounter = document.getElementById('password-counter');
  const passwordItems = document.querySelectorAll('li');
  passwordCounter.textContent = passwordItems.length;
}
// Search functionality
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.value.toLowerCase();
  const passwordItems = document.querySelectorAll('li');
  passwordItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
          item.style.display = 'block';
      } else {
          item.style.display = 'none';
      }
  });
  updatePasswordCounter();
});

