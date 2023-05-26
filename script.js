const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const page=document.getElementById('page');
const prevQuery="";
let currentPage = 1; // Current page number
const resultsPerPage = 10; // Number of results to display per page
const isDirty=false;
searchButton.addEventListener('click', () => {
  const query = searchInput.value;

  const apiKey = 'AIzaSyA_FzH9eQHCZf2dPXRf9E9NJcPmvAx4VK0'; 
  const cx = '005800d769c924875'; 

  // Calculate the start index based on the current page
  const startIndex = (currentPage - 1) * resultsPerPage + 1;

  // Clear previous search results
  searchResults.innerHTML = '';

  // Make a request to the Google PSE API with pagination parameters
  fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}&start=${startIndex}&num=${resultsPerPage}`)
    .then(response => response.json())
    .then(data => {
      page.innerHTML="Showing Result of Page : "+currentPage;
      const results = data.items;
      console.log(data);
      // Display search results
      results && results.forEach(result => {
        const vobj = result.pagemap.videoobject;
        if (vobj && vobj.length > 0) {
          const cnt = vobj[0].interactioncount;
          const date = vobj[0].uploaddate;
          const img = result.pagemap.imageobject[0].url;
          console.log(img);
          const title = result.title;
          const url = result.link;

          const resultItem = document.createElement('div');
          resultItem.classList.add('result-item');

          const imgItem = document.createElement('div');
          imgItem.classList.add('img-item');

          const textItem = document.createElement('div');
          textItem.classList.add('text-item');

          const imgElement = document.createElement('img');
          imgElement.src = img;
          imgElement.alt = 'image';
          imgElement.width = '100';
          imgElement.height = '100';

          const cntElement = document.createElement('p');
          cntElement.innerHTML = "▶️"+formatViewsCount(cnt) + '</br> 📅 ' + date;

          const titleElement = document.createElement('a');
          titleElement.textContent = title;
          titleElement.href = url;
          titleElement.target = '_blank';

          imgItem.appendChild(imgElement);
          textItem.appendChild(titleElement);
          textItem.appendChild(cntElement);
          resultItem.appendChild(imgItem);
          resultItem.appendChild(textItem);
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
prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    searchButton.click();
  }
  isDirty=true;
});

nextButton.addEventListener('click', () => {
  currentPage++;
  searchButton.click();
  isDirty=true;
});