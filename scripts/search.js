const container = document.getElementById('js-search-results-container');
const searchInput = document.getElementById('js-search-page-input');
const searchButton = document.getElementById('js-search-page-button');

searchButton.addEventListener('click', () => {
  const input = searchInput.value;
  const url = `https://images-api.nasa.gov/search?media_type=image&keywords=Apollo&q=${input}`;
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
});

searchInput.addEventListener('keypress', key => {
  if (key.keyCode === 13) {
    event.preventDefault();
    document.getElementById('js-search-page-button').click();
  }
});

function message(msg) {
  const message = document.createElement('h2');
  message.innerText = msg;
  container.appendChild(message);
}

function render(data, input) {
  remove(container);
  const { items } = data;
  console.log(items.length);
  const amount = document.getElementById('js-search-result-amount');
  amount.innerHTML = `${items.length} search results for "${input}"`;
  items.forEach(element => {
    console.log(element);
    const { title, nasa_id } = element.data[0];
    const imgsrc = element.links[0].href;
    const resultContainer = document.createElement('div');
    resultContainer.setAttribute('class', 'search-result');
    container.appendChild(resultContainer);

    resultContainer.innerHTML = `<a href="${nasa_id}" class="search-result-link"></a>
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
  });
}

function remove(container) {
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}

function sortData(data) {
  let { items } = data;

  items.sort((a, b) => {
    return a.data[0].date_created > b.data[0].date_created ? 1 : -1;
  });

  populateTimeline(items);
}
