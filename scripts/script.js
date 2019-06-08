const navBarToggle = document.getElementById('js-navmenu-toggle');
const mainNav = document.getElementById('js-menu');
let isMobileMenuHidden = true;

window.onscroll = () => {
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (window.pageYOffset / docHeight) * 100;
  document.getElementById('js-scroll-bar').style.width = `${scrolled}%`;
};

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

document.addEventListener(
  'click',
  function(event) {
    if (event.target.matches('.js-navsearch-toggle')) {
      openSearch();
    }

    if (event.target.matches('.btn-close-search')) {
      closeSearch();
    }
  },
  false
);

function openSearch() {
  document.getElementById('js-search-overlay').style.display = 'block';
}

function closeSearch() {
  document.getElementById('js-search-overlay').style.display = 'none';
}
