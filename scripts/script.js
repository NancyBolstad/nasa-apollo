let navBarToggle = document.getElementById('js-navmenu-toggle');

navBarToggle.addEventListener('click', function() {
  const isHidden = document.getElementById('js-menu').style.display;

  if (isHidden === 'none') {
    document.getElementById('js-menu').style.display = 'block';
  } else {
    document.getElementById('js-menu').style.display = 'none';
  }
  console.log('test');
});

console.log('hello');
