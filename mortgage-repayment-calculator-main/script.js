let form = document.querySelector(".mortgage");

let mortgageAmount = document.getElementById("amount"),
    mortgageTerm = document.getElementById("term"),
    interest = document.getElementById("rate"),
    radios = form.querySelectorAll("input[type='radio']"),
    calculateBtn = document.getElementById("calculate"),
    errors = form.querySelectorAll(".error"),
    amountTag = form.querySelector(".amount__tag"),
    termTag = form.querySelector(".term__tag"),
    interestTag = form.querySelector(".interest__tag"),
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

let tags = [amountTag, termTag, interestTag];

function checkCompletion(field) {
    if (field !== radios) {
        return field.value ? true : false;
    } else {
        return Array.from(field).some((radio) => radio.checked);
    }
}

function showErrors() {
    let flag = true;
    for (let i = 0; i < inputs.length; i++) {
        const field = inputs[i][0];
        const error = inputs[i][1];

        if (checkCompletion(field) === false) {
            error.hidden = false;
            if (i < 3) {
                tags[i].classList.remove("tag--okay");
                tags[i].classList.add("tag--error");
            }
            flag = false;
        } else {
            error.hidden = true;
            if (i < 3) {
                tags[i].classList.remove("tag--error");
                tags[i].classList.add("tag--okay");
            }
        }
    }

    return flag;
}

function checkNonNums() {
    let flag = true;
    for (let i = 0; i < inputs.length - 1; i++) {
        if (
            isNaN(parseFloat(inputs[i][0].value)) &&
            checkCompletion(inputs[i][0])
        ) {
            flag = false;
        }
    }

    if (!flag) {
        alert("Only numbers allowed !!!");
    }
    return flag;
}

function calculate() {
    let p = parseFloat(mortgageAmount.value),
        year = parseFloat(mortgageTerm.value),
        r = parseFloat(interest.value) / 100 / 12,
        n = parseFloat(year * 12);

    // The formula for calculating the monthly repayment is:
    // M = Pr(n(1 + r)^n - 1) / ((1 + r)^n - 1)
    // Where M is the monthly repayment, P is the mortgage amount, r is the
    // monthly interest rate and n is the number of months
    if (radios[0].checked) {
        let m = (p * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1),
            total = (year * 12 * m).toFixed(2);
        return [m.toFixed(2), total];
        // The formula for calculating the monthly repayment for an interest only
        // mortgage is:
        // M = Pr / 12
    } else if (radios[1].checked) {
        let m = (r * p) / 12,
            total = (year * 12 * m).toFixed(2);
        return [m.toFixed(2), total];
    }
}

function displayResults(data) {
    const resultArray = data;
    monthlyPay.innerHTML = `£${resultArray[0]}`;
    totalPay.innerHTML = `£${resultArray[1]}`;

    noResultPage.hidden = true;
    resultPage.hidden = false;
}

calculateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const validInputs = showErrors() && checkNonNums();

    if (validInputs) {
        displayResults(calculate());
    }
});
