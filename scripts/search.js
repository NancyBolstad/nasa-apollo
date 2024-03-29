const container = document.getElementById('js-search-results-container');
const searchInput = document.getElementById('js-search-page-input');
const searchButton = document.getElementById('js-search-page-button');
const spinner = document.getElementById('js-loader');
const whiteSpaceRegex = /^\s*$/;

//Ensure that search results page's url does not have empty query
(function hasQueryString() {
  const pageParams = new URLSearchParams(window.location.search);
  const input = pageParams.get('search');

  if (
    !pageParams.toString() ||
    !input.toString() ||
    whiteSpaceRegex.test(input)
  ) {
    alert('Empty query string! Redirecting you to the home page ...');
    window.location = './index.html';
  } else {
    fetchData(input, renderSearchResults);
  }
})();

searchButton.addEventListener('click', validateInput);

//Optimise Search UX for keyboard usage
searchInput.addEventListener('keypress', key => {
  if (key.keyCode === 13) {
    event.preventDefault();
    validateInput();
  }
});

function validateInput() {
  const input = searchInput.value;
  //Validate that the search input is not empty
  if (whiteSpaceRegex.test(input) || input == null) {
    alert('The search field cannot be empty. Please try again.');
    //Set return null to stop the function
    return null;
  } else {
    //Optimise Search UX: Update url after user enters an input.
    location.assign(`search-results.html?search=${input}`);
  }
}

//Reusable fetch function takes two variables: query string, and a callback function
async function fetchData(query, doNext) {
  try {
    showSpinner();
    //Encode input, since input is part of the url
    const url = `https://images-api.nasa.gov/search?media_type=image&keywords=Apollo&q=${encodeURIComponent(
      query
    )}`;
    const data = await (await fetch(url)).json();
    doNext(data.collection, query);
  } catch (error) {
    alert(error);
  }
}

function renderSearchResults(data, input) {
  const { items } = data;

  //Search UX: Hint for search results
  const amount = document.getElementById('js-search-results-amount');
  amount.innerHTML = `${items.length} search results for "${input}"`;

  //Remove child nodes
  remove(container);

  items.forEach(element => {
    const { title, nasa_id } = element.data[0];
    const imgsrc = element.links[0].href;

    const resultContainer = document.createElement('div');
    resultContainer.setAttribute('class', 'search-result');

    const link = document.createElement('a');
    link.setAttribute('class', 'search-result-link');
    link.setAttribute('title', `Got to ${title}`);
    link.setAttribute('aria-label', `Got to ${title}`);
    link.setAttribute('href', `details.html?id=${nasa_id}`);

    const media = document.createElement('img');
    media.setAttribute('src', imgsrc);
    media.setAttribute('alt', title);
    media.setAttribute('class', 'search-result-media');

    const content = document.createElement('div');
    content.setAttribute('class', 'search-result-content');

    const resultTitle = document.createElement('h2');
    resultTitle.setAttribute('class', 'search-result-title');

    //Since some titles from the API are very long  by default : for instance, NASA ID: As14-66-9233
    if (title.length < 80) {
      resultTitle.innerText = title;
    } else {
      resultTitle.innerText = `${title.substr(0, 80)}...`;
    }
    const resultDescription = document.createElement('div');
    resultDescription.setAttribute('class', 'search-result-description');

    const readMore = document.createElement('a');
    readMore.setAttribute('class', 'search-read-more');
    readMore.setAttribute('title', `Got to ${title}`);
    readMore.setAttribute('href', `details.html?id=${nasa_id}`);
    readMore.innerHTML = 'View details &#187;';

    container.appendChild(resultContainer);
    resultContainer.appendChild(link);
    resultContainer.appendChild(media);
    resultContainer.appendChild(content);
    content.appendChild(resultTitle);
    content.appendChild(resultDescription);
    resultDescription.appendChild(readMore);
  });
}

function remove(container) {
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}

function showSpinner() {
  spinner.className = 'visible';
  setTimeout(() => {
    spinner.className = spinner.className.replace('visible', '');
  }, 3000);
}
