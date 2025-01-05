import {getSelectedAthletes} from "./Athlete.js";
import {extractPersonalBests} from "./parsers/parseResults.js";
let selectedYear;
let selectedAthletes = [];
/**
 * Pole atletů s výsledky
* @type {Atlet[]}
 */
let finishedAthletes = [];

export function initializeStep3(year){
    console.log('initializeStep3 called');
    if(year === null){
        console.error('initializeStep3: year null');
        return false;
    } if(year < 2003 || year > new Date().getFullYear()){
        console.error('initializeStep3: year out of range');
        return false;
    }
    selectedYear = year;


    selectedAthletes = getSelectedAthletes();
   const result = resultsToAthletes(selectedAthletes);
   console.log('finishedAthletes', finishedAthletes);
   return result;



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
    const [mHtml] = await Promise.all([getAthleteData(selectedYear, ean)]); //fixme
    const mResults = await extractPersonalBests(mHtml);

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
function resultsToAthletes(athleteList){
    console.log('resultsToAthletes called');
    if(athleteList.length === 0){
        console.warn('resultsToAthletes: no athletes');
        return false;
    }
    // console.log('selectedAthletes', selectedAthletes);
    // console.log('selectedYear', selectedYear);

    for(let athlete of athleteList){
        // check ean and year
        checkEan(athlete);
        // if good get results for it
     let  finishedResults =  prepareAthleteResults(selectedYear, athlete.ean);
     if (finishedResults === false) {
         console.error('resultsToAthletes: error getting results');
         return false;
     }

     for (let result in finishedResults) {
         athlete.addDiscipline(result);
     }
      finishedAthletes.push(athlete);

    }
    return true;



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