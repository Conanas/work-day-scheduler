var DayPlanner = {
    slots: ["9AM", "10AM", "11AM", "12AM", "1AM", "2AM", "3AM", "4AM", "5AM"],
    hours: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    addButtonText: "Add",
    day: moment().format("dddd"),
    date: moment().format("Do"),
    month: moment().format("MMMM"),
    year: moment().format("YYYY"),

    // display the date in the header
    displayDate: function() {
        var dateDisplay = $(".date-display");
        dateDisplay.text(`${this.day} ${this.date} ${this.month} ${this.year}`);
    },

    // create the time slots layout
    createLayout: function() {

        // display todays date
        this.displayDate();

        // variables
        var layoutDisplay = $("#layout-display");
        var thisHours = this.hours;
        var backgroundColor = "";
        var thisAddButtonText = this.addButtonText;

        // for each time slot create planner elements
        this.slots.forEach(function(slot, hour) {

            // create slot row
            var newSlotRow = $("<div>");
            newSlotRow.addClass("row no-gutters slot");
            layoutDisplay.append(newSlotRow);

            // create slot time column
            var newSlotTimeCol = $("<div>");
            newSlotTimeCol.addClass("col-3 col-sm-2 slot-time");
            newSlotRow.append(newSlotTimeCol);

            // create label for slot time column
            var newSlotLabel = $("<label>");
            newSlotLabel.addClass("slot-label");
            newSlotLabel.attr({
                for: `slot-textarea-${slot}`,
                id: `slot-label-${slot}`
            });
            newSlotLabel.text(slot);
            newSlotTimeCol.append(newSlotLabel);

            // create slot textarea column
            var newSlotTextareaCol = $("<div>");
            newSlotTextareaCol.addClass("col-6 col-sm-8 slot-input");
            newSlotRow.append(newSlotTextareaCol);

            // create textarea for slot textarea column
            var newSlotTextarea = $("<textarea>");
            newSlotTextarea.addClass("slot-textarea");

            // assign a background color for textarea depending on time of day
            backgroundColor = DayPlanner.backgroundColor(hour);

            newSlotTextarea.attr({
                name: `slot-textarea-${slot}`,
                id: `slot-textarea-${slot}`,
                cols: "30",
                rows: "3",
                value: thisHours[hour],
                style: `background-color: ${backgroundColor};`
            });
            newSlotTextareaCol.append(newSlotTextarea);

            // create slot button colum
            var newSlotButtonCol = $("<div>");
            newSlotButtonCol.addClass("col-3 col-sm-2 slot-done");
            newSlotRow.append(newSlotButtonCol);

            // create button for slot button column
            var newSlotButton = $("<button>");
            newSlotButton.addClass("slot-button");
            newSlotButton.attr({
                id: `slot-button-${slot}`,
                value: thisHours[hour]
            });
            newSlotButton.text(thisAddButtonText);
            newSlotButtonCol.append(newSlotButton);

            // click event listener for add button
            newSlotButton.on("click", DayPlanner.saveEvent);
        });
    },

    // check if textarea is in the past present or future and return background color
    backgroundColor: function(hour) {
        if (moment().isAfter(moment().hours(this.hours[hour]))) {
            return "lightgrey";
        } else if (moment().isSame(moment().hours(this.hours[hour]))) {
            return "indianred";
        } else {
            return "lightgreen";
        }
    },

    // save event button function
    saveEvent: function(event) {
        console.log(event.target.value)
    }
}

DayPlanner.createLayout();