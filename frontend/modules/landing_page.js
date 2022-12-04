import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if(cities){
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const response = fetch(config.backendEndpoint+"/cities");
    const data = await (await response).json();
    return data;
  }catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cityCard = document.createElement('div');
  cityCard.setAttribute('class', "city-card col-xs-12 col-sm-6 col-md-3 my-3 ");
  cityCard.setAttribute('id', `${id}`);
  const wrapper = document.createElement('div');
  wrapper.setAttribute('class','text-wrapper');
  const name = document.createElement('h4');
  name.setAttribute('class','heading');
  name.innerHTML = city;
  const desc = document.createElement('h6');
  name.setAttribute('class','description');
  desc.innerHTML = description;
  wrapper.appendChild(name);
  wrapper.appendChild(desc);
  const anchor1 = document.createElement('a');
  anchor1.setAttribute('href',`./pages/adventures/?city=${id}`);
  anchor1.setAttribute('class','anchor-div');
  const img1 = document.createElement('img');
  img1.setAttribute('class','card-image');
  img1.setAttribute('src',image);
  anchor1.appendChild(img1);
  anchor1.appendChild(wrapper);
  cityCard.appendChild(anchor1);
  const cardSection = document.getElementById('data');
  cardSection.appendChild(cityCard);
}

export { init, fetchCities, addCityToDOM };
