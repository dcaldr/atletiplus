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
