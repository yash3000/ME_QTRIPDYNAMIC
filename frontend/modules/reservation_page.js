import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const data= await fetch(config.backendEndpoint+"/reservations/");
   return await data.json();
   }
  catch{
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  let tbody = document.getElementById("reservation-table");
  reservations.forEach((reservation)=>{
    let trow = document.createElement('tr');
    let id = document.createElement('td');
    id.innerHTML = reservation["id"];
    trow.appendChild(id);

    let name = document.createElement('td');
    name.innerHTML = reservation["name"];
    trow.appendChild(name);

    let adventureName = document.createElement('td');
    adventureName.innerHTML = reservation["adventureName"];
    trow.appendChild(adventureName);

    let person = document.createElement('td');
    person.innerHTML = reservation["person"];
    trow.appendChild(person);
    
    let date = document.createElement('td');
    date.setAttribute('lang',"en-IN");
    let d = new Date(reservation["date"]);
    let dateStr = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()
    date.innerHTML = dateStr;
    trow.appendChild(date);

    let price = document.createElement('td');
    price.innerHTML = reservation["price"];
    trow.appendChild(price);

    let time = document.createElement('td');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let timeDate = new Date(reservation["time"]);
    let timeStr = timeDate.getDate()+ " " +months[timeDate.getMonth()]+" "+timeDate.getFullYear()+", ";
    let hour = (timeDate.getHours()>12 ? timeDate.getHours()-12 : (timeDate.getHours()===0)?12 : timeDate.getHours());
    timeStr += hour+":"+timeDate.getMinutes()+":"+timeDate.getSeconds()+(timeDate.getHours()>11?" pm":" am");
    time.innerHTML = timeStr;
    trow.appendChild(time);

    let adventure = document.createElement('td');

    let button = document.createElement('button');
    button.setAttribute("id",reservation.id);
    button.className = "reservation-visit-button";

    let anchor = document.createElement('a');
    anchor.setAttribute('href',`../detail/?adventure=${reservation["adventure"]}`);
    anchor.innerHTML = "Visit Adventure";
    button.appendChild(anchor);

    adventure.appendChild(button);
    trow.appendChild(adventure);

    tbody.appendChild(trow);
  });
  
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length > 0){
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none";

  }else{
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
