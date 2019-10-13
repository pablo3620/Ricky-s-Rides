function radioButton(number, className) {
    var options = document.getElementsByClassName(className);
    for (var i = 0; i < options.length; i++) {
        if (i == number) {
            options[i].dataset.selected = "true";
        } else {
            options[i].dataset.selected = "false";
        }
    }

}

function radioValue(className, dataType) {
    var options = document.getElementsByClassName(className);
    for (var i = 0; i < options.length; i++) {
        if (options[i].dataset.selected == "true" || options[i].checked) {
            return options[i].dataset[dataType];
        }
    }
}

