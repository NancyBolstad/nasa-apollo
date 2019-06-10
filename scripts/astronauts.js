const containerArmstrong = document.getElementById(
  'js-details-container-armstrong'
);
const containerAldrin = document.getElementById('js-details-container-aldrin');
const containerCollins = document.getElementById(
  'js-details-container-collins'
);

(async function fetchArmstrong() {
  try {
    const urlArmstrong =
      'https://images-api.nasa.gov/search?media_type=image&nasa_id=9018112';
    const data = await (await fetch(urlArmstrong)).json();
    const title = 'Neil Armstrong';
    populateData(data.collection.items[0], containerArmstrong, title);
  } catch (error) {
    alert(error);
  }
})();

(async function fetchAldrin() {
  try {
    const urlAldrin =
      'https://images-api.nasa.gov/search?media_type=image&nasa_id=As11-36-5390';
    const data = await (await fetch(urlAldrin)).json();
    const title = 'Edwin Aldrin';
    populateData(data.collection.items[0], containerAldrin, title);
  } catch (error) {
    alert(error);
  }
})();

(async function fetchCollins() {
  try {
    const urlCollins =
      'https://images-api.nasa.gov/search?media_type=image&nasa_id=6900845';
    const data = await (await fetch(urlCollins)).json();
    const title = 'Michael Collins';
    populateData(data.collection.items[0], containerCollins, title);
  } catch (error) {
    alert(error);
  }
})();

function populateData(item, container, title) {
  const { description, nasa_id } = item.data[0];
  const imgsrc = item.links[0].href;

  const mediaContainer = document.createElement('div');
  mediaContainer.setAttribute('class', 'details-media');

  const media = document.createElement('img');
  media.setAttribute('alt', `NASA ID ${nasa_id}`);
  media.setAttribute('src', `${imgsrc}`);

  const contentContainer = document.createElement('div');
  contentContainer.setAttribute('class', 'details-text');

  const contentTitle = document.createElement('h2');
  contentTitle.innerText = title;

  const contentDescription = document.createElement('p');
  contentDescription.innerText = description;

  const link = document.createElement('a');
  link.setAttribute('class', 'details-link');
  link.setAttribute('title', `Got to ${title}`);
  link.setAttribute('href', `./search-results.html?search=${title}`);
  link.innerHTML = `Read more about ${title} &#187;`;

  container.appendChild(mediaContainer);
  container.appendChild(contentContainer);
  mediaContainer.appendChild(media);
  contentContainer.appendChild(contentTitle);
  contentContainer.appendChild(contentDescription);
  contentContainer.appendChild(link);
}
