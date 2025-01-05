/**
 * Valdiuje že JSON odpovídá tomu co dále aplikace očekává
 * @param {any} inJson -  JSON
 * @returns {boolean}
 * fixme: možná problém s chybějícím JSON.parse()
 * todo: přidat pokud jeden list kratší -- aby nedošlo k overflow
 * todo: zpracování chyb. zpráv z API
 */
export function  validateSearchResults(inJson) {
    console.log('validateSearchResults called');
     // tady možná nebude sedět
  const json = inJson;
    try {
     //  const json = JSON.parse(inJson.toString());
       console.warn(typeof json);
        const requiredKeys = ['sEcho', 'draw', 'recordsTotal', 'recordsFiltered', 'data'];
        const requiredDataKeys = ['TeamID', 'EAN', 'Fullname', 'Birthdate', 'Registered', 'Teamname'];

        // Check if the keys are in the correct order
        if (!keysInOrder(Object.keys(json), requiredKeys)) {
            return false;
        }

        console.log('All Main keys are present in the correct order');

        //  all keys in the JSON object
        // jsonKeys.forEach(key => {
        //     console.log(key);
        // });
        //
        // // Iterate over the data array and print each key
        // json.data.forEach(item => {
        //     Object.keys(item).forEach(key => {
        //         console.log(key);
        //     });
        // });

        // Validate each item in the data array
        for (const item of json.data) {
            if (!keysInObject(item, requiredDataKeys)) {
                return false;
            }
        }

        console.log('All data items have the required keys');
        return true;
    } catch (error) {
        console.error('Error validating search results:', error);
        return false;
    }
}

/**
 * Pořadí klíčů - kontroluje jestli sedí pořadí klíčů
 * @param keys  {string[]} json klíče
 * @param requiredKeys {string[]} požadované klíče
 * @returns {boolean}
 */
function keysInOrder(keys, requiredKeys) {
    for (let i = 0; i < requiredKeys.length; i++) {
        if (keys[i] !== requiredKeys[i]) {
            console.error(`Key order mismatch: expected ${requiredKeys[i]} but found ${keys[i]}`);
            return false;
        }
    }
    return true;
}

/**
 * pořadí klíčů v objektu "atletů" - kontroluje jestli jsou všechny klíče v objektu
 * @param obj {Object} objekt
 * @param requiredKeys {string[]} požadované klíče
 * @returns {boolean} true pokud jsou všechny klíče v pořadí a v objektu, navíc umí vypisovat problematického atleta
 */
function keysInObject(obj, requiredKeys) {
    for (const key of requiredKeys) {
        if (!(key in obj)) {
            console.error(`Chybějící klíč  ${key} in u atleta`, obj);
            return false;
        }
    }
    return true;
}

