/**
 * testovací skript - php script output do konzole
 */
export function verifyPhpScript() {
    const url = 'backend/search.php';
    const data = new URLSearchParams(); // pero query to asi jde taky
    data.append('year', '2024');
    data.append('query', 'šsk újezd nad lesy');

    fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export function generateYearOptions() {
    const yearField = document.querySelector('#step1 form #season');
    const yearOptionSelector = document.querySelector('#step1 form #seasons'); // do datalistu
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const startYear = 2003;
    yearOptionSelector.innerHTML = ''; // smaže předpřipravený
    for (let selYear = currentYear; selYear >= startYear; selYear--) {
        const option = document.createElement('option');
        option.value = selYear;
        option.textContent = selYear;

        // // pokud je začátek roku
        // if (selYear === currentYear) {
        //     if (currentMonth < 3) {
        //         continue;
        //     } else {
        //         option.setAttribute('selected', true.toString());
        //     }
        //
        // }
        // if(selYear -1 === currentYear && currentMonth < 3) {
        //     option.setAttribute('selected', true.toString());
        // }


        yearOptionSelector.appendChild(option);
    }

  //  yearField.setAttribute('min', startYear.toString());
    yearField.setAttribute('max', currentYear.toString());
  //  yearField.setAttribute('required', true.toString());
    // začátek roku - pokud je začátek roku, tak se nastaví na minulý rok !0 = leden
    if(currentMonth < 3) {
        yearField.setAttribute( 'value', (currentYear - 1).toString());
    }
    else {
        yearField.setAttribute('value', currentYear.toString());
    }
}

/**
 * proběhne po zmáčknutí tlačítka další na prvním kroku
 * @returns {boolean} pokud je vše v pořádku pro pokračování na další krok
 */
export function  firstStepBtnListen(){
    validateFormInput();
    return true;
}

/**
 * Zkontroluje vstupní data a zobrazí chyby uživateli
 * fixme: teamname - asi udělat listener aby chybová hláška odešla když uživatel začne měnit form
 * todo? - přehodit do parserů??
 * todo?? - přepsat na více znovupoužití -- jestli bude třeba??
 */
function validateFormInput() {
    console.log('clicked');
    const form = document.querySelector('#step1 form');
    const teamNameInput = document.querySelector('#teamName');
    const seasonInput = document.querySelector('#season');
    const seasonValue = parseInt(seasonInput.value); //
    const minYear = 2003; //todo: opakuje se -> globální?
    const currentYear = new Date().getFullYear();
    const teamNamePattern = /^[\p{L}\p{N}\s\-]+$/u; // allow pattern - písmena čísla mezery pomlčky <- "ve všech jazicích" /u - unicode

    // vstup
    console.log('oddíl:', teamNameInput.value);
    console.log('sezóna:', seasonValue);

    let errors = [];

    // teamName
     if (!teamNamePattern.test(teamNameInput.value)) {
    const invalidChars = teamNameInput.value.replace(teamNamePattern, ''); // odebere dobré znaky -> zbydou špatné
    teamNameInput.setCustomValidity(`Název oddílu obsahuje nepovolené znaky: ${invalidChars}`);
    teamNameInput.classList.add('is-invalid');
    teamNameInput.classList.remove('is-valid');
   // errors.push(`Název oddílu obsahuje nepovolené znaky: ${invalidChars}`);
    } else if (teamNameInput.value.trim() === '') {
        teamNameInput.setCustomValidity('Název oddílu nesmí být prázdný.');
        teamNameInput.classList.add('is-invalid');
        teamNameInput.classList.remove('is-valid');
      //  errors.push('Název oddílu nesmí být prázdný.');
    } else {
        teamNameInput.setCustomValidity('');
        teamNameInput.classList.add('is-valid');
        teamNameInput.classList.remove('is-invalid');
    }

    // Validate season
    if (isNaN(seasonValue) || seasonValue < minYear || seasonValue > currentYear) {
        seasonInput.setCustomValidity(`Sezóna musí být mezi ${minYear} a ${currentYear}.`);
        seasonInput.classList.add('is-invalid');
        seasonInput.classList.remove('is-valid');
      //  errors.push(`Sezóna musí být mezi ${minYear} a ${currentYear}.`);
    } else {
        seasonInput.setCustomValidity('');
        seasonInput.classList.add('is-valid');
        seasonInput.classList.remove('is-invalid');
    }

    if (!form.checkValidity()) {
        form.reportValidity();
        console.error('něco nevaliduje');
    } else {
        console.log('vše je v pořádku');
    }
}


/**
 * Vyvolá hledání, provede až po js kontrole vstupu (php dělá vlastní kontrolu)
 */
 function searchPlease(year, query) {

}

/**
 * Získá data z hledání a vrátí json?
 * @param yearC {string} ověřený rok
 * @param queryC {string} ověřený dotaz
 */
function getSearchData(yearC, queryC){
    const url = 'backend/search.php';
    const data = new URLSearchParams(); // pero query to asi jde taky
    data.append('year', yearC.toString());
    data.append('query', queryC.toString());

    fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


// verifyPhpScript();