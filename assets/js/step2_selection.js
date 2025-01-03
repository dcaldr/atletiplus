let inJson = null;

/**
 *
 * @param json  {{[key: string]: any} | null} json data nebo null v případě chyby
 */
export function setSearchResults(json) {
    if(json === null) {
        console.error('Null v searchResults');
        return false;
    }
    //todo: zkontroloat jestli odpovídá formátu
    validateSearchResults(json);
    inJson = json;
    return true;
}