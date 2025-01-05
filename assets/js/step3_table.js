import {getSelectedAthletes} from "./Athlete.js";
import {extractPersonalBests} from "./parsers/parseResults.js";
import XLSX from "https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs";
//importScripts("https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js");

/**
 * Vybraný rok
 * @type {number}
 */
let selectedYear;
let selectedAthletes = [];
/**
 * Pole atletů s výsledky
* @type {Atlet[]}
 */
let finishedAthletes = [];

/**
 * provede inicializaci dat pro krok 3
 * kvůli jinému rozložení fcí je toto voláno z app.js -- tedy rok už musí být nastaven
 * @returns {boolean}
 */
export async function initializeStep3() {
    console.log('initializeStep3 called');
    if (selectedYear < 2003 || selectedYear > new Date().getFullYear()) {
        console.error('initializeStep3: year out of range');
        return false;
    }

    selectedAthletes = getSelectedAthletes();
    const result = await resultsToAthletes(selectedAthletes); // bacha bez toho awaitu to selže
    console.log('result', result);
    if (!result) {
        console.error('initializeStep3: error in resultsToAthletes');
        return false;
    }
    const tableHTMLDefinition = createResultsTable(finishedAthletes);
    addExportListener();
   // console.log('tableHTMLDefinition', tableHTMLDefinition);
    insertTable(tableHTMLDefinition);
    return result;


}

export function setStep3Year(year){
    selectedYear = year;
}
export function clearStep3Results() {
    const tableContainer = document.querySelector('#step3 #resultsTable');
    tableContainer.innerHTML = '';
    finishedAthletes = [];
}

function checkEan(athlete) {
    // if its number and  fits this 10000025523
    return(athlete.ean.match(/^\d+$/) && athlete.ean.length === 11);

}

/**
 * Ptá se API na data
 * @param selectedYear
 * @param ean
 * @returns {Promise<string | void>}
 */
 function getAthleteData(selectedYear, ean) {
    const url = `backend/results.php?year=${selectedYear}&ean=${ean}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error fetching athlete data:', error);
        });
}

/**
 * postup zpracování dat atleta
 * @param selectedYear
 * @param ean
 * @returns {({discipline: string, result: string}|null)[]|boolean}
 * možná promise !!!
 */
async function prepareAthleteResults(selectedYear, ean) {
    console.log('prepareAthleteResults called');
   // console.log('selectedYear', selectedYear, 'ean', ean);
 if(selectedYear === null || selectedYear === undefined){
        console.error('prepareAthleteResults: selectedYear null or undefined');
        return false;
    }
    if(ean === null){
        console.error('prepareAthleteResults: ean null');
        return false;
    }
    const [mHtml] = await Promise.all([getAthleteData(selectedYear, ean)]); //fixme
    const mResults = await extractPersonalBests(mHtml);
   //     console.log('prepareAthleresults:',ean, 'mResults', mResults);
    if(mResults === null){
        console.error('prepareAthleteResults: no results');
        return false;
    }
    // pokud error
    if(mResults === false){
        console.error('prepareAthleteResults: error parsing results');
        return false;
    }
    return mResults;

}

/**
 * vstupní fce do překláadání výsledků na atlety
 * @param athleteList
 * @returns {boolean}
 */
async function resultsToAthletes(athleteList) {
    console.log('resultsToAthletes called');
    if (athleteList.length === 0) {
        console.warn('resultsToAthletes: no athletes');
        return false;
    }
    // console.log('selectedAthletes', selectedAthletes);
    // console.log('selectedYear', selectedYear);

    for (let athlete of athleteList) {
        // check ean and year
        checkEan(athlete);
        // if good get results for it
        let finishedResults = await prepareAthleteResults(selectedYear, athlete.ean);
      //  console.log('finishedResults', finishedResults);
        if (finishedResults === false) {
            console.error('resultsToAthletes: error getting results');
            return false;
        }

        for (let result of finishedResults) {
          //  console.log('result', result);
            const { discipline, result: performance } = result;
            athlete.addDiscipline(discipline, performance);
        }
        finishedAthletes.push(athlete);

    }
    return true;


}

////TABULKA
/**
 * Vytvoří tabulku s výsledky atletů
 * @param athletes
 * @returns {string} "html" tabulka
 */
function createResultsTable(athletes) {
    console.log('createResultsTable called');
    console.log('athletes', athletes);
    // Pokud je pole atletů prázdné, inicializovat prázdné disciplíny
    const disciplines = athletes.length > 0
        ? [...new Set(athletes.flatMap(atlet => atlet.disciplines.map(d => d.discipline)))]
        : [];

    // Vytvoření hlavičky tabulky
    const headerRow = ['Jméno', 'Rok narození', 'Kategorie', ...disciplines];

    // Vytvoření řádků tabulky
    const rows = athletes.map(atlet => {
        const row = [
            atlet.fullname,
            atlet.birthyear,
            atlet.category
        ];

        // Přidání výkonů pro každou disciplínu
        disciplines.forEach(discipline => {
            const performance = atlet.disciplines.find(d => d.discipline === discipline)?.performance || '';
            row.push(performance);
        });

        return row;
    });

    // Generování HTML tabulky (nebo jiného výstupu)
    let tableHtmlDefinition = '<table class="table table-striped">';

    // Přidání hlavičky
    tableHtmlDefinition += '<thead><tr>';
    headerRow.forEach((header, index) => {
        tableHtmlDefinition += `<th scope="${index === 0 ? 'col' : 'col'}">${header}</th>`;
    });
    tableHtmlDefinition += '</tr></thead>';

    // Přidání řádků
    tableHtmlDefinition += '<tbody>';
    rows.forEach((row, rowIndex) => {
        tableHtmlDefinition += '<tr>';
        row.forEach((cell, cellIndex) => {
            if (cellIndex === 0) {
                tableHtmlDefinition += `<th scope="row">${cell}</th>`;
            } else {
                tableHtmlDefinition += `<td>${cell}</td>`;
            }
        });
        tableHtmlDefinition += '</tr>';
    });
    tableHtmlDefinition += '</tbody></table>';

    return tableHtmlDefinition;
}

/**
 * vloží tabulku na místo původní
 * pokud bude čas připne další legrační věci
 * @param tableHTMLDefinition
 */
function insertTable(tableHTMLDefinition) {
    const tableContainer = document.querySelector('#step3 #resultsTable');
    tableContainer.innerHTML = tableHTMLDefinition;
}
 function exportTableXLSX() {
    console.log('exportTableXLSX called');
    const table = document.querySelector('#step3 #resultsTable');

    let downloadFile = XLSX.utils.table_to_book(table,{raw: true});
     XLSX.writeFile(downloadFile, 'výsledkyAtletiplus.xlsx', {
         bookType: 'xlsx',
         bookSST: true,
         type: 'binary',
         cellText: true,
         raw: false,
         cellDates: true,

     });
}

function addExportListener() {
    const exportButton = document.querySelector('#exportTable');
    exportButton.addEventListener('click', exportTableXLSX);
}






export function verifyPhpResults() {
    const eanList = [
        '10000187461',
        '10000187460',
        '10000139238',
        '10000171272',
        '10000168440',
        '10000155974',
        '10000187402',
        '10000187592',
        '10000168436',
        '10000139201',
        '10000187431',
        '10000187790',
        '10000136995',
        '10000168437',
        '10000139202',
        '10000098840',
        '10000159572',
        '10000118120',
        '10000116478',
        '10000171275',
        '10000155979',
        '10000187388',
        '10000182281',
        '10000147513',
        '10000187469',
        '10000030334',
        '10000171529',
        '10000130048',
        '10000171276',
        '10000149381',
        '10000187471',
        '10000155578',
        '10000187791',
        '10000164227',
        '10000171277',
        '10000034658',
        '10000168498',
        '10000171280',
        '10000101089',
        '10000187590',
        '10000171281',
        '10000187389',
        '10000187497',
        '10000139208',
        '10000099544',
        '10000116481',
        '10000187588',
        '10000159126',
        '10000187792',
        '10000187793'
    ];

    for (let ean of eanList) {
        getAthleteData(2024, ean).then(r => console.log(r));
    }
}