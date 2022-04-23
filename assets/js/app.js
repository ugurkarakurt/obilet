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

        //Locations
        let allLocations;

        // Origin
        const origin = document.querySelector(".js-origin");
        const originInput = document.querySelector(".js-origin-input");
        const originLocations = document.querySelector(".js-origin-locations");

        // Destination
        const destination = document.querySelector(".js-destination");
        const destinationInput = document.querySelector(".js-destination-input");
        const destinationLocations = document.querySelector(".js-destination-locations");

        // Date
        const dateInput = document.querySelector(".js-date-input");
        const dateTodayInput = document.querySelector('.js-date-today')
        const dateTomorrowInput = document.querySelector('.js-date-tomorrow')

        const swapLocationIcon = document.querySelector(".double-arrows");

        const findTicket = document.querySelector('.js-find-ticket');

        // Event Listeners
        const eventListeners = function () {
                document.addEventListener("click", documentEvents)
                originInput.addEventListener("click", openOriginDropdown);
                originInput.addEventListener("input", searchOriginLocation);
                destinationInput.addEventListener("click", openDestinationsDropdown);
                destinationInput.addEventListener("input", searchDestination);
                dateTodayInput.addEventListener("click", setDateToday);
                dateTomorrowInput.addEventListener("click", setDateTomorrow);
                findTicket.addEventListener("click", searchTicket);

        };

        const searchTicket = function (e) {
                e.preventDefault();
                const date = new Date(dateInput.value);

                const month = date.getUTCMonth() + 1;
                const day = date.getUTCDate();
                const year = date.getUTCFullYear();
                const editedDate = year + "-" + month + "-" + day
                console.log(editedDate);
                request.post(url + "/journey/getbusjourneys", {
                        "device-session": {
                                "session-id": sessionID,
                                "device-id": deviceID
                        },
                        "date": editedDate,
                        "language": "tr-TR",
                        "data": {
                                "origin-id": 349,
                                "destination-id": 356,
                                "departure-date": editedDate
                        }
                }).then((data) => {
                        console.log(data);
                })
        }

        const setDateToday = function (e) {
                e.preventDefault();
                dateInput.valueAsDate = date
        }

        const setDateTomorrow = function (e) {
                e.preventDefault();
                let tomorrow = new Date()
                tomorrow.setDate(date.getDate() + 1)
                dateInput.valueAsDate = tomorrow
        }

        const setDateNow = function () {
                dateInput.valueAsDate = date
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
        }

        const selectOrigin = function (element) {
                const option = element;
                originInput.value = option.innerHTML;
                origin.dataset.id = option.dataset.id;
                origin.dataset.parentid = option.dataset.parentid;
                origin.dataset.type = option.dataset.type;
                originLocations.classList.remove("opened");
                swapLocationIcon.style.display = "flex";
        }

        const selectDestination = function (element) {
                const option = element;
                destinationInput.value = option.innerHTML;
                destination.dataset.id = option.dataset.id;
                destination.dataset.parentid = option.dataset.parentid;
                destination.dataset.type = option.dataset.type;
                destinationLocations.classList.remove("opened");
                swapLocationIcon.style.display = "flex";
        }

        const openDestinationsDropdown = function () {
                swapLocationIcon.style.display = "none"
                this.value = ""
                destinationLocations.classList.add("opened");
                originLocations.classList.remove("opened");

        }

        const openOriginDropdown = function () {
                swapLocationIcon.style.display = "none"
                this.value = "";
                originLocations.classList.add("opened");
                destinationLocations.classList.remove("opened");

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
                }).catch((err) => console.log(err))
        }

        //
        // Return objects
        //

        return {
                init: function () {
                        eventListeners();
                        getSession();
                        setDateNow();
                },
        };
})();

// Initialize module
// ------------------------------

document.addEventListener("DOMContentLoaded", function () {
        FormValidation.init();
});