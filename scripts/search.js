const container = document.getElementById('js-search-results-container');
const searchInput = document.getElementById('js-search-page-input');
const searchButton = document.getElementById('js-search-page-button');

searchButton.addEventListener('click', () => {
  search(searchInput.value);
});

searchInput.addEventListener('keypress', key => {
  if (key.keyCode === 13) {
    searchButton.click();
  }
});

function message(msg) {
  const message = document.createElement('h2');
  message.innerText = msg;
  container.appendChild(message);
}

async function search() {
  try {
    const data = await (await fetch(
      'https://images-api.nasa.gov/search?media_type=image&q=moon+landing&keywords=Apollo 11'
    )).json();
    render(data.collection);
  } catch (error) {
    alert(error);
  }
}

function render(data) {
  console.log(1111111111);
  remove(container);
  const { items } = data;
  if (items.length > 0) {
    console.log(items);
    items.forEach(element => {
      console.log(element);
      const { title, nasa_id } = element.data[0];
      console.log(333333333);
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
