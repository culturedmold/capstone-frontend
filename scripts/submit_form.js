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

async function postFormInput(formEntryObject) {
    // let xhr = new XMLHttpRequest();
    try {
        const response = await fetch("http://localhost:5005/run_model", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        
            body: JSON.stringify(formEntryObject)
        });
        const resultsJson = await response.json();
        
        console.log(resultsJson);

        displayResults();
    } catch {
        return;
    }
}
