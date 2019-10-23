// var ms = new Date().getTime() + 86400000;
// var tomorrow = new Date(ms);
function onLoad() {
    document.getElementById("pickupDate").setAttribute("min", new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]);
    count(0)
}

function timesCheck() {
    if (pickupDate.checkValidity() && NoDay.checkValidity() && NoDay.value > 0 && NoDay.value < 15) {
        pickupOutput.innerHTML = pickupDate.value;
        returnOutput.innerHTML = new Date(new Date(pickupDate.value).getTime() + (86400000 * NoDay.value)).toISOString().split("T")[0];
        NoDayOutput.innerHTML = NoDay.value;
        document.getElementById("timeButton").disabled = false;
        timesInfoOutput.innerHTML = "Pickup on " + pickupOutput.innerHTML + ", Return on " + returnOutput.innerHTML
    }
}

function count(number) {
    console.log(parseInt(NoDay.value) + parseInt(number))
    NoDay.value = parseInt(NoDay.value) + parseInt(number);
    if (NoDay.value >= 14) {
        addDay.setAttribute('onclick', '');
    } else if (NoDay.value <= 1) {
        subtractDay.disabled = true;
    } else {
        addDay.setAttribute('onclick', 'count(1)');
        subtractDay.disabled = false;
    }
}

function carModel(number) {
    radioButton(number, 'car_model');
    document.getElementById("modelButton").disabled = false;
    modelOutput.innerHTML = radioValue('car_model', 'info');
    modelInfoOutput.innerHTML = radioValue('car_model', 'info');
    carCostOutput.innerHTML = radioValue('car_model', 'price');
}

function extras(number, className) {
    radioButton(number, className);
    document.getElementById("extraButton").disabled = false;
    extrasSelectedOutput.innerHTML = extrasOutput();
    extrasInfoOutput.innerHTML = extrasOutput();
    totalCostOutput.innerHTML = parseInt(carCostOutput.innerHTML) * parseInt(NoDayOutput.innerHTML) + parseInt(insuranceCostOutput.innerHTML) * parseInt(NoDay.value) + parseInt(extrasCostOutput.innerHTML) + parseInt(bookingFeeOutput.innerHTML);
}

//function to display extras 
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

function infoCheck() {
    if (firstName.checkValidity() && lastName.checkValidity() && age.checkValidity() && phoneNo.checkValidity() && email.checkValidity()) {
        document.getElementById("infoButton").disabled = false;
    }
    nameOutput.innerHTML = firstName.value + " " + lastName.value;
    ageOutput.innerHTML = age.value;
    phoneOutput.innerHTML = phoneNo.value;
    emailOutput.innerHTML = email.value;
}

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
}