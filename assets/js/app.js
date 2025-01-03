/**
 * Pole všech dostupných kroků
* @type {HTMLElement[]}
 */
let steps = [];
let currentStep = 0;



import { verifyPhpScript, verifyPhpInputs } from './step1_input.js'; // debug fce
import { generateYearOptions, firstStepBtnListener } from './step1_input.js';


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
    document.querySelector('#nextStep1').addEventListener('click', firstStepBtnListener);
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


});