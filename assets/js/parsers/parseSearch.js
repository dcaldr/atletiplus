/**
 * Valdiuje že JSON odpovídá tomu co dále aplikace očekává
 * @param inJson
 * @returns {boolean}
 * fixme: možná problém s chybějícím JSON.parse()
 */
function validateSearchResults(inJson) {
    //const json = JSON.parse(inJson); // tady možná nebude sedět
   const json = inJson;
    try {
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


function debugLoad() {
  return "{\n" +
      "  \"sEcho\": 0,\n" +
      "  \"draw\": 1,\n" +
      "  \"recordsTotal\": 38535,\n" +
      "  \"recordsFiltered\": 163,\n" +
      "  \"data\": [\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187461,\n" +
      "      \"Fullname\": \"Allibone Calvin Pieter\",\n" +
      "      \"Birthdate\": \"16\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187460,\n" +
      "      \"Fullname\": \"Allibone Sophia Elizabeth\",\n" +
      "      \"Birthdate\": \"17\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000139238,\n" +
      "      \"Fullname\": \"Alt Adam\",\n" +
      "      \"Birthdate\": \"15\",\n" +
      "      \"Registered\": \"31.12.2026\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000171272,\n" +
      "      \"Fullname\": \"Barcena Blažková Lorentzo\",\n" +
      "      \"Birthdate\": \"15\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000168440,\n" +
      "      \"Fullname\": \"Barcena García Nero\",\n" +
      "      \"Birthdate\": \"11\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000155974,\n" +
      "      \"Fullname\": \"Bártová Markéta\",\n" +
      "      \"Birthdate\": \"16\",\n" +
      "      \"Registered\": \"31.12.2027\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187402,\n" +
      "      \"Fullname\": \"Bauerová Lara\",\n" +
      "      \"Birthdate\": \"15\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187592,\n" +
      "      \"Fullname\": \"Bavor Vilém\",\n" +
      "      \"Birthdate\": \"17\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000168436,\n" +
      "      \"Fullname\": \"Baxantová Eva\",\n" +
      "      \"Birthdate\": \"09\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000139201,\n" +
      "      \"Fullname\": \"Becková Viktorie\",\n" +
      "      \"Birthdate\": \"14\",\n" +
      "      \"Registered\": \"31.12.2026\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187431,\n" +
      "      \"Fullname\": \"Beganyová Alma\",\n" +
      "      \"Birthdate\": \"18\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187790,\n" +
      "      \"Fullname\": \"Benčič Peter\",\n" +
      "      \"Birthdate\": \"17\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000136995,\n" +
      "      \"Fullname\": \"Brejlová Anna\",\n" +
      "      \"Birthdate\": \"10\",\n" +
      "      \"Registered\": \"31.12.2026\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000168437,\n" +
      "      \"Fullname\": \"Bugáňová Karolína\",\n" +
      "      \"Birthdate\": \"10\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000139202,\n" +
      "      \"Fullname\": \"Bumfrey Sebastian\",\n" +
      "      \"Birthdate\": \"15\",\n" +
      "      \"Registered\": \"31.12.2026\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000098840,\n" +
      "      \"Fullname\": \"Burianová Anežka\",\n" +
      "      \"Birthdate\": \"09\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000159572,\n" +
      "      \"Fullname\": \"Čermáková Lea\",\n" +
      "      \"Birthdate\": \"16\",\n" +
      "      \"Registered\": \"31.12.2027\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000118120,\n" +
      "      \"Fullname\": \"Černá Veronika\",\n" +
      "      \"Birthdate\": \"11\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000116478,\n" +
      "      \"Fullname\": \"Daczický Mikuláš\",\n" +
      "      \"Birthdate\": \"13\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000171275,\n" +
      "      \"Fullname\": \"Daníček Jakub\",\n" +
      "      \"Birthdate\": \"16\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000155979,\n" +
      "      \"Fullname\": \"Darebníčková Tereza\",\n" +
      "      \"Birthdate\": \"15\",\n" +
      "      \"Registered\": \"31.12.2027\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187388,\n" +
      "      \"Fullname\": \"Děkanovská Stella Klára\",\n" +
      "      \"Birthdate\": \"14\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000182281,\n" +
      "      \"Fullname\": \"Dírerová Diana\",\n" +
      "      \"Birthdate\": \"12\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000147513,\n" +
      "      \"Fullname\": \"Dostálek Ondřej\",\n" +
      "      \"Birthdate\": \"16\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187469,\n" +
      "      \"Fullname\": \"Drbohlav Adam\",\n" +
      "      \"Birthdate\": \"18\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000030334,\n" +
      "      \"Fullname\": \"Dubová Sara Sofia\",\n" +
      "      \"Birthdate\": \"12\",\n" +
      "      \"Registered\": \"31.12.2027\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000171529,\n" +
      "      \"Fullname\": \"Duchoň Jakub\",\n" +
      "      \"Birthdate\": \"16\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000130048,\n" +
      "      \"Fullname\": \"Duchoňová Kateřina\",\n" +
      "      \"Birthdate\": \"11\",\n" +
      "      \"Registered\": \"31.12.2025\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000171276,\n" +
      "      \"Fullname\": \"Dvořáková Jolana\",\n" +
      "      \"Birthdate\": \"13\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000149381,\n" +
      "      \"Fullname\": \"Dvořáková Věra\",\n" +
      "      \"Birthdate\": \"08\",\n" +
      "      \"Registered\": \"31.12.2027\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187471,\n" +
      "      \"Fullname\": \"Engelmaier Leo\",\n" +
      "      \"Birthdate\": \"15\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000155578,\n" +
      "      \"Fullname\": \"Ferbarová Eva\",\n" +
      "      \"Birthdate\": \"14\",\n" +
      "      \"Registered\": \"31.12.2027\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187791,\n" +
      "      \"Fullname\": \"Fillerová Veronika\",\n" +
      "      \"Birthdate\": \"17\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000164227,\n" +
      "      \"Fullname\": \"Hadrava Hynek\",\n" +
      "      \"Birthdate\": \"12\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000171277,\n" +
      "      \"Fullname\": \"Hadravová Hana\",\n" +
      "      \"Birthdate\": \"16\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000034658,\n" +
      "      \"Fullname\": \"Hanáková Karolina\",\n" +
      "      \"Birthdate\": \"76\",\n" +
      "      \"Registered\": \"31.12.2026\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000168498,\n" +
      "      \"Fullname\": \"Havel Michael\",\n" +
      "      \"Birthdate\": \"12\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000171280,\n" +
      "      \"Fullname\": \"Hladík Adam\",\n" +
      "      \"Birthdate\": \"14\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000101089,\n" +
      "      \"Fullname\": \"Hladíková Nela\",\n" +
      "      \"Birthdate\": \"12\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187590,\n" +
      "      \"Fullname\": \"Holan Martin\",\n" +
      "      \"Birthdate\": \"13\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000171281,\n" +
      "      \"Fullname\": \"Horáček Jakub\",\n" +
      "      \"Birthdate\": \"14\",\n" +
      "      \"Registered\": \"31.12.2028\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187389,\n" +
      "      \"Fullname\": \"Horáčková Eliška\",\n" +
      "      \"Birthdate\": \"17\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187497,\n" +
      "      \"Fullname\": \"Housková Julie\",\n" +
      "      \"Birthdate\": \"14\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000139208,\n" +
      "      \"Fullname\": \"Hromek Denis\",\n" +
      "      \"Birthdate\": \"12\",\n" +
      "      \"Registered\": \"31.12.2026\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000099544,\n" +
      "      \"Fullname\": \"Hubálková Anna\",\n" +
      "      \"Birthdate\": \"09\",\n" +
      "      \"Registered\": \"31.12.2027\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000116481,\n" +
      "      \"Fullname\": \"Hubalová Adriana\",\n" +
      "      \"Birthdate\": \"12\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187588,\n" +
      "      \"Fullname\": \"Chvojková Tereza\",\n" +
      "      \"Birthdate\": \"17\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000159126,\n" +
      "      \"Fullname\": \"Chvojková Zuzana\",\n" +
      "      \"Birthdate\": \"14\",\n" +
      "      \"Registered\": \"31.12.2027\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187792,\n" +
      "      \"Fullname\": \"Indra Albert\",\n" +
      "      \"Birthdate\": \"17\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"TeamID\": 132,\n" +
      "      \"EAN\": 10000187793,\n" +
      "      \"Fullname\": \"Indrová Alžběta Žofie\",\n" +
      "      \"Birthdate\": \"15\",\n" +
      "      \"Registered\": \"31.12.2029\",\n" +
      "      \"Teamname\": \"ŠSK Újezd nad Lesy-Praha (UJPR9)\"\n" +
      "    }\n" +
      "  ]\n" +
      "}"
}


 const aa = JSON.parse(debugLoad());
 validateSearchResults(aa);
 console.log('done');
