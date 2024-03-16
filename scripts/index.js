class FormEntry {
    constructor(sex,age,education,smoker,cigs, bpMeds, stroke,hypertensia,diabetes,bmi) {
        this.sex = sex;
        this.age = age;
        this.education = education;
        this.smoker = smoker;
        this.cigs = cigs;
        this.bpMeds = bpMeds;
        this.stroke = stroke;
        this.hypertensia = hypertensia;
        this.diabetes = diabetes;
        this.bmi = bmi;
    }
}

// VALIDATE THE FORM
function submitForm() {
    const sex = getRadioGroupSelected('sex');
    const age = getTextInput('age');
    const education = getDropdownSelection('education');
    const smoker = getRadioGroupSelected('smoker');
    const cigs = getTextInput('cigs');
    const bpMeds = getRadioGroupSelected('bpmeds');
    const stroke = getRadioGroupSelected('stroke');
    const hypertensia = getRadioGroupSelected('hypertensia');
    const diabetes = getRadioGroupSelected('diabetes');
    const bmi = getTextInput('bmi');

    const formEntry = new FormEntry(sex, age, education, smoker, cigs, bpMeds, stroke, hypertensia, diabetes, bmi);

    // console.log(JSON.stringify(formEntry));

    if (sex == -1 || age == -1 || education == -1 || smoker == -1 || cigs == -1 || bpMeds == -1 || stroke == -1 || hypertensia == -1 || diabetes == -1 || bmi == -1) {
        return;
    } else {

        postFormInput(formEntry);
    }
}

function getRadioGroupSelected(elementName) {
    const radioInputs = document.getElementsByName(elementName);
    let input = -1;

    for (let i = 0; i < radioInputs.length; i++) {
        if (radioInputs[i].checked) {
            input = radioInputs[i].value;
        }
    }

    if (input === -1) {
        for (let i = 0; i < radioInputs.length; i++) {
            if (!radioInputs[i].classList.contains("invalid")) {
                radioInputs[i].classList.add("invalid");
            }
        }
    } else {
        for (let i = 0; i < radioInputs.length; i++) {
            radioInputs[i].classList.remove("invalid");
        }
    }

    console.log(input);
    return parseInt(input);
}

function getTextInput(elementId) {
    let input = document.getElementById(elementId);

    if (input.value === "") {
        input.classList.add("invalid");
        return "-1";
    } else {
        input.classList.remove("invalid");
    }

    return parseInt(input.value);
}

function getDropdownSelection(elementId) {
    const selectedOption = document.getElementById(elementId).value;

    if (selectedOption === undefined) {
        return -1;
    }

    return parseInt(selectedOption);
}

function displayResults() {
    const resultsPopup = document.getElementById("results-popup");


    resultsPopup.style.display = 'block';
}

// SEND POST REQUEST TO API AND GET BACK MODEL RESULTS
async function postFormInput(formEntryObject) {
    // Display our loading message while we wait on the async function
    loadingMessage();

    try {
        const response = await fetch("https://captone-flask-backend-c449b855cc7e.herokuapp.com/run", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        
            body: JSON.stringify(formEntryObject)
        });
        const resultsJson = await response.json();
        
        console.log(resultsJson);

        displayResults(resultsJson['classification'], (parseFloat(resultsJson['probability']).toFixed(2) * 100));
    } catch {

        displayError();
        return;
    }
}


// DISPLAY RESULTS
function displayResults(classification, probability) {
    const overlay = document.getElementById("overlay");
    const resultsPopup = document.getElementById("results-popup");

    const resultsH2 = document.getElementById('results-h2');
    const probaH3 = document.getElementById('proba-h3');

    resultsH2.classList = "";
    if (classification == 1) {
        resultsH2.textContent = "High Risk of Coronary Heart Disease within 10 years";
        resultsH2.classList.add('bad');
    } else {
        resultsH2.textContent = "Low Risk of Coronary Heart Disease within 10 years";
        resultsH2.classList.add('good');
    }

    probaH3.textContent = "Probability of CHD in 10 years: " + probability + "%";

    if (!(overlay.style.display == "block")) {
        overlay.style.display = "block";
    };

    if (!(popup.style.display == "block")) {
        popup.style.display = "block";
    };

}

function displayError() {
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("results-popup");

    const resultsH2 = document.getElementById('results-h2');

    resultsH2.textContent = "We've encountered a problem. Please try again.";

    if (!(overlay.style.display == "block")) {
        overlay.style.display = "block";
    };

    if (!(popup.style.display == "block")) {
        popup.style.display = "block";
    };

}

function popupClose() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('results-popup');

    if (!(overlay.style.display == "none")) {
        overlay.style.display = "none";
    };

    if (!(popup.style.display == "none")) {
        popup.style.display = "none";
    };
    
}

function loadingMessage() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('results-popup');
    const resultsH2 = document.getElementById('results-h2');

    overlay.style.display = "block";
    popup.style.display = "block";

    resultsH2.textContent = "Getting Your Results...";
}
