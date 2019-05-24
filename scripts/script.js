let navBarToggle = document.getElementById('js-navmenu-toggle');

navBarToggle.addEventListener('click', function() {
  const isHidden = document.getElementById('js-menu').style.display;

  if (isHidden === 'none') {
    document.getElementById('js-navmenu-toggle').classList.remove('fa-bars');
    document.getElementById('js-navmenu-toggle').classList.add('fa-times');
    document.getElementById('js-menu').style.display = 'block';
  } else {
    document.getElementById('js-navmenu-toggle').classList.remove('fa-times');
    document.getElementById('js-navmenu-toggle').classList.add('fa-bars');
    document.getElementById('js-menu').style.display = 'none';
  }
});
