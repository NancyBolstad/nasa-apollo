const endpoint = 'https://images-api.nasa.gov/search?media_type=image&';
const query = `q=${encodeURIComponent(
  'apollo 11'
)}&year_start=1969&year_end=1969`;

const prelaunchContainer = document.getElementById('js-prelaunch-container');
const launchContainer = document.getElementById('js-launch-container');
const landingContainer = document.getElementById('js-landing-container');

(async () => {
  try {
    const data = await (await fetch(endpoint + query)).json();
    formateData(data.collection);
  } catch (error) {
    alert(error);
  }
})();

function formateData(data) {
  let { items } = data;

  items.sort((a, b) => {
    return a.data[0].date_created > b.data[0].date_created ? 1 : -1;
  });

  populateTimeline(items);
}

function populateTimeline(items) {
  const preLaunchItems = items.slice(0, 15);
  const launchItems = items.slice(16, 30);
  const landingItems = items.slice(30, 45);
  renderTimelineItems(preLaunchItems, prelaunchContainer);
  renderTimelineItems(launchItems, launchContainer);
  renderTimelineItems(landingItems, landingContainer);
}

function renderTimelineItems(items, node) {
  items.slice(0, 8).forEach(element => {
    let { date_created, description, title, nasa_id } = element.data[0];
    const imgsrc = element.links[0].href;

    date_created = new Date(date_created);
    date_created =
      date_created.getFullYear() +
      '/' +
      date_created.getMonth() +
      '/' +
      date_created.getDate();

    const newEvent = document.createElement('div');
    newEvent.setAttribute('class', 'event');

    const newDate = document.createElement('div');
    newEvent.setAttribute('class', 'event-date');

    const newPoint = document.createElement('span');
    newPoint.setAttribute('class', 'timeline-point');

    const desktopDate = document.createElement('h3');
    desktopDate.setAttribute('class', 'timeline-date-desktop');
    desktopDate.innerText = date_created;

    const newContent = document.createElement('div');
    newContent.setAttribute('class', 'event_description');

    const newTitle = document.createElement('h2');
    newTitle.innerText = title;

    const mobileDate = document.createElement('h3');
    mobileDate.setAttribute('class', 'timeline-date-mobile');
    mobileDate.innerText = date_created;

    const newMedia = document.createElement('img');
    newMedia.setAttribute('src', `${imgsrc}`);
    newMedia.setAttribute('alt', `NASA image ${nasa_id}`);

    const newText = document.createElement('p');
    newText.setAttribute('class', 'event-content');
    newText.innerText = `${description}`;

    const newLink = document.createElement('a');
    newLink.setAttribute('href', `details.html?id=${nasa_id}`);
    newLink.innerHTML = 'View Details &#187;';

    node.appendChild(newEvent);
    node.appendChild(newContent);
    newEvent.appendChild(newDate);
    newDate.appendChild(newPoint);
    newDate.appendChild(desktopDate);
    newContent.appendChild(newTitle);
    newContent.appendChild(mobileDate);
    newContent.appendChild(newMedia);
    newContent.appendChild(newText);
    newContent.appendChild(newLink);
  });
}