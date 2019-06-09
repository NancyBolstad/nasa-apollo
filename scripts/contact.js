function validateForm() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;
  //RFC2822 Email Validation, refer to:https://regexr.com/2rhq7
  var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  console.log(111111111);

  if (name == '' || name == null) {
    alert('Name cannot be empty');
    document.getElementById('name').focus();
    return false;
  }

  //Use regex expressions to validate the telephone and email addresses respectively.
  if (emailRegex.test(email) == false) {
    alert('Please type in a correct email address.');
    document.getElementById('email').focus();
    return false;
  }

  if (message == '' || message == null) {
    alert('Message cannot be empty');
    document.getElementById('message').focus();
    return false;
  }

  if (
    alert(
      'Your contact information has been validated. Do you want to submit the form?'
    )
  ) {
    return false;
  }

  return true;
}
