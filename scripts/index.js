const endpoint = 'https://images-api.nasa.gov/search?media_type=image&';
const query = `q=${encodeURIComponent(
  'apollo 11'
)}&year_start=1969&year_end=1969`;

(async () => {
  try {
    console.log(000000);
    const data = await (await fetch(endpoint + query)).json();
    render(data.collection.items);
  } catch (error) {
    alert(error);
  }
})();

function render(items, node) {
  const container = document.getElementById('js-articles-container');
  items.slice(0, 6).forEach(element => {
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

    container.appendChild(newItem);
    newItem.appendChild(link);
    newItem.appendChild(image);
  });
}
