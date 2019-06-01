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


//create Lorem Ipsum titles to shuffle through
var fakeTitle = ["Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.", "Ligula porta felis euismod semper.", "Maecenas faucibus mollis interdum.", "Sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.", "Morbi leo risus, porta ac consectetur ac, vestibulum at eros."];

//loop through fakeTitle and randomize
//Not sure if this is the best way to do this, but it gets the job done for the demo
 function randomTitle(min, max) {
  return Math.floor(Math.random() * ((fakeTitle.length) - 0)) + 0;
}

function addElement () { 
//create random number for image generation
var unsplashNum = Math.floor(Math.random() * 1084) + 1;

var newsContainer = document.getElementById("news-grid");
// create a new article element 
var newDiv = document.createElement("article");
newDiv.className = "block";
// and give it some content
newDiv.innerHTML ='<div class="block-hero"><img src="https://unsplash.it/600/400?image='+ unsplashNum +'"></div><div class="block-body"><h1>' + fakeTitle[randomTitle()] + '</h1></div>';  
// add the newly created element and its content into the DOM  
//document.getElementById("news-grid").appendChild(newDiv);
newsContainer.insertBefore(newDiv, newsContainer.childNodes[0]);

}

function removeElement(){
var parent = document.getElementById("news-grid");
var child = document.getElementsByTagName("article")[0];
parent.removeChild(child);
}

