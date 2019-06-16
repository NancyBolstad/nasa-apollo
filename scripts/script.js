//Toggle mobile nav menu
const navBarToggle = document.getElementById('js-navmenu-toggle');
const mainNav = document.getElementById('js-menu');
let isMobileMenuHidden = true;

navBarToggle.addEventListener('click', function() {
  isMobileMenuHidden = !isMobileMenuHidden;

  if (!isMobileMenuHidden) {
    navBarToggle.classList.remove('fa-bars');
    navBarToggle.classList.add('fa-times');
  } else {
    navBarToggle.classList.remove('fa-times');
    navBarToggle.classList.add('fa-bars');
  }

  mainNav.classList.toggle('active');
});

//Toggle search screen
document.addEventListener(
  'click',
  function(event) {
    if (event.target.matches('.js-navsearch-toggle')) {
      document.getElementById('js-search-overlay').style.display = 'block';
    }

    if (event.target.matches('.btn-close-search')) {
      document.getElementById('js-search-overlay').style.display = 'none';
    }
  },
  false
);

//Scroll indicator
window.onscroll = () => {
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (window.pageYOffset / docHeight) * 100;
  document.getElementById('js-scroll-bar').style.width = `${scrolled}%`;
};

document
  .getElementById('js-search-button')
  .addEventListener('click', validateInput);

document.getElementById('js-search-input').addEventListener('keypress', key => {
  if (key.keyCode === 13) {
    validateInput();
  }
});

function validateInput() {
  event.preventDefault();
  const whiteSpaceRegex = /^\s*$/;
  const input = document.getElementById('js-search-input').value;

  if (whiteSpaceRegex.test(input) || input == null) {
    alert('Input can not be empty.');
    return false;
  } else {
    document
      .getElementById('js-search-button')
      .setAttribute('formaction', 'search-results.html');
    document.getElementById('js-search-form').submit();
  }
}
