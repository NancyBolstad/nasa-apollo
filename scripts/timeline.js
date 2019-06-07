const endpoint='https://images-api.nasa.gov/search?media_type=image&';
const prelaunchQuery=`q=${encodeURIComponent('moon landing')}&year_start=1958&year_end=1968`;
const launchQuery=`q=${encodeURIComponent('apollo 11 launch')}&year_start=1968&year_end=1969`;
const landingQuery=`q=${encodeURIComponent('apollo 11 landing')}&year_start=1968&year_end=1969`;
const prelaunchContainer = document.getElementById('js-prelaunch-container');
const aunchContainer = document.getElementById('js-launch-container');
const landingContainer = document.getElementById('js-landing-container');

(async () => {
  try {
    const prelaunchData = await (await fetch(endpoint+prelaunchQuery)).json();
    const launchData = await (await fetch(endpoint+launchQuery)).json();
    const landingData = await (await fetch(endpoint+landingQuery)).json();
    formateData(prelaunchData.collection);
    formateData(launchData.collection);
    formateData(landingData.collection);
  } catch (error) {
    alert(error);
  }
})();

function formateData(data) {
  let { items } = data;

  items.sort((a, b) => {
    console.log(a.data[0].date_created);
    return a.data[0].date_created > b.data[0].date_created ? 1 : -1;
  });

  populateTimeline(items);
}

function populateTimeline(items) {
  let max = 5;
  const itemsToShow = items.slice(0, max);
    renderTimelineItems(itemsToShow);

}

function renderTimelineItems(items, node) {
  const container = document.getElementById('js-prelaunch-container');
  removeChildren(prelaunchContainer);
  items.forEach(element => {
    let { date_created, description, title, nasa_id } = element.data[0];
    var imgsrc = element.links[0].href;
    console.log(imgsrc);

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
      ${description}
    </p>
    <a href="#" >View Details &#187;</a>`;

    container.appendChild(newEvent);
    container.appendChild(newContent);
    newEvent.appendChild(newDate);
  });
}

function removeChildren(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}
