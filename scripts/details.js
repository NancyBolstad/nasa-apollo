function hasQueryString() {
  const pageParams = new URLSearchParams(window.location.search);
  const id = pageParams.get('id');
  if (!pageParams.toString() || !id.toString()) {
    alert('Empty query string! Redirecting you to the home page ...');
    window.location = './index.html';
  } else {
    const input = pageParams.get('id');
    const url = `https://images-api.nasa.gov/search?media_type=image&keywords=Apollo&q=${encodeURIComponent(
      id
    )}`;
    fetch(url)
      .then(response => {
        if (!response.ok) throw Error('Failed to retrieve images');
        return response.json();
      })
      .then(obj => {
        console.log(obj.collection.items[0]);
        render(obj.collection.items[0]);
      })
      .catch(error => {
        alert(error);
      });
  }
}

function render(item) {
  let { date_created, title, location, nasa_id, description } = item.data[0];
  let keyword = 'apollo 11';
  if (item.data[0].keywords > 1) {
    keyword = item.data[0].keywords[1];
  } else {
    keyword = item.data[0].keywords[0];
  }

  const imgsrc = item.links[0].href;
  const container = document.getElementById('js-details-container');

  fetchRelated(keyword);
  console.log(item.data[0].keywords[0]);

  date_created = new Date(date_created);
  date_created =
    date_created.getFullYear() +
    '/' +
    date_created.getMonth() +
    '/' +
    date_created.getDate();

  const mediaContainer = document.createElement('div');
  mediaContainer.setAttribute('class', 'details-media');

  const media = document.createElement('img');
  media.setAttribute('alt', `NASA ID ${nasa_id}`);
  media.setAttribute('src', `${imgsrc}`);

  const contentContainer = document.createElement('div');
  contentContainer.setAttribute('class', 'details-text');

  const contentTitle = document.createElement('h2');
  contentTitle.innerText = title;

  const contentId = document.createElement('h6');
  contentId.innerText = `NASA ID: ${nasa_id}`;

  const contentDate = document.createElement('h6');
  contentDate.innerText = `Date Created: ${date_created}`;

  const contentDescription = document.createElement('p');
  contentDescription.innerText = description;

  container.appendChild(mediaContainer);
  container.appendChild(contentContainer);
  mediaContainer.appendChild(media);
  contentContainer.appendChild(contentTitle);
  contentContainer.appendChild(contentId);
  contentContainer.appendChild(contentDate);
  contentContainer.appendChild(contentDescription);
}

hasQueryString();

async function fetchRelated(keyword) {
  try {
    console.log(keyword);
    const url = `https://images-api.nasa.gov/search?keywords=${keyword}&media_type=image`;
    const data = await (await fetch(url)).json();
    renderRelated(data.collection.items);
  } catch (error) {
    alert(error);
  }
}

function renderRelated(items) {
  console.log(222222);
  const container = document.getElementById('js-articles-container');
  items.slice(9, 15).forEach(element => {
    let { description, title, nasa_id } = element.data[0];
    var imgsrc = element.links[0].href;

    const newItem = document.createElement('div');
    newItem.setAttribute('class', 'article-item');

    const link = document.createElement('a');
    link.setAttribute('class', 'article-link');
    link.setAttribute('href', `details.html?id=${nasa_id}`);

    const image = document.createElement('img');
    image.setAttribute('class', 'article-media');
    image.setAttribute('alt', `${title}`);
    image.setAttribute('src', `${imgsrc}`);

    const content = document.createElement('div');
    content.setAttribute('class', 'article-content');

    const articleTitle = document.createElement('h2');
    articleTitle.setAttribute('class', 'article-title');
    articleTitle.innerText = title;

    const text = document.createElement('div');
    text.setAttribute('class', 'article-description');

    text.innerHTML = `<p>${description.substring(
      0,
      100
    )}&hellip;</p><a href="./details.html?id=${nasa_id}" class="article-read-more">Continue reading &#187;</a>`;

    container.appendChild(newItem);
    newItem.appendChild(link);
    newItem.appendChild(image);
    newItem.appendChild(content);
    content.appendChild(articleTitle);
    content.appendChild(text);
  });
}
