import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let splitURL = search.slice(1,search.length).split("=");
  return(splitURL[1]);
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const data= await fetch(config.backendEndpoint+`/adventures/detail/?adventure=${adventureId}`);
   return await data.json();
   }
  catch{
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let heading = document.getElementById('adventure-name');
  heading.innerHTML = adventure.name;
  let subTitle = document.getElementById('adventure-subtitle');
  subTitle.innerHTML = adventure.subtitle;

  let row = document.getElementById('photo-gallery');
  adventure.images.forEach((image) => {
      let imgWrapper = document.createElement('div');
      imgWrapper.setAttribute('class',"adventure-image-wrapper")
      let img = document.createElement('img');
      img.setAttribute('src',image);
      img.setAttribute('class',"activity-card-image");
      imgWrapper.appendChild(img);
      row.appendChild(imgWrapper);
  });

  let content = document.getElementById('adventure-content');
  content.innerHTML = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let row = document.getElementById('photo-gallery');
  row.innerHTML="";
  row.className = "carousel slide mb-3";
  row.setAttribute("data-bs-ride","carousel");
  let carousel = document.createElement('div');
  carousel.className = "carousel-inner"
  images.forEach((image) => {
      let imgWrapper = document.createElement('div');
      imgWrapper.setAttribute('class',"carousel-item")
      let img = document.createElement('img');
      img.setAttribute('src',image);
      img.setAttribute('class',"d-block w-100");
      imgWrapper.appendChild(img);
      carousel.appendChild(imgWrapper);
  });
  carousel.firstChild.className += " active";
  row.appendChild(carousel);

  let prev = document.createElement('button');
  prev.className="carousel-control-prev";
  prev.setAttribute('type',"button");
  prev.setAttribute("data-bs-target","#carouselExampleControls");
  prev.setAttribute('data-bs-slide',"prev");

  let prevSpanIcon = document.createElement('span');
  prevSpanIcon.className="carousel-control-prev-icon";
  prevSpanIcon.setAttribute('aria-hidden',"true");
  prev.appendChild(prevSpanIcon);

  let prevSpan = document.createElement('span');
  prevSpan.className = "visually-hidden";
  prevSpan.innerHTML = "Previous";
  prev.appendChild(prevSpan);

  let next = document.createElement('button');
  next.className="carousel-control-next";
  next.setAttribute('type',"button");
  next.setAttribute("data-bs-target","#carouselExampleControls");
  next.setAttribute('data-bs-slide',"next");

  let nextSpanIcon = document.createElement('span');
  nextSpanIcon.className="carousel-control-next-icon";
  nextSpanIcon.setAttribute('aria-hidden',"true");
  next.appendChild(nextSpanIcon);

  let nextSpan = document.createElement('span');
  nextSpan.className = "visually-hidden";
  nextSpan.innerHTML = "Next";
  next.appendChild(nextSpan);

  row.appendChild(prev);
  row.appendChild(next);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display= "block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;

  }else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display= "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  try{
    if(parseInt(persons) > 0){
      let totalcost =  parseInt(persons) * parseInt(adventure.costPerHead);
      document.getElementById("reservation-cost").innerHTML = totalcost;
    }else{
      document.getElementById("reservation-cost").innerHTML = "0";
    }
  }
  catch(err){
    return null
  }

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let formDetails = {
      name : form.elements.name.value,
      date : form.elements.date.value,
      person : form.elements.person.value,
      adventure : adventure.id
    }
    console.log(formDetails);
    fetch(config.backendEndpoint+'/reservations/new', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formDetails)
  })
  .then(response => response.json())
  .then(res => {
    if(res["success"]){
      alert("Success!");
    }else{
      alert("Failed!");
    }
  })
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
