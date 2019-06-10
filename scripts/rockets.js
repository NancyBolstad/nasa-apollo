const containerRocket = document.getElementById('js-details-container-rocket');
const containerFlight = document.getElementById('js-details-container-flight');
const containerStation = document.getElementById(
  'js-details-container-station'
);

(async function fetchRocket() {
  try {
    const urlArmstrong =
      'https://images-api.nasa.gov/search?media_type=image&nasa_id=As14-67-09361';
    const data = await (await fetch(urlArmstrong)).json();
    const title = 'Lunar Module-4';
    populateData(data.collection.items[0], containerRocket, title);
  } catch (error) {
    alert(error);
  }
})();

(async function fetchFlight() {
  try {
    const urlAldrin =
      'https://images-api.nasa.gov/search?media_type=image&nasa_id=6900556';
    const data = await (await fetch(urlAldrin)).json();
    const title = 'Saturn 505';
    populateData(data.collection.items[0], containerFlight, title);
  } catch (error) {
    alert(error);
  }
})();

(async function fetchStation() {
  try {
    const urlCollins =
      'https://images-api.nasa.gov/search?media_type=image&nasa_id=S71-17620';
    const data = await (await fetch(urlCollins)).json();
    const title = 'Spacecraft 106';
    populateData(data.collection.items[0], containerStation, title);
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
  link.setAttribute('title', `Go to ${title}`);
  link.setAttribute('href', `./search-result.html?search=${title}`);
  link.innerHTML = `Read more about ${title} &#187;`;

  container.appendChild(mediaContainer);
  container.appendChild(contentContainer);
  mediaContainer.appendChild(media);
  contentContainer.appendChild(contentTitle);
  contentContainer.appendChild(contentDescription);
  contentContainer.appendChild(link);
}
