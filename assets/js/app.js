let steps = [];
let currentStep = 0;

function initializeSteps() {
    steps = Array.from(document.querySelectorAll('.step'));
    currentStep = 0;
}

function showStep(index) {
    steps.forEach((step, i) => {
        step.classList.toggle('d-none', i !== index);
    });
    currentStep = index;
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSteps();
    showStep(0);
});