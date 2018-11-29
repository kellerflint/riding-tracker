let calendarDate = new Date('November 29, 2018 03:24:00');

window.onload = run;

function run() {
    $("#lastMonth").on("click", lastMonth)
    $("#nextMonth").on("click", nextMonth)
    generateCalendar();
}

function generateCalendar() {
    buildDayElements(calendarDate);
    //buildMonth
}

// Builds day DOM elements and adds them to the calendar div
function buildDayElements(date) {
    let days = getMonthDays(date)
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

    // Sets date to first date of the month
    date.setDate(date.getDate() - date.getDate() + 1);
    let days = 0;

    // Increments days until the month changes
    while (currentMonth == date.getMonth()) {
        date.setDate(date.getDate() + 1);
        days++;
    }
    return days;
}

function lastMonth() {
    console.log("last");
}

function nextMonth() {
    console.log("next");
}