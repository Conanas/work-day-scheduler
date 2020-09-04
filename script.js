var DayPlanner = {
    slots: ["9AM", "10AM", "11AM", "12AM", "1AM", "2AM", "3AM", "4AM", "5AM"],
    addButtonText: "Add",
    currentTime: moment().format("h:mm a"),
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

        this.displayDate();

        var layoutDisplay = $("#layout-display");
        var thisAddButtonText = this.addButtonText;

        this.slots.forEach(function(slot) {

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
            newSlotTextarea.attr({
                name: `slot-textarea-${slot}`,
                id: `slot-textarea-${slot}`,
                cols: "30",
                rows: "3"
            });
            newSlotTextareaCol.append(newSlotTextarea);

            // create slot button colum
            var newSlotButtonCol = $("<div>");
            newSlotButtonCol.addClass("col-3 col-sm-2 slot-done");
            newSlotRow.append(newSlotButtonCol);

            // create button for slot button column
            var newSlotButton = $("<button>");
            newSlotButton.addClass("slot-button");
            newSlotButton.attr("id", `slot-button-${slot}`);
            newSlotButton.text(thisAddButtonText);
            newSlotButtonCol.append(newSlotButton);
        });
    },
}

DayPlanner.createLayout();