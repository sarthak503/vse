// script.js
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  const apiKey = 'AIzaSyA_FzH9eQHCZf2dPXRf9E9NJcPmvAx4VK0'; // Replace with your Google PSE API key
  const cx = '005800d769c924875'; // Replace with your Google PSE search engine ID

  // Clear previous search results
  searchResults.innerHTML = '';

  // Make a request to the Google PSE API
  fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`)
    .then(response => response.json())
    .then(data => {
      const results = data.items;
        console.log(data);
      // Display search results
      results && results.forEach(result => {
        const img=result.pagemap.imageobject[0].url;
        console.log(img)
        const title = result.title;
        const url = result.link;

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        const imgElement=document.createElement('img');
        imgElement.src=img;
        imgElement.alt='image';
        imgElement.width='50';
        imgElement.height='50';

        const titleElement = document.createElement('a');
        titleElement.classList.add('result-title');
        titleElement.textContent = title;
        titleElement.href = url;
        titleElement.target = '_blank';


        resultItem.appendChild(imgElement);
        resultItem.appendChild(titleElement);
        searchResults.appendChild(resultItem);
      });
    })
    .catch(error => {
      console.log('Error fetching search results:', error);
    });
});
