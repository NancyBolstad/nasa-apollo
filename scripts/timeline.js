(async () => {
  try {
    const url = `https://images-api.nasa.gov/search?media_type=image&keywords=apollo&year_start=1969&year_end=1969`;

    const data = await (await fetch(url)).json();

    let { items } = data.collection;

    //Sort by date
    items.sort((itemA, itemB) => {
      return itemA.data[0].date_created > itemB.data[0].date_created ? 1 : -1;
    });

    populateTimeline(items);
  } catch (error) {
    alert(error);
  }
})();

function populateTimeline(items) {
  //An arbitrary selection from around April to October 1969, of five items for each part of the timeline
  const preLaunchItems = items.slice(40, 45);
  const launchItems = items.slice(55, 60);
  const landingItems = items.slice(65, 70);

  const prelaunchContainer = document.getElementById('js-prelaunch-container');
  const launchContainer = document.getElementById('js-launch-container');
  const landingContainer = document.getElementById('js-landing-container');

  renderTimelineItems(preLaunchItems, prelaunchContainer);
  renderTimelineItems(launchItems, launchContainer);
  renderTimelineItems(landingItems, landingContainer);
}

function renderTimelineItems(items, node) {
  items.slice(0, 8).forEach(element => {
    let { date_created, description, title, nasa_id } = element.data[0];
    const imgsrc = element.links[0].href;

    //Format date, for instance, from 1974-09-01T00:00:00Z to 1974/09/01
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

    const link = document.createElement('a');
    link.setAttribute('class', 'details-link');
    link.setAttribute('title', `Got to ${title}`);
    link.setAttribute('aria-label', `Got to ${title}`);
    link.setAttribute('href', `./details.html?id=${nasa_id}`);
    link.innerHTML = 'View details &#187;';

    node.appendChild(newEvent);
    node.appendChild(newContent);
    newEvent.appendChild(newDate);
    newDate.appendChild(newPoint);
    newDate.appendChild(desktopDate);
    newContent.appendChild(newTitle);
    newContent.appendChild(mobileDate);
    newContent.appendChild(newMedia);
    newContent.appendChild(newText);
    newContent.appendChild(link);
  });
}
