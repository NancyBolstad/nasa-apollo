(async () => {
  try {
    const endpoint = 'https://images-api.nasa.gov/search?media_type=image&';
    const query = `q=${encodeURIComponent(
      'apollo 11'
    )}&year_start=1969&year_end=1969`;
    const data = await (await fetch(endpoint + query)).json();
    render(data.collection.items);
  } catch (error) {
    alert(error);
  }
})();

function render(items) {
  const container = document.getElementById('js-articles-container');
  items.slice(9, 15).forEach(element => {
    let { title, nasa_id } = element.data[0];
    var imgsrc = element.links[0].href;

    const newItem = document.createElement('div');
    newItem.setAttribute('class', 'article-item');

    const link = document.createElement('a');
    link.setAttribute('class', 'article-link');
    link.setAttribute('title', `Got to ${title}`);
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
    readMore.setAttribute('title', `Got to ${title}`);
    readMore.setAttribute('href', `./details.html?id=${nasa_id}`);
    readMore.innerHTML = 'View details &#187;';
    

    container.appendChild(newItem);
    newItem.appendChild(link);
    newItem.appendChild(image);
    newItem.appendChild(content);
    content.appendChild(articleTitle);
    content.appendChild(text);
    text.appendChild(readMore);
  });
}
