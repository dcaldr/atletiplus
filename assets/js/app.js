

/**
 * Pole všech dostupných kroků
* @type {HTMLElement[]}
 */
let steps = [];
let currentStep = 0;


import {initializeStep2} from "./step2_selection.js";
import { verifyPhpScript, verifyPhpInputs } from './step1_input.js'; // debug fce
import { generateYearOptions, firstStepFormChecker } from './step1_input.js';


function initializeSteps() {
    steps = Array.from(document.querySelectorAll('.step'));
    currentStep = 0;
}

/**
 * Přepne krok (tj. zobrazí právě ten jeden a ostatní skryje)
 * @param index {number} Index kroku, který se má zobrazit (0 = první krok)
 * @returns {void} todo: vrátit něco?
 */
function showStep(index) {
    /**todo: kontrola jestli číslo patří */
    steps.forEach((step, i) => {
        step.classList.toggle('d-none', i !== index);
    });
    currentStep = index;
}

/**
 * připnutí základních tlačítek
 */
function addBasicListeners() {
    document.querySelector('#nextStep1').addEventListener('click', goToStep2Listener);
}
 async function goToStep2Listener() {
    console.log('goToStep2Listener called');
     let [aa] = await Promise.all([firstStepFormChecker()]);
    console.log('aa', aa);
    if ( aa ) {
        console.log('firstStepFormChecker passed');
        initializeStep2();
        showStep(1);


    } else {
        console.error('Chyba v goToStep2 kroku');
    }
}


/**
 * Zpustí se až po načtení stránky
 */
document.addEventListener('DOMContentLoaded', () => {
    //todo: přidat logiku pro nepovolený JS -- ie asi odstranit hlašku js je vypnutý (zatím není)
    initializeSteps();
    // first step
    generateYearOptions();
    showStep(0); // pro jistotu
    addBasicListeners();
    window.verifyPhpScript = verifyPhpScript;
    window.verifyPhpInputs = verifyPhpInputs;
    // put ujpr9 to nazev oddílu and 2024 to season
     document.querySelector('#teamName').value = 'ujpr9';
     document.querySelector('#season').value = '2024';
     // buttonpress
        document.querySelector('#nextStep1').click();
        console.log('nextStep2 clicked');


});