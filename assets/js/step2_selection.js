import {validateSearchResults} from "./parsers/parseSearch.js";
import {manageAthletes} from "./Athlete.js";

let inJson = null;
let selectedYear = null;
/**
 * pole pro data tabulky
 *
 */
let tableData = null;

/**
 *
 *
 */
export function setSearchResults(json, year) {
    console.log('setSearchResults called');
    if(json === null) {
        console.error('Null v searchResults json');
        return false;
    }
    if(year === null){
        console.error('Null v searchResults year');
        return false;
    }
    //todo: zkontroloat jestli odpovídá formátu
    let parseStatus;
    console.log('první json');
    console.log( json);
     parseStatus = validateSearchResults(json);
     console.log('parseStatus po validate:', parseStatus);
     console.log('json po validate:', json);
     if(parseStatus) {
         inJson = json;
         selectedYear = year;
         console.log('----json je v pořádku*-- na konci');
         tableData = manageAthletes(json,selectedYear);
         return true;

     }
    return false;
}

/**
 * pracuje na zobrazení druhého kroku .. tedy tabulky
 * čeká že inJson a selectedYear jsou naplněny už pomocí setSearchResults
 * @returns {boolean}
 */
export function initializeStep2(){
    console.log('initData called');
    if(inJson === null){
        console.error('initData: inJson  null');
        return false;
    }
    if(selectedYear === null){
        console.error('initData: selectedYear null');
        return false;
    }

    putTableRows(tableData);
    return true;


}

//// tabulky

function putTableRows(tableData) {
    const tableBody = document.getElementById('selectAthletes');
    tableBody.innerHTML = '';
    tableData.forEach(rowData => {
        tableBody.insertAdjacentHTML('beforeend', rowData);
    });
}




/**
 * hlídá mačkání sort tlačítek
 */
function sortListener() {
    // Vyhledání všech tlačítek pro řazení
    const sortButtons = document.querySelectorAll('.sort-toggle');

    sortButtons.forEach(button => {
        // Nastavení správné ikony na základě aktuálního směru řazení
        const currentOrder = button.getAttribute('data-order');
        const icon = button.querySelector('i');
        if (currentOrder === 'asc') {
            icon.classList.add('bi-arrow-up');
            icon.classList.remove('bi-arrow-down');
        } else {
            icon.classList.add('bi-arrow-down');
            icon.classList.remove('bi-arrow-up');
        }

        // Přidání naslouchání na kliknutí
        button.addEventListener('click', function () {
            // Přepnutí směru řazení
            const currentOrder = this.getAttribute('data-order');
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
            this.setAttribute('data-order', newOrder);

            // Aktualizace ikony podle směru
            if (newOrder === 'asc') {
                icon.classList.add('bi-arrow-up');
                icon.classList.remove('bi-arrow-down');
            } else {
                icon.classList.add('bi-arrow-down');
                icon.classList.remove('bi-arrow-up');
            }

            // Získání sloupce podle atributu data-sort
            const column = this.getAttribute('data-sort');

            // Volání mockované funkce pro přeuspořádání tabulky
            reorderTable(column, newOrder);
        });
    });
}

