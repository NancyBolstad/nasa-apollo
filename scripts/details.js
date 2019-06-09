function hasQueryString() {
  console.log(111111111);
  const pageParams = new URLSearchParams(window.location.search);
  const id = pageParams.get('id');
  if (!pageParams.toString() || !id.toString()) {
    alert('Empty query string! Redirecting you to the home page ...');
    window.location = './index.html';
  } else {
    const url = `https://images-api.nasa.gov/search?media_type=image&q=${encodeURIComponent(
      id
    )}`;
    fetch(url)
      .then(response => {
        if (!response.ok) throw Error('Failed to retrieve images');
        return response.json();
      })
      .then(obj => {
        if (obj.collection.items.length > 0) {
          console.log(obj.collection.items[0]);
          render(obj.collection.items[0]);
        } else {
          alert('Wrong ID. Redirecting you to the home page ...');
          window.location = './index.html';
        }
      })
      .catch(error => {
        console.log(error);
        alert('Failed to retrieve data.');
      });
  }
}

function render(item) {
  console.log(22222222);
  let { date_created, title, nasa_id, description, keywords } = item.data[0];

  const imgsrc = item.links[0].href;
  const container = document.getElementById('js-details-container');

  //Fix a bug when searching, for instance id:S74-28972
  if (keywords) {
    //If keywords exist, search for related articles, based on the first keyword.
    fetchRelated(keywords[0]);
  } else {
    //If not, search with default query
    fetchRelated('apollo 11');
  }

  //Convert a unix timestamp returned from the API to normal date
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

async function fetchRelated(query) {
  try {
    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;
    const data = await (await fetch(url)).json();
    renderRelated(data.collection.items);
  } catch (error) {
    console.log(error);
    alert('Failed to retrieve data.');
  }
}

function renderRelated(items) {
  console.log(items.length);
  const container = document.getElementById('js-articles-container');

  //To ensure rendering even if there are less than four related articles.For instance, ID: LRC-1953-B701_P-78457's keyword Vogely only has one related article.
  const max = 4;
  let itemsToShow = items;
  if (items.length > max) {
    itemsToShow = items.slice(0, 4);
  }

  itemsToShow.forEach(element => {
    let { title, nasa_id } = element.data[0];
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

    const readMore = document.createElement('a');
    readMore.setAttribute('class', 'article-read-more');
    readMore.setAttribute('href', `./details.html?id=${nasa_id}`);
    readMore.innerHTML = 'Continue reading &#187;';

    container.appendChild(newItem);
    newItem.appendChild(link);
    newItem.appendChild(image);
    newItem.appendChild(content);
    content.appendChild(articleTitle);
    content.appendChild(text);
    text.appendChild(readMore);
  });
}
