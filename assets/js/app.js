import {
 Request
} from "./request.js";


const FormValidation = (function () {
 //Variables

 // New Classes
 const request = new Request();

 //Urls
 const url = "https://v2-api.obilet.com/api"

 //Unique ID
 let deviceID;
 let sessionID;

 // Date Now
 const date = new Date();
 const monthNow = date.getUTCMonth() + 1;
 const dayNow = date.getUTCDate();
 const yearNow = date.getUTCFullYear();
 const secondsNow = date.getSeconds();
 const minutesNow = date.getMinutes();
 const hourNow = date.getHours();

 const dateNow = yearNow + "-" + monthNow + "-" + dayNow + "T" + hourNow + ":" + minutesNow + ":" + secondsNow;

 let tomorrow = new Date()
 tomorrow.setDate(date.getDate() + 1)

 //Locations
 let allLocations;

 // Origin
 const origin = document.querySelector(".js-origin");
 const originInput = document.querySelector(".js-origin-input");
 const originLocations = document.querySelector(".js-origin-locations");
 const originWrapper = document.querySelector(".js-origin-input-group")

 // Destination
 const destination = document.querySelector(".js-destination");
 const destinationInput = document.querySelector(".js-destination-input");
 const destinationLocations = document.querySelector(".js-destination-locations");
 const destinationWrapper = document.querySelector(".js-destination-input-group")

 // Date
 const dateInput = document.querySelector(".js-date-input");
 const dateTodayInput = document.querySelector(".js-date-today")
 const dateTomorrowInput = document.querySelector(".js-date-tomorrow")

 const swapLocationIcon = document.querySelector(".double-arrows");
 const findTicket = document.querySelector(".js-find-ticket");
 const alert = document.querySelector(".js-alert")

 // Jouney
 const journeies = document.querySelector(".js-journeies");
 const journeyModal = document.querySelector(".js-journey-modal");
 const backButton = document.querySelector(".js-modal-back-button");
 const modalOrigin = document.querySelector(".js-modal-origin");
 const modalDestination = document.querySelector(".js-modal-destination");
 const modalDate = document.querySelector(".js-modal-date");


 // Event Listeners
 const eventListeners = function () {
  document.addEventListener("click", documentEvents);
  document.addEventListener("keypress", stopEnterButton)
  originInput.addEventListener("click", openOriginDropdown);
  originInput.addEventListener("input", searchOriginLocation);
  destinationInput.addEventListener("click", openDestinationsDropdown);
  destinationInput.addEventListener("input", searchDestination);
  dateTodayInput.addEventListener("click", setDateToday);
  dateTomorrowInput.addEventListener("click", setDateTomorrow);
  findTicket.addEventListener("click", searchTicket);
  swapLocationIcon.addEventListener("click", swapLocation);
  backButton.addEventListener("click", backToSearch);
 };

 const backToSearch = function () {
  journeyModal.style.display = "none";
 }

 const stopEnterButton = function (e) {
  if (e.which == "13") {
   e.preventDefault();
  }
 }

 const swapLocation = function () {
  const originInfo = {
   id: origin.dataset.id,
   parentid: origin.dataset.parentid,
   type: origin.dataset.type,
   name: originInput.value
  }
  const destinationInfo = {
   id: destination.dataset.id,
   parentid: destination.dataset.parentid,
   type: destination.dataset.type,
   name: destinationInput.value
  }

  originInput.value = destinationInfo.name;
  origin.dataset.id = destinationInfo.id;
  origin.dataset.parentid = destinationInfo.parentid;
  origin.dataset.type = destinationInfo.type;

  destinationInput.value = originInfo.name;
  destination.dataset.id = originInfo.id;
  destination.dataset.parentid = originInfo.parentid;
  destination.dataset.type = originInfo.type;

 }

 const searchTicket = function (e) {
  e.preventDefault();

  if (origin.dataset.id === destination.dataset.id && origin.dataset.id !== "" && destination.dataset.id !== "") {
   alert.innerHTML = "Kalkış ve varış noktaları aynı olamaz."
   alert.style.display = "block";
  } else if (originInput.value === "" || destinationInput.value === "") {
   if (originInput.value === "" && destinationInput.value === "") {
    alert.innerHTML = "Lütfen varış ve kalkış noktası seçiniz."
    alert.style.display = "block";
    originWrapper.classList.add("error");
    destinationWrapper.classList.add("error");
   } else if (originInput.value === "") {
    alert.innerHTML = "Lütfen kalkış noktası seçiniz."
    alert.style.display = "block";
    originWrapper.classList.add("error")
   } else if (destinationInput.value === "") {
    alert.innerHTML = "Lütfen varış noktası seçiniz."
    alert.style.display = "block";
    destinationWrapper.classList.add("error")
   }
  } else {
   originInput.disabled = true;
   destinationInput.disabled = true;
   findTicket.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>`
   const date = new Date(dateInput.value);
   const month = date.getUTCMonth() + 1;
   const day = date.getUTCDate();
   const year = date.getUTCFullYear();
   const editedDate = year + "-" + month + "-" + day
   request.post(url + "/journey/getbusjourneys", {
    "device-session": {
     "session-id": sessionID,
     "device-id": deviceID
    },
    "date": editedDate,
    "language": "tr-TR",
    "data": {
     "origin-id": origin.dataset.id,
     "destination-id": destination.dataset.id,
     "departure-date": editedDate
    }
   }).then((data) => {
    if (data.data === null) {
     alert.innerHTML = "Lütfen geçerli bir lokasyon giriniz.";
     alert.style.display = "block";
    } else if (data.data.length < 1) {
     alert.innerHTML = "Aradığınız lokasyonlar arası bir sefer bulunamadı.";
     alert.style.display = "block";
    }
    if (data.data !== null && data.data.length > 0) {

     const currentDate = new Date(dateInput.value);
     const month = currentDate.getUTCMonth() + 1;
     const day = currentDate.getUTCDate();
     const year = currentDate.getUTCFullYear();
     const currentDateEdited = year + "/" + month + "/" + day

     modalDate.innerHTML = currentDateEdited;
     modalOrigin.innerHTML = originInput.value;
     modalDestination.innerHTML = destinationInput.value;
     journeyModal.style.display = "block";
     journeies.innerHTML = ""
     data.data.forEach(journey => {
      const departure = journey.journey.departure.split("T")[1].slice(0, -3);
      const arrival = journey.journey.arrival.split("T")[1].slice(0, -3);

      journeies.innerHTML += `<li>
                               <div class="journey">
                                <div class="journey-dates">
                                 <div class="modal-date">
                                  <span>Kalkış</span>
                                  <div class="time">${departure}</div>
                                 </div>
                                 <span class="icon">
                                  <img src="./assets/img/arrow.svg" alt="">
                                 </span>
                                 <div class="modal-date">
                                  <span>Varış</span>
                                  <div class="time">${arrival}</div>
                                 </div>
                                </div>
                                <div class="journey-information">
                                 <span>${journey.journey.origin}</span>
                                 &nbsp;-&nbsp;
                                 <span>${journey.journey.destination}</span>
                                </div>
                                <div class="price">
                                 ${renderPrice(journey.journey["internet-price"], journey.journey.currency)}
                                </div>
                               </div>
                              </li>`
     });
    }
    findTicket.innerHTML = "Bileti Bul";
    originInput.disabled = false;
    destinationInput.disabled = false;
   }).catch((err) => console.log(err))
  };

  localStorage.setItem("origin", JSON.stringify({
   id: origin.dataset.id,
   parentid: origin.dataset.parentid,
   type: origin.dataset.type,
   name: originInput.value
  }));
  localStorage.setItem("destination", JSON.stringify({
   "id": destination.dataset.id,
   "parentid": destination.dataset.parentid,
   "type": destination.dataset.type,
   "name": destinationInput.value
  }));
 }

 function renderPrice(price, currency) {
  const formatConfig = {
   minimumFractionDigits: 0,
   style: "currency",
   currency: currency,
  };
  const turkishNumberFormatter = new Intl.NumberFormat("tr-TR", formatConfig);
  return turkishNumberFormatter.format(price)
 }


 const setDateToday = function (e) {
  e.preventDefault();
  dateInput.valueAsDate = date
 }

 const setDateTomorrow = function (e) {
  e.preventDefault();
  dateInput.valueAsDate = tomorrow
 }

 const setDateNow = function () {
  dateInput.valueAsDate = tomorrow
  let today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
 }


 const searchOriginLocation = function () {
  const filteredOriginLocations = allLocations.filter((location) =>
   location.name
   .toLocaleLowerCase()
   .trim()
   .includes(this.value.toLocaleLowerCase().trim())
  );
  originLocations.innerHTML = ""
  if (filteredOriginLocations.length > 0) {
   if (filteredOriginLocations.length >= 7) {
    for (let i = 0; i < 7; i++) {
     originLocations.innerHTML += `<div class="location js-origin-location-option"
             data-id="${filteredOriginLocations[i].id}" data-parentid="${filteredOriginLocations[i]["parent-id"]}" data-type="${filteredOriginLocations[i].type}">${filteredOriginLocations[i].name}</div>`;
    }
   } else {
    for (let i = 0; i < filteredOriginLocations.length; i++) {
     originLocations.innerHTML += `<div class="location js-origin-location-option"
             data-id="${filteredOriginLocations[i].id}" data-parentid="${filteredOriginLocations[i]["parent-id"]}" data-type="${filteredOriginLocations[i].type}">${filteredOriginLocations[i].name}</div>`;
    }
   }
  }
 }

 const searchDestination = function () {
  const filteredDestinationLocations = allLocations.filter((location) =>
   location.name
   .toLocaleLowerCase()
   .trim()
   .includes(this.value.toLocaleLowerCase().trim())
  );
  destinationLocations.innerHTML = ""
  if (filteredDestinationLocations.length > 0) {
   if (filteredDestinationLocations.length >= 7) {
    for (let i = 0; i < 7; i++) {
     destinationLocations.innerHTML += `<div class="location js-destination-location-option"
                 data-id="${filteredDestinationLocations[i].id}" data-parentid="${filteredDestinationLocations[i]["parent-id"]}" data-type="${filteredDestinationLocations[i].type}">${filteredDestinationLocations[i].name}</div>`;
    }
   } else {
    for (let i = 0; i < filteredDestinationLocations.length; i++) {
     destinationLocations.innerHTML += `<div class="location js-destination-location-option"
                 data-id="${filteredDestinationLocations[i].id}" data-parentid="${filteredDestinationLocations[i]["parent-id"]}" data-type="${filteredDestinationLocations[i].type}">${filteredDestinationLocations[i].name}</div>`;
    }
   }
  }
 }

 const documentEvents = function (e) {
  if (!e.target.closest(".js-origin") && !e.target.closest(".js-destination")) {
   closeDropdownsOnBodyClick();
  }

  if (e.target.classList.contains("js-origin-location-option")) {
   selectOrigin(e.target);
  }
  if (e.target.classList.contains("js-destination-location-option")) {
   selectDestination(e.target);
  }

 }

 const closeDropdownsOnBodyClick = function () {
  originLocations.classList.remove("opened");
  destinationLocations.classList.remove("opened");
  swapLocationIcon.style.display = "flex";
 }

 const selectOrigin = function (element) {
  const option = element;
  originInput.value = option.innerHTML;
  origin.dataset.id = option.dataset.id;
  origin.dataset.parentid = option.dataset.parentid;
  origin.dataset.type = option.dataset.type;
  originLocations.classList.remove("opened");
  swapLocationIcon.style.display = "flex";
  alert.style.display = "none";
 }

 const selectDestination = function (element) {
  const option = element;
  destinationInput.value = option.innerHTML;
  destination.dataset.id = option.dataset.id;
  destination.dataset.parentid = option.dataset.parentid;
  destination.dataset.type = option.dataset.type;
  destinationLocations.classList.remove("opened");
  swapLocationIcon.style.display = "flex";
  alert.style.display = "none";
 }

 const openDestinationsDropdown = function () {
  destination.dataset.id = "";
  destination.dataset.parentid = "";
  destination.dataset.type = "";
  swapLocationIcon.style.display = "none"
  this.value = ""
  destinationLocations.classList.add("opened");
  originLocations.classList.remove("opened");
  destinationWrapper.classList.remove("error")

 }

 const openOriginDropdown = function () {
  origin.dataset.id = ""
  origin.dataset.parentid = ""
  origin.dataset.type = ""
  swapLocationIcon.style.display = "none"
  this.value = "";
  originLocations.classList.add("opened");
  destinationLocations.classList.remove("opened");
  originWrapper.classList.remove("error")
 }

 //Functions
 const getSession = function () {
  request.post(url + "/client/getsession", {
   "type": 1,
   "connection": {
    "ip-address": "165.114.41.21",
    "port": "5117"
   },
   "browser": {
    "name": "Chrome",
    "version": "47.0.0.12"
   }
  }).then((response) => {
   deviceID = response.data["device-id"];
   sessionID = response.data["session-id"]
  }).then(() => {
   getLocations();
  }).catch((err) => console.log(err))
 }

 const getLocations = function () {
  findTicket.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>`

  request.post(url + "/location/getbuslocations", {
   "data": null,
   "device-session": {
    "session-id": sessionID,
    "device-id": deviceID
   },
   "date": dateNow,
   "language": "en-EN"
  }).then((response) => {
   allLocations = response.data;
   const data = response.data
   for (let i = 0; i < 7; i++) {
    originLocations.innerHTML += `<div class="location js-origin-location-option" data-id="${data[i].id}" data-parentid="${data[i]["parent-id"]}" data-type="${data[i].type}">${data[i].name}</div>`;
    destinationLocations.innerHTML += `<div class="location js-destination-location-option" data-id="${data[i].id}" data-parentid="${data[i]["parent-id"]}" data-type="${data[i].type}">${data[i].name}</div>`
   }
   originInput.disabled = false;
   destinationInput.disabled = false;
   findTicket.innerHTML = "Bileti Bul"
  }).catch((err) => console.log(err))
 }

 const setLocations = function () {
  const storageOrigin = localStorage.getItem("origin");
  const storageDestination = localStorage.getItem("destination");
  if (destination !== null) {
   originInput.value = JSON.parse(storageOrigin).name;
   origin.dataset.id = JSON.parse(storageOrigin).id;
   origin.dataset.parentid = JSON.parse(storageOrigin).parentid;
   origin.dataset.type = JSON.parse(storageOrigin).type;
  }
  if (origin !== null) {
   destinationInput.value = JSON.parse(storageDestination).name;
   destination.dataset.id = JSON.parse(storageDestination).id;
   destination.dataset.parentid = JSON.parse(storageDestination).parentid;
   destination.dataset.type = JSON.parse(storageDestination).type;
  }
 }

 //
 // Return objects
 //

 return {
  init: function () {
   eventListeners();
   getSession();
   setDateNow();
   setLocations();
  },
 };
})();

// Initialize module
// ------------------------------

document.addEventListener("DOMContentLoaded", function () {
 FormValidation.init();
});