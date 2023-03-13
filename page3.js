$(document).ready(function() {
    // create an array to store user data
    var userData = [];
  
    // check if localStorage already has user data
    if (localStorage.getItem("userData")) {
      userData = JSON.parse(localStorage.getItem("userData"));
      displayUserData();
    }
  
    // handle form submission
    $("#regForm").submit(function(e) {
      e.preventDefault();
      // validate email address
      var email = $("#email").val();
      if (!validateEmail(email)) {
        alert("Invalid Email Address");
        return false;
      }
  
      // validate age
      var dob = new Date($("#dob").val());
      var age = calculateAge(dob);
      if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old to register");
        return false;
      }
  
      // store user data in an object
      var user = {
        name: $("#name").val(),
        email: email,
        password: $("#password").val(),
        dob: $("#dob").val(),
        terms: $("#terms").prop("checked")
      };
  
      // add user data to userData array and save to localStorage
      userData.push(user);
      localStorage.setItem("userData", JSON.stringify(userData));
  
      // clear the form
      $("#name").val("");
      $("#email").val("");
      $("#password").val("");
      $("#dob").val("");
      $("#terms").prop("checked", false);
  
      // add user data to the table
      addRow(user);
  
      // show success message
      alert("Registration Successful");
    });
  
    // function to calculate age from date of birth
    function calculateAge(dob) {
      var diffMs = Date.now() - dob.getTime();
      var ageDt = new Date(diffMs);
      return Math.abs(ageDt.getUTCFullYear() - 1970);
    }
  
    // function to validate email address
    function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  
    // function to display user data in the table
    function displayUserData() {
      // clear the table body
      $("#userTable tbody").empty();
  
      // check if localStorage has user data and add it to the table
      if (localStorage.getItem("userData")) {
        userData = JSON.parse(localStorage.getItem("userData"));
        userData.forEach(function(user) {
          addRow(user);
        });
      }
    }
  
    // function to add a row to the table
    function addRow(user) {
      var row = "<tr>" +
                "<td>" + user.name + "</td>" +
                "<td>" + user.email + "</td>" +
                "<td>" + user.password + "</td>" +
                "<td>" + user.dob + "</td>" +
                "<td>" + user.terms + "</td>" +
                "</tr>";
      $("#userTable tbody").prepend(row);
    }
  });
  