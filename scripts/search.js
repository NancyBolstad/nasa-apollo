const container = document.getElementById('js-search-results-container');
const searchInput = document.getElementById('js-search-page-input');
const searchButton = document.getElementById('js-search-page-button');
const spinner = document.getElementById('js-loader');

searchButton.addEventListener('click', () => {
  const input = searchInput.value;
  const url = `https://images-api.nasa.gov/search?media_type=image&q=${encodeURIComponent(
    input
  )}`;

  if (input == '' || input == null) {
    alert('Input cannot be empty, try again!');
    return null;
  }
  showSpinner();
  fetch(url)
    .then(response => {
      if (!response.ok) throw Error('Failed to retrieve images');
      return response.json();
    })
    .then(obj => {
      render(obj.collection, input);
    })
    .catch(error => {
      console.log(error);
    });
});

searchInput.addEventListener('keypress', key => {
  if (key.keyCode === 13) {
    event.preventDefault();
    document.getElementById('js-search-page-button').click();
  }
});

function render(data, input) {
  remove(container);
  const { items } = data;
  const amount = document.getElementById('js-search-result-amount');
  amount.innerHTML = `${items.length} search results for "${input}"`;
  items.forEach(element => {
    const { title, nasa_id } = element.data[0];
    const imgsrc = element.links[0].href;
    const resultContainer = document.createElement('div');
    resultContainer.setAttribute('class', 'search-result');

    resultContainer.innerHTML = `<a href="details.html?id=${nasa_id}" class="search-result-link"></a>
            <img
              src="${imgsrc}"
              alt="${title}"
              class="search-result-media"
            />
            <div class="search-result-content">
              <h2 class="search-result-title">
                ${title}
              </h2>
              <div class="search-result-description">
                <a href="details.html?id=${nasa_id}" class="search-read-more">Continue reading &#187;</a>
              </div>`;
              
    container.appendChild(resultContainer);
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
  }, 2000);
  console.log('Test: Loading...');
}

function hasQueryString() {
  const pageParams = new URLSearchParams(window.location.search);
  const input = pageParams.get('search');
  if (!pageParams.toString() || !input.toString()) {
    alert('Empty query string! Redirecting you to the home page ...');
    window.location = './index.html';
  } else {
    const url = `https://images-api.nasa.gov/search?media_type=image&keywords=Apollo&q=${encodeURIComponent(
      input
    )}`;
    showSpinner();
    fetch(url)
      .then(response => {
        if (!response.ok) throw Error('Failed to retrieve images');
        return response.json();
      })
      .then(obj => {
        render(obj.collection, input);
      })
      .catch(error => {
        alert(error);
      });
  }
}

hasQueryString();
