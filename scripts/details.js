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
  const imgsrc = item.links[0].href;
  const container = document.getElementById('js-details-container');

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
