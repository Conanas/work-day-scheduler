// DayPlanne object with all variables and methods
var DayPlanner = {

    // time slots stored as objects in an array
    Slots: [
        { slotString: "9AM", slotInt: 9, slotEvent: "" },
        { slotString: "10AM", slotInt: 10, slotEvent: "" },
        { slotString: "11AM", slotInt: 11, slotEvent: "" },
        { slotString: "12PM", slotInt: 12, slotEvent: "" },
        { slotString: "1PM", slotInt: 13, slotEvent: "" },
        { slotString: "2PM", slotInt: 14, slotEvent: "" },
        { slotString: "3PM", slotInt: 15, slotEvent: "" },
        { slotString: "4PM", slotInt: 16, slotEvent: "" },
        { slotString: "5PM", slotInt: 17, slotEvent: "" }
    ],

    // text for add button
    addButtonText: "Add",

    // date formatted by moment.js
    date: moment().format("dddd Do MMMM YYYY"),

    // display the date in the header
    displayDate: function() {
        var dateDisplay = $(".date-display");
        dateDisplay.text(`${this.date}`);
    },

    // check if new day
    checkNewDay: function() {
        // new day starts at 9am
        if (moment().isAfter(moment().hour(9))) {
            // if not new day then load Slots
            this.loadEvents();
        } else {
            // if new day then overwrite Slots
            localStorage.setItem("dayPlannerEvents", JSON.stringify(DayPlanner.Slots));
        }
    },

    // check if textarea is in the past present or future and return background color
    backgroundColor: function(i) {
        if (moment().isAfter(moment().hours(this.Slots[i].slotInt))) {
            // if current time is after the time slot
            return "lightgrey";
        } else if (moment().isSame(moment().hours(this.Slots[i].slotInt))) {
            // if current time is before the time slot
            return "#ff8c8c";
        } else {
            // else current time is the time slot
            return "lightgreen";
        }
    },

    // save event button function
    saveEvent: function(event) {
        // get the value of the event target
        var hour = event.target.value;
        // change to 24 hour time starting at 9am
        var index = hour - 9;
        // get value of textarea associated with the hour
        var slotValue = $(`#slot-textarea-${hour}`).val();
        // save to Slots object
        DayPlanner.Slots[index].slotEvent = slotValue;
        // save Slots to localStorage
        localStorage.setItem("dayPlannerEvents", JSON.stringify(DayPlanner.Slots));
    },

    // load events into DayPlanner savedEvents array
    loadEvents: function() {
        this.Slots = JSON.parse(localStorage.getItem("dayPlannerEvents"));
    },

    // create the time slots layout
    createLayout: function() {

        this.displayDate();
        this.checkNewDay();

        // variables
        var layoutDisplay = $("#layout-display");
        var backgroundColor = "";
        var thisAddButtonText = this.addButtonText;

        // for each time slot create planner elements
        for (var i = 0; i < this.Slots.length; i++) {

            // create slot row
            var newSlotRow = $("<div>");
            newSlotRow.addClass("row no-gutters slot");
            layoutDisplay.append(newSlotRow);

            // create slot time column
            var newSlotTimeCol = $("<div>");
            newSlotTimeCol.addClass("col-3 col-sm-2 col-lg-1 slot-time");
            newSlotRow.append(newSlotTimeCol);

            // create label for slot time column
            var newSlotLabel = $("<label>");
            newSlotLabel.addClass("slot-label");
            newSlotLabel.attr({
                for: `slot-textarea-${this.Slots[i].slotString}`,
                id: `slot-label-${this.Slots[i].slotString}`
            });
            newSlotLabel.text(this.Slots[i].slotString);
            newSlotTimeCol.append(newSlotLabel);

            // create slot textarea column
            var newSlotTextareaCol = $("<div>");
            newSlotTextareaCol.addClass("col-6 col-sm-8 col-lg-10 slot-input");
            newSlotRow.append(newSlotTextareaCol);

            // assign a background color for textarea depending on time of day
            backgroundColor = DayPlanner.backgroundColor(i);

            // create textarea for slot textarea column
            var newSlotTextarea = $("<textarea>");
            newSlotTextarea.addClass("slot-textarea");
            newSlotTextarea.attr({
                name: `slot-textarea-${this.Slots[i].slotString}`,
                id: `slot-textarea-${this.Slots[i].slotInt}`,
                cols: "30",
                rows: "3",
                value: this.Slots[i].slotInt,
                style: `background-color: ${backgroundColor};`
            });
            newSlotTextarea.text(this.Slots[i].slotEvent);
            newSlotTextareaCol.append(newSlotTextarea);

            // create slot button colum
            var newSlotButtonCol = $("<div>");
            newSlotButtonCol.addClass("col-3 col-sm-2 col-lg-1 slot-done");
            newSlotRow.append(newSlotButtonCol);

            // create button for slot button column
            var newSlotButton = $("<button>");
            newSlotButton.addClass("slot-button");
            newSlotButton.attr({
                id: `slot-button-${this.Slots[i].slotString}`,
                value: this.Slots[i].slotInt
            });
            newSlotButton.text(thisAddButtonText);
            newSlotButtonCol.append(newSlotButton);

            // click event listener for add button
            newSlotButton.on("click", DayPlanner.saveEvent);
        }
    }
}

DayPlanner.createLayout();