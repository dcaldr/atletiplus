import {getSelectedAthletes} from "./Athlete.js";
let selectedYear;
let selectedAthletes = [];
let finishedAthletes = [];

function initializeStep3(year){
    if(year === null){
        console.error('initializeStep3: year null');
        return false;
    } if(year < 2003 || year > new Date().getFullYear()){
        console.error('initializeStep3: year out of range');
        return false;
    }
    selectedYear = year;
    console.log('initializeStep3 called');
    selectedAthletes = getSelectedAthletes();


}

function checkEan(athlete) {
    // if its number and  fits this 10000025523
    return(athlete.ean.match(/^\d+$/) && athlete.ean.length === 11);

}

function getAthleteResults(selectedYear, ean) {
  const mHtml=  getAthleteData(selectedYear, ean);
    const mResults = get
}

function resultsToAthletes(athleteList){
    console.log('resultsToAthletes called');
    // console.log('selectedAthletes', selectedAthletes);
    // console.log('selectedYear', selectedYear);
    for(let athlete in athleteList){
        // check ean and year
        checkEan(athlete);
        // if good get results for it
     const  finishedAthlete =  getAthleteResults(selectedYear, athlete.ean);
        finishedAthletes.push(finishedAthlete);

    }

}