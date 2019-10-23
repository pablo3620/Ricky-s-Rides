//allows div to act like radio buttons so that only one from the classname can have data selected time
function radioButton(number, className) {
    var options = document.getElementsByClassName(className);
    for (var i = 0; i < options.length; i++) {
        if (i == number) {
            options[i].dataset.selected = "true";
            options[i].dataset.done = "true";
        } else {
            options[i].dataset.selected = "false";
        }
    }

}
//reterns the div that is selected dataType data
function radioValue(className, dataType) {
    var options = document.getElementsByClassName(className);
    for (var i = 0; i < options.length; i++) {
        if (options[i].dataset.selected == "true") {
            return options[i].dataset[dataType];
        }
    }
}