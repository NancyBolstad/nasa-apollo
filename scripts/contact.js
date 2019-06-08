function validateForm() {
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    //RFC2822 Email Validation, refer to:https://regexr.com/2rhq7
    var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    //Regular expression for Norwegian phone number consisting of 8 digits
    var phoneRegex = /^([0-9]{8})$/;

    //Validate that 'name' and 'last name' inputs are not empty. 
    if (firstName == "" || firstName == null) {
        document.getElementById("msg").innerHTML = "First name cannot be empty.";
        document.getElementById("first-name").focus();
        return false;
    }

    if (lastName == "" || lastName == null) {
        document.getElementById("msg").innerHTML = "Last name cannot be empty.";
        document.getElementById("last-name").focus();
        return false;
    }

    //Use regex expressions to validate the telephone and email addresses respectively.   
    if (emailRegex.test(email) == false) {
        document.getElementById("msg").innerHTML = "Please type in a correct email address.";
        document.getElementById("email").focus();
        return false;
    }

    if (phoneRegex.test(phone) == false) {
        document.getElementById("msg").innerHTML = "Please type in a correct Norwegian phone number consisting of 8 digits.";
        document.getElementById("phone").focus();
        return false;
    }

    if (!confirm("Your contact information has been validated. Do you want to submit the form?")) {
        return false;
    }

    return true;
}
