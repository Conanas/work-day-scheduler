var DayPlanner = {
    slots: ["9AM", "10AM", "11AM", "12AM", "1AM", "2AM", "3AM", "4AM", "5AM"],
    addButtonText: "Add",
    createLayout: function() {

        var layoutDisplay = $("#layout-display");
        var thisAddButtonText = this.addButtonText;

        this.slots.forEach(function(slot) {

            // create slot row
            var newSlotRow = $("<div>");
            newSlotRow.addClass("row");
            newSlotRow.addClass("slot");
            layoutDisplay.append(newSlotRow);

            // create slot time column
            var newSlotTimeCol = $("<div>");
            newSlotTimeCol.addClass("col-xs-2");
            newSlotTimeCol.addClass("slot-time");
            newSlotRow.append(newSlotTimeCol);

            // create label for slot time column
            var newSlotLabel = $("<label>");
            newSlotLabel.attr("for", `slot-textarea-${slot}`);
            newSlotLabel.attr("id", `slot-label-${slot}`);
            newSlotLabel.addClass("slot-label");
            newSlotLabel.text(slot);
            newSlotTimeCol.append(newSlotLabel);

            // create slot textarea column
            var newSlotTextareaCol = $("<div>");
            newSlotTextareaCol.addClass("col-xs-8");
            newSlotTextareaCol.addClass("slot-input");
            newSlotRow.append(newSlotTextareaCol);

            // create textarea for slot textarea column
            var newSlotTextarea = $("<textarea>");
            newSlotTextarea.attr("name", `slot-textarea-${slot}`);
            newSlotTextarea.attr("id", `slot-textarea-${slot}`);
            newSlotTextarea.addClass("slot-textarea");
            newSlotTextareaCol.append(newSlotTextarea);

            // create slot button colum
            var newSlotButtonCol = $("<div>");
            newSlotButtonCol.addClass("col-xs-2");
            newSlotButtonCol.addClass("slot-done");
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