import {validateSearchResults} from "./parsers/parseSearch.js";

let inJson = null;

/**
 *
 *
 */
export function setSearchResults(json) {
    console.log('setSearchResults called');
    if(json === null) {
        console.error('Null v searchResults');
        return false;
    }
    //todo: zkontroloat jestli odpovídá formátu
    let parseStatus;
     parseStatus = validateSearchResults(json);
     if(parseStatus) {
         inJson = json;
         console.log('----json je v pořádku*-- na konci');
         return true;

     }
    return false;
}


//// tabulky
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