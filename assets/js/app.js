/**
 * Pole všech dostupných kroků
* @type {HTMLElement[]}
 */
let steps = [];
let currentStep = 0;

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
 * Zpustí se až po načtení stránky
 */
document.addEventListener('DOMContentLoaded', () => {
    //todo: přidat logiku pro nepovolený JS -- ie asi odstranit hlašku js je vypnutý (zatím není)
    initializeSteps();
    showStep(0); // pro jistotu
});