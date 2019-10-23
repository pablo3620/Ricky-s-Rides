//function that runs on the loading of the page
function onLoad() {
    // sets the minimum date for the calender so that the user can't book past dates
    document.getElementById("pickupDate").setAttribute("min", new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]);
    // appropately enables the + and - button on the number of days selecter
    count(0)
}
//function runs on every input of pickup date or number of date. if it is valid enables the button so that the user can go to the next screen
function timesCheck() {
    count(0)
    if (pickupDate.checkValidity() && NoDay.checkValidity()) {
        pickupOutput.innerHTML = pickupDate.value;
        // calculates return date so that user can make sure it is correct
        returnOutput.innerHTML = new Date(new Date(pickupDate.value).getTime() + (86400000 * NoDay.value)).toISOString().split("T")[0];
        NoDayOutput.innerHTML = NoDay.value;
        document.getElementById("timeButton").disabled = false;
        timesInfoOutput.innerHTML = "Pickup on " + pickupOutput.innerHTML + ", Return on " + returnOutput.innerHTML
    } else {
        document.getElementById("timeButton").disabled = true;
    }
}
//enables and disables the + and - buttons if at a max or minimum so that user 
//onclick must be changed as to keep the styling simple buttons overlap so mutible are clicked at a time
function count(number) {
    NoDay.value = parseInt(NoDay.value) + parseInt(number);
    addDay.setAttribute('onclick', 'count(1)');
    subtractDay.setAttribute('onclick', 'count(-2)');
    NoDay.setAttribute('onclick', 'count(1)');
    if (NoDay.value >= 14) {
        addDay.setAttribute('onclick', '');
    } else if (NoDay.value <= 1) {
        subtractDay.setAttribute('onclick', 'count(-1)');
        NoDay.setAttribute('onclick', 'count(0)');
    }
}
//runs on click of one of the car card and dispalys car info and allows the user to proceed
// could possiblely shoren as many lines are repeated
function carModel(number) {
    radioButton(number, 'car_model');
    document.getElementById("modelButton").disabled = false;
    modelOutput.innerHTML = radioValue('car_model', 'info');
    modelInfoOutput.innerHTML = radioValue('car_model', 'info');
    carCostOutput.innerHTML = radioValue('car_model', 'price');
    modelSelected.innerHTML = radioValue('car_model', 'info');
    seatsSelected.innerHTML = radioValue('car_model', 'seats');
    bodySelected.innerHTML = radioValue('car_model', 'body');
    luggageSelected.innerHTML = radioValue('car_model', 'luggage');
    sizeSelected.innerHTML = radioValue('car_model', 'engine');
    usageSelected.innerHTML = radioValue('car_model', 'fuel');
    typeSelected.innerHTML = radioValue('car_model', 'fueltype');
    transmissionSelected.innerHTML = radioValue('car_model', 'transmission');
    costSelected.innerHTML = radioValue('car_model', 'price')
}
//runs on selection of extras and allows the user to proceed
function extras(number, className) {
    radioButton(number, className);
    document.getElementById("extraButton").disabled = false;
    extrasSelectedOutput.innerHTML = extrasOutput();
    extrasInfoOutput.innerHTML = extrasOutput();
    totalCostOutput.innerHTML = parseInt(carCostOutput.innerHTML) * parseInt(NoDayOutput.innerHTML) + parseInt(insuranceCostOutput.innerHTML) * parseInt(NoDay.value) + parseInt(extrasCostOutput.innerHTML) + parseInt(bookingFeeOutput.innerHTML);
}

//function to display selected extras as a string to make it easier for the user
function extrasOutput() {
    var extrasInfo = "",
        cost = 0,
        cards = document.getElementsByClassName('extras');
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].dataset.selected == "true") {
            extrasInfo += cards[i].dataset.info + ", ";
            cost += parseInt(cards[i].dataset.price);
        }
    }
    extrasCostOutput.innerHTML = cost;
    return extrasInfo.substring(0, extrasInfo.length - 2);
}
//enables button for the user to proceed if all inputs are valid
//also adds these these to the confimation card
function infoCheck() {
    if (firstName.checkValidity() && lastName.checkValidity() && age.checkValidity() && phoneNo.checkValidity() && email.checkValidity()) {
        document.getElementById("infoButton").disabled = false;
    } else {
        document.getElementById("infoButton").disabled = true;
    }
    nameOutput.innerHTML = firstName.value + " " + lastName.value;
    ageOutput.innerHTML = age.value;
    phoneOutput.innerHTML = phoneNo.value;
    emailOutput.innerHTML = email.value;
}
//allows the user to confirm details once agrees to the terms and condtion
function termsCheck() {
    if (terms.checked) {
        confirmButton.disabled = false;
    } else {
        confirmButton.disabled = true;
    }
}
//pushs data to firebase using data in the confirmation card
//also changes the confirmation card to a full screen booking summary
function confirm() {
    firebase.database().ref('bookings').push({
        Name: nameOutput.innerHTML,
        Driver_age: ageOutput.innerHTML,
        Phone_number: phoneOutput.innerHTML,
        Email: emailOutput.innerHTML,
        Pickup_Date: pickupOutput.innerHTML,
        Return_Date: returnOutput.innerHTML,
        Car_Model: modelOutput.innerHTML,
        Extras: extrasSelectedOutput.innerHTML,
        Total_Cost: "$" + totalCostOutput.innerHTML
    });
    final.dataset.done = true;
    confirmInfo.innerHTML = "Booking Summary";
    termsbox.style.display = "none";
    confirmButton.setAttribute('onclick', 'location.reload()');
    confirmButton.innerHTML = 'Return';
}
//allows user to reopen the cards if have already been opened in the case of an error
function openCard(num, className) {
    if (document.getElementsByClassName("content")[num].dataset.done == "true") {
        radioButton(num, className)
    }
}