import {validateSearchResults} from "./parsers/parseSearch.js";
import {sendToAthletes, manageAthletes} from "./Athlete.js";
import {setStep3Year} from "./step3_table.js";

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
    mainCheckboxListener();
    return true;


}

/**
 * po zmáčknutí tlačítka pošle vybrané atlety do dalšího kroku
 * @returns {*[]}
 */
export function getCheckedAthletes() {
    console.log('getCheckedAthletes called');
    const selectedAthletes = [];
    const checkboxes = document.querySelectorAll('#step2 input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        selectedAthletes.push({
            ean: checkbox.getAttribute('data-ean'),
            fullname: checkbox.getAttribute('data-fullname'),
            birthyear: checkbox.getAttribute('data-birthyear'),
            teamname: checkbox.getAttribute('data-teamname'),
            year: checkbox.getAttribute('data-year'),
            category: checkbox.getAttribute('data-category'),
        });
    });
    console.log('checkedAthletes', selectedAthletes);
    sendToAthletes(selectedAthletes);
    setStep3Year(selectedYear);

}

/**
 * zkontroluje zda je aspoň něco vybráno
 * @returns {boolean}
 */
export function validateSelection() {
    const checkboxes = document.querySelectorAll('#step2 input[type="checkbox"]');
    let isSelected = false;

    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            isSelected = true;
            break;
        }
    }

    if (!isSelected) {
    const alertPlaceholder = document.querySelector('#step2 #alertPlaceholder');
    if (!alertPlaceholder.querySelector('.alert')) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger alert-dismissible fade show';
        alert.role = 'alert';
        alert.innerHTML = `
            <span>Vyberte alespoň jednoho atleta.</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        alertPlaceholder.appendChild(alert);

        // Remove alert when closed
        alert.querySelector('.btn-close').addEventListener('click', () => {
            alert.remove();
        });
    }
}

    return isSelected;
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
 * pomáhá při řazení tabulky - vezme řádky do listu, seřadí , smaže staré  a vloží seřazené
 * @param columnIndex
 * @param newOrder
 */
function reorderTable(columnIndex, newOrder) {
    console.log('reorderTable called');
    // Get all table rows
    const table = document.querySelector('#selectAthletes');
    //console.log('table', table);
    const rows = Array.from(table.querySelectorAll('tr'));
   // console.log('rows', rows);

    // Sort rows
    rows.sort((a, b) => {
        let leftVal, rightVal;
        const aElement = a.children[columnIndex];
        const bElement = b.children[columnIndex];
        // console.log('aElement', aElement);
        // console.log('bElement', bElement);

        // jestli to je ta s odkazem
        if (aElement && aElement.querySelector('a')) {
            leftVal = aElement.querySelector('a').textContent.trim();
            rightVal = bElement.querySelector('a').textContent.trim();
        } else {
            leftVal = aElement ? aElement.textContent.trim() : '';
            rightVal = bElement ? bElement.textContent.trim() : '';
        }
        // console.log('aValue', leftVal);
        // console.log('bValue', rightVal);

        if (newOrder === 'asc') {
            return leftVal.localeCompare(rightVal);
        } else {
            return rightVal.localeCompare(leftVal);
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

    sortButtons.forEach((button, index) => {
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

            // Get the column index to sort by
            const columnIndex = index + 1; // Adjust for the checkbox column

            // Call the reorderTable function to sort the table
            reorderTable(columnIndex, newOrder);
        });
    });
}


/**
 *  hlídá hlavní zaškrtávátko - pokud je zaškrtnuto, tak zaškrtne všechny ostatní
 *  note: js umí vkládat fce do sebe :DD -- ale IDE to očividně moc nevidí rádo
 */
function mainCheckboxListener() {
    const mainCheckbox = document.querySelector('#step2 #selectAll');
    const checkboxes = document.querySelectorAll('#step2 input[type="checkbox"]');
    let pressTimer;
    let notificationShown = false;
    let longPressHandled = false; // v podstatě jako u mechanických tlačítek

    function handleLongPress() {
        longPressHandled = true;
        mainCheckbox.checked = !mainCheckbox.checked;
        checkboxes.forEach(checkbox => {
            checkbox.checked = mainCheckbox.checked;
        });
    }

    function handleShortPress() {
        if (!notificationShown) {
            const alertPlaceholder = document.querySelector('#step2 #alertPlaceholder');
            if (!alertPlaceholder.querySelector('.alert-warning')) {
                const alert = document.createElement('div');
                alert.className = 'alert alert-warning alert-dismissible fade show';
                alert.role = 'alert';
                alert.innerHTML = `
            <span>Pro o(d)značení podržte déle - dokud se tlačítka nezmění</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
                alertPlaceholder.appendChild(alert);
                notificationShown = true;

                // Remove notification flag when alert is closed
                alert.querySelector('.btn-close').addEventListener('click', () => {
                    notificationShown = false;
                });
            }
        }
    }

    mainCheckbox.addEventListener('mousedown', () => {
        longPressHandled = false;
        pressTimer = setTimeout(handleLongPress, 300); // Long press timeout
    });

    mainCheckbox.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
        if (!longPressHandled) {
            handleShortPress();
        }
    });

    mainCheckbox.addEventListener('mouseleave', () => {
        clearTimeout(pressTimer);
    });

    mainCheckbox.addEventListener('click', (event) => {
        event.preventDefault();
    });
}