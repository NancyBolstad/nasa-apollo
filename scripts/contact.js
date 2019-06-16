function validateForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  //RFC2822 Email Validation, refer to:https://regexr.com/2rhq7
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  const whiteSpaceRegex=/^\s*$/;

  if (whiteSpaceRegex.test(name) || name == null) {
    alert('Name cannot be empty');
    document.getElementById('name').focus();
    return false;
  }

  if (emailRegex.test(email) == false) {
    alert('Please type in a correct email address.');
    document.getElementById('email').focus();
    return false;
  }

  if (whiteSpaceRegex.test(message) || message == null) {
    alert('Message cannot be empty');
    document.getElementById('message').focus();
    return false;
  }

  if (
    !confirm(
      'Your contact information has been validated. Do you want to submit the form?'
    )
  ) {
    return false;
  }
}
