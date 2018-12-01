let calendarDate = new Date(Date.now());

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

window.onload = run;

// On window load creates event listeners and runs setup functions
function run() {

    displayDate();
    // Add event listeners
    $("#lastMonth").on("click", lastMonth);
    $("#nextMonth").on("click", nextMonth);
    $("#calendarDate").on("change", newDate);

    setJQueryElements();

    generateCalendar();
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

}

function generateCalendar() {
    buildDayElements();
    //buildMonth
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
        innerDiv.text("PLACEHOLDER TEXT");

        div.append(label);
        div.append(innerDiv);
        $("#calendar").append(div);
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

//open and close forms
$("#getForms").on("click", function () {
    $("#form").toggle();
});
