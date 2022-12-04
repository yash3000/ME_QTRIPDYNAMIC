
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let splitURL = search.slice(1,search.length).split("=");
  return(splitURL[1])

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const data= await fetch(config.backendEndpoint+`/adventures/?city=${city}`);
   return await data.json();
   }
  catch{
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for(let adventure in adventures){
    let row = document.getElementById('data');
    let element = document.createElement('div');
    element.setAttribute('class','col-6 col-sm-6 col-md-3 my-2');
    let innerElement = document.createElement('div');
    innerElement.setAttribute('class','card adventure-card');
    let anchor = document.createElement('a');
    anchor.setAttribute('id',adventures[adventure].id);
    anchor.setAttribute('href',`./detail/?adventure=${adventures[adventure].id}`);
    anchor.setAttribute('class','card-anchor');
    let overlayElement = document.createElement('div');
    overlayElement.setAttribute('class','overlay-category')
    overlayElement.innerHTML = adventures[adventure].category;
    anchor.appendChild(overlayElement)
    let cardImage = document.createElement('img');
    cardImage.setAttribute('src',adventures[adventure].image);
    anchor.appendChild(cardImage);
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class','card-body');
    let adventureUpper = document.createElement('div');
    adventureUpper.setAttribute('class','adventure-upper');
    let adventureName = document.createElement('span');
    adventureName.setAttribute('class','adventure-name');
    adventureName.innerHTML = adventures[adventure].name;
    adventureUpper.appendChild(adventureName);
    let adventurePrice = document.createElement('span');
    adventurePrice.setAttribute('class','adventure-price');
    adventurePrice.innerHTML = '₹'+adventures[adventure].costPerHead;
    adventureUpper.appendChild(adventurePrice);
    cardBody.appendChild(adventureUpper);

    let adventureLower = document.createElement('div');
    adventureLower.setAttribute('class','adventure-lower');
    let adventureDur = document.createElement('span');
    adventureDur.setAttribute('class','adventure-dur');
    adventureDur.innerHTML = 'Duration';
    adventureLower.appendChild(adventureDur);
    let adventureDuration = document.createElement('span');
    adventureDuration.setAttribute('class','adventure-duration');
    adventureDuration.innerHTML = adventures[adventure].duration + " Hours";
    adventureLower.appendChild(adventureDuration);
    cardBody.appendChild(adventureLower);

    anchor.appendChild(cardBody);
    innerElement.appendChild(anchor);
    element.appendChild(innerElement);
    row.appendChild(element);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let result = [];
  list.forEach((adventure)=>{
    if(adventure.duration> low && adventure.duration<= high){
      result.push(adventure); 
    }
  });
  return(result);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let result = [];
  list.forEach((adventure)=>{
    if(categoryList.indexOf(adventure.category)>-1){
      result.push(adventure); 
    }
  });
  return(result);
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.category.length){
    list = filterByCategory(list, filters.category);
  }
  if(filters.duration){
    let endPoints = filters.duration.split('-') 
    let low = parseInt(endPoints[0]);
    let high = parseInt(endPoints[1]);
    list = filterByDuration(list, low, high);
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = JSON.parse(localStorage.getItem('filters'));
  let ele = document.getElementById('duration-select');
  if(filters && filters.duration){
    ele.value = filters.duration;
  }
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let filterWrapper = document.getElementById('category-list');
  filters.category.forEach((category)=>{
    let filterPill = document.createElement('span');
    filterPill.setAttribute('class','category-filter');
    filterPill.innerText = category
    filterWrapper.appendChild(filterPill);
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
