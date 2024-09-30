let form = document.querySelector(".mortgage");

let mortgageAmount = document.getElementById("amount"),
    mortgageTerm = document.getElementById("term"),
    interest = document.getElementById("rate"),
    radios = form.querySelectorAll("input[type='radio']"),
    calculateBtn = document.getElementById("calculate"),
    errors = form.querySelectorAll(".error"),
    monthlyPay = document.getElementById("monthly-pay"),
    totalPay = document.getElementById("total-pay"),
    noResultPage = document.querySelector(".result__noResult"),
    resultPage = document.querySelector(".result__withResult");

let inputs = [
    [mortgageAmount, errors[0]],
    [mortgageTerm, errors[1]],
    [interest, errors[2]],
    [radios, errors[3]],
];



function checkCompletion(field) {
    if (field !== radios) {
        return (!field.value ) ? false : true;
    } else {
        return (radios[0].checked || radios[1].checked)
            ? true
            : false;
    }
}

function showErrors() {
    let flag = true;
    for (let i = 0; i < inputs.length; i++) {
        if (checkCompletion(inputs[i][0]) === false) {
            inputs[i][1].style.display = "block";
            flag = false;
        } else {
            inputs[i][1].style.display = "none";
        }
    }

    return (flag === true) ? true : false; 
}

function checkNonNums () {
    flag = true;
    for(let i=0; i<inputs.length-1; i++) {
        if(isNaN(parseFloat(inputs[i][0].value)) && checkCompletion(inputs[i][0]) === true) {
            flag = false;
        }
    }
    flag === true ? null : alert("Only numbers allowed !!!");

    return flag === true ? true : false;
}

function calculate () {
    let p = parseFloat(mortgageAmount.value),
        year = parseFloat(mortgageTerm.value),
        r = parseFloat(interest.value)/100/12;
        n = parseFloat(year * 12);
    
    if(radios[0].checked) {
        let m = (p*(r*((1+r)**n))) / (((1+r)**n) - 1),
            total = (year * 12 * m).toFixed(2);
        return [m.toFixed(2), total];
    } else if (radios[1].checked) {
        let m = (r*p)/12,
        total = (year * 12 * m).toFixed(2);
        return [m.toFixed(2), total];
    }
}

function addThousandsSeparator(num, locale) {
    let numFormat = new Intl.NumberFormat(locale);
    let formatedNumber = numFormat.format(num);
    return formatedNumber;
}

function displayResults (data) {
    monthlyPay.textContent = `£${addThousandsSeparator(data[0], 'en-US')}`;
    totalPay.textContent = `£${addThousandsSeparator(data[1], 'en-US')}`;
    mortgageAmount.value = addThousandsSeparator(parseInt(mortgageAmount.value));

    noResultPage.style.display = "none";
    resultPage.style.display = "block";

}

calculateBtn.addEventListener("click", function (e) {   
    e.preventDefault();

    let flag1 = showErrors();
    let flag2 = checkNonNums();


    if (flag1 && flag2) {
        let result = calculate();
        displayResults(result);
    }
})


