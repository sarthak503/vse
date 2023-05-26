  //  const vobj=result.pagemap.videoobject;
  //       const cnt=vobj[0].interactioncount;
  //       if(vobj){}

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
        const vobj=result.pagemap.videoobject;
         if (vobj && vobj.length > 0) {
          const cnt=vobj[0].interactioncount;
          const date=vobj[0].uploaddate;
        const img=result.pagemap.imageobject[0].url;
        console.log(img)
        const title = result.title;
        const url = result.link;

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        const imgItem = document.createElement('div');
        imgItem.classList.add('img-item');

        const textItem = document.createElement('div');
        textItem.classList.add('text-item');


        const imgElement=document.createElement('img');
        imgElement.src=img;
        imgElement.alt='image';
        imgElement.width='100';
        imgElement.height='100';

        const cntElement=document.createElement('p');
        cntElement.innerHTML=formatViewsCount(cnt)+"</br>"+date;

        const titleElement = document.createElement('a');
        titleElement.textContent = title;
        titleElement.href = url;
        titleElement.target = '_blank';


        imgItem.appendChild(imgElement);

        textItem.appendChild(titleElement);

        textItem.appendChild(cntElement)

        resultItem.appendChild(imgItem)
        resultItem.appendChild(textItem)

        searchResults.appendChild(resultItem);
        }
      });
    })
    .catch(error => {
      console.log('Error fetching search results:', error);
    });
});

function formatViewsCount(count) {
  if (count >= 1e9) {
    return (count / 1e9).toFixed(1) + 'B';
  } else if (count >= 1e6) {
    return (count / 1e6).toFixed(1) + 'M';
  } else if (count >= 1e3) {
    return (count / 1e3).toFixed(1) + 'K';
  } else {
    return count.toString();
  }
}