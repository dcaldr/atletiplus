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
    sortListener();
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


function reorderTable(column, newOrder) {
    console.log('reorderTable called');
    // Get all table rows
    const table = document.querySelector('#selectAthletes');
    console.log('table', table);
    const rows = Array.from(table.querySelectorAll('tr'));
    console.log('rows', rows);

    // Sort rows
    rows.sort((a, b) => {
        let aValue, bValue;
        const aElement = a.querySelector(`[data-${column}]`);
        const bElement = b.querySelector(`[data-${column}]`);
        // Check if the cell contains a link with href
        if (aElement && aElement.querySelector('a[href]')) {
            aValue = aElement.querySelector('a').getAttribute('href');
            bValue = bElement.querySelector('a').getAttribute('href');
        } else {
            aValue = aElement ? aElement.textContent : '';
            bValue = bElement ? bElement.textContent : '';
        }
        if (newOrder === 'asc') {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });

    // Append rows back to the table
    table.innerHTML = '';
    rows.forEach(row => {
        table.appendChild(row);
    });
}

/**
 * hlídá mačkání sort tlačítek
 */
function sortListener() {
    // Find all sort buttons
    const sortButtons = document.querySelectorAll('.sort-toggle');

    sortButtons.forEach(button => {
        // Set the correct icon based on the current sort order
        const currentOrder = button.getAttribute('data-order');
        const icon = button.querySelector('i');
        if (currentOrder === 'asc') {
            icon.classList.add('bi-arrow-up');
            icon.classList.remove('bi-arrow-down');
        } else {
            icon.classList.add('bi-arrow-down');
            icon.classList.remove('bi-arrow-up');
        }

        // Add click event listener
        button.addEventListener('click', function (event) {
            // Prevent default button behavior
            event.preventDefault();

            // Toggle sort order
            const currentOrder = this.getAttribute('data-order');
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
            this.setAttribute('data-order', newOrder);

            // Update icon based on the new order
            if (newOrder === 'asc') {
                icon.classList.add('bi-arrow-up');
                icon.classList.remove('bi-arrow-down');
            } else {
                icon.classList.add('bi-arrow-down');
                icon.classList.remove('bi-arrow-up');
            }

            // Get the column to sort by
            const column = this.getAttribute('data-sort');

            // Call the reorderTable function to sort the table
            reorderTable(column, newOrder);
        });
    });
}

