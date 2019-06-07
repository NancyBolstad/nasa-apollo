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
    var imgsrc = element.links[0].href;

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

    newDate.innerHTML = `<span class="timeline-point"></span> <h3 class="timeline-date-desktop">${date_created}</h3>`;

    const newContent = document.createElement('div');
    newContent.setAttribute('class', 'event_description');

    newContent.innerHTML = `
    <h2>${title}</h2>
    <h3 class="timeline-date-mobile">${date_created}</h3>
    <img src="${imgsrc}" alt="NASA image ${nasa_id}">
    <p class="event-content">
      ${description.substring(0,100)} &hellip;
    </p><a href="#" >View Details &#187;</a>`;

    node.appendChild(newEvent);
    node.appendChild(newContent);
    newEvent.appendChild(newDate);
  });
}
