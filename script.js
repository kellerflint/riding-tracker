let data = [];

let loaded = false;

const API_KEY = "dacd9a6a6fbc0931684dd14c55bc5163";
const API_URL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=";

let calendarDate = new Date(Date.now());

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

// My terrible fix for AJAX asynchronous nonsense
let loadInterval = setInterval(function () {
    if (loaded) {
        buildDayElements();
        clearInterval(loadInterval);
    }
}, 200);

window.onload = run;

// On window load creates event listeners and runs setup functions
function run() {

    importData();

    // Add event listeners
    $("#lastMonth").on("click", lastMonth);
    $("#nextMonth").on("click", nextMonth);
    $("#calendarDate").on("change", newDate);
    $('#rideForm').submit(function () {
        addEvent();
        return false;
    });

    setJQueryElements();

    getWeather();

    displayDate();

}

// Sets up JQuery UI elements
function setJQueryElements() {
    $(function () {
        $("#dayRide").datepicker();
        $("#dayPurchase").datepicker();
        $("#dayEvent").datepicker();
    });

    $(function () {
        var availableTags = [
            "Western",
            "Dressage",
            "English",
            "Jumping",
            "Bareback",
            "Western Equitation",
            "Western Pleasure",
            "Hunter Hack",
            "Hack",
            "Dressage Hack",
            "Western Hack",
        ];
        $("#discipline").autocomplete({
            source: availableTags
        });
    });
    $(function () {
        $("#form").tabs();
    });

    $(function () {
        $("#calendarDate").datepicker();
    });

    //open and close forms
    $("#getForms").on("click", function () {
        $("#form").toggle();
    });
}


// Builds day DOM elements and adds them to the calendar div
function buildDayElements() {
    $("#calendar").html("");
    let days = getMonthDays(calendarDate);
    for (let i = 1; i <= days; i++) {
        let div = $("<div><div>").addClass("day-div");
        let label = $("<h4></h4>").addClass("day-label");
        let innerDiv = $("<div></div>").addClass("day-inner-div");

        label.text(i);

        // TODO: Check for events and add their content here
        // Append whatever is generated to the innerDiv (pass and return the DOM node?)
        let eventId = getEvent(i);
        if (typeof eventId != "undefined") {
            innerDiv.text(data[eventId].discipline);
        } else {
            innerDiv.text("N/A");
        }

        div.append(label);
        div.append(innerDiv);
        $("#calendar").append(div);
    }

}

// Return the data index for an event that happened on the given day
function getEvent(day) {
    for (let i = 0; i < data.length; i++) {
        if (calendarDate.getMonth() == data[i].date.getMonth() &&
            data[i].date.getDate() == day) {
            return i;
        }
    }
}


// Given current date, returns number of days in the month
function getMonthDays(date) {
    let currentMonth = date.getMonth();
    let monthDate = new Date(date);

    // Sets date to first date of the month
    monthDate.setDate(monthDate.getDate() - monthDate.getDate() + 1);
    let days = 0;

    // Increments days until the month changes
    while (currentMonth == monthDate.getMonth()) {
        monthDate.setDate(monthDate.getDate() + 1);
        days++;
    }
    return days;
}

// Moves the calendar date back one month
function lastMonth() {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    $("#calendarDate").val("");
    displayDate();
    buildDayElements();
}

// Changes the calendar date forward one month
function nextMonth() {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    $("#calendarDate").val("");
    displayDate();
    buildDayElements();
}

// Displays the month and year that the calendar is displaying
function displayDate() {
    let month = monthNames[calendarDate.getMonth()];
    let text = ", ";
    let year = calendarDate.getFullYear();
    $("#date").text(month + text + year);
}

// Changes the calendar date to the selected date
function newDate() {
    calendarDate = new Date($("#calendarDate").val());
    displayDate();
    buildDayElements();
}

// Imports events into data array from JSON file
// In an ideal world we'd get this from a real database for this
function importData() {
    $.getJSON("example-data.json", function (result) {
        $.each(result, function (index, item) {
            let event = {
                date: new Date(item.Date),
                hours: item.Hours,
                discipline: item.Discipline,
                notes: item.Notes
            };
            console.log(event);
            console.log(data);
            data.push(event);
        });
        loaded = true;
    });
}

function addEvent() {
    console.log("ran");
    let event = {
        date: new Date($("#dayRide").val()),
        hours: $("#hours").val(),
        discipline: $("#discipline").val(),
        notes: $("#notes").val()
    };
    data.push(event);

    buildDayElements();
}

function getWeather() {
    $.simpleWeather({
        location: "Auburn, WA",
        unit: "f",
        success: function (weather) {
            $("#forcast").attr("src", weather.image);
        },
        error: function (error) {
            console.log(error);
        }
    });


}