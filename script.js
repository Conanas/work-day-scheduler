var DayPlanner = {
    timeSlots: ["9AM", "10AM", "11AM", "12AM", "1AM", "2AM", "3AM", "4AM", "5AM"],
    addButtonText: "Add",
    createLayout: function() {

        var layoutDisplay = $("#layout-display");
        var thisAddButtonText = this.addButtonText;

        this.timeSlots.forEach(function(timeSlot) {

            // create timeslot div
            var newTimeSlot = $("<div>");
            newTimeSlot.addClass("time-slot");

            // create time display
            var newTime = $("<div>");
            newTime.addClass("time-display");
            newTime.text(timeSlot);
            newTimeSlot.append(newTime);

            // create text area
            var newTextArea = $("<textarea>");
            newTextArea.attr("name", "event-textarea");
            newTextArea.attr("id", `${timeSlot}-textarea`);
            newTimeSlot.append(newTextArea);

            // create add event button
            var newAddButton = $("<button>");
            newAddButton.addClass("add-event-button");
            newAddButton.text(thisAddButtonText);
            newTimeSlot.append(newAddButton);

            // append timeSlot div to layout display
            layoutDisplay.append(newTimeSlot);
        });
    },
}

DayPlanner.createLayout();