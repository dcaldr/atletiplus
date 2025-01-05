let allAtleti = [];
let selectedAthlets1 = [];
let selectedYear = null;

/**
 * Třída reprezentující atleta
 * @class Atlet
 */
export class Atlet {
    constructor(inTeamID, inEan, inFullname, inBirthyear, inRegistred, inTeamname, inCategory) {
        this.teamID = inTeamID;
        this.ean = inEan;
        this.fullname = inFullname;
        this.birthyear = inBirthyear;
        this.registered = inRegistred; // asi půjde zahodit
        this.teamname = inTeamname;
        this.category= inCategory
        this.disciplines = []; // Pole disciplín a výkonů
    }
  addDiscipline(discipline, performance) {
        this.disciplines.push({ discipline, performance });
    }
toFirstTable(year) {
    const category = guessAgeCategory(this.birthyear, year);
    return `
        <tr>
        <td><input type="checkbox" class="form-check-input" data-ean="${this.ean}" data-fullname="${this.fullname}" data-birthyear="${this.birthyear}" data-teamname="${this.teamname}" data-year="${year}" data-category="${category}"></td>
        <td><a href="https://online.atletika.cz/vysledky-atleta/${year}/${this.ean}">${this.fullname}</a></td>
        <td>${category}</td>
        <td>${this.birthyear}</td>
        <td>${this.teamname}</td>
        <td class="d-none">${this.ean}</td>
        </tr>
    `;
}






}
export function sendToAthletes(checkboxedAthletes) {
    console.log('sendToAthletes called');
    console.log('selectedAthlets1', selectedAthlets1.length);
    const athletesArray = checkboxedAthletes.map(athlete => {
        return new Atlet(
            null, // Assuming teamID is not provided in the checkboxedAthletes data
            athlete.ean,
            athlete.fullname,
            athlete.birthyear,
            null, // není potřeba
            athlete.teamname,
            athlete.category,
        );
    });
    //FIXME: prevents null athlete of going into the array
    selectedAthlets1 = athletesArray.filter(athlete => athlete.ean !== null);

    //selectedAthlets1 = athletesArray;
    return selectedAthlets1;
}
function guessAgeCategory(birthYearTwoDigits, referenceYear) {
    // Převod vstupů na čísla a kontrola
    const byrthYear = parseInt(birthYearTwoDigits, 10);
    const selectedYear = parseInt(referenceYear, 10);
    if (isNaN(byrthYear) || isNaN(selectedYear)) {
        throw new Error("birthYearTwoDigits i referenceYear musí být platná čísla.");
    }

    // Určení století (např. 20 pro roky 2000-2099)
    const century = Math.floor(selectedYear / 100);
    // math voodoo :D
    // Pokud je dvoučíslí větší než % 100 referenceYear, znamená to, že máme rok z předchozího století (19**),
    // jinak z toho samého století (20**).
    let birthYear;
    if (byrthYear > selectedYear % 100) {
        birthYear = (century - 1) * 100 + byrthYear;
    } else {
        birthYear = century * 100 + byrthYear;
    }

    // Věk
    const age = selectedYear - birthYear;

    // Rozdělení do kategorií podle věku
    if (age <= 11) {
        return "Přípravka";
    } else if (age >= 12 && age <= 13) {
        return "Mladší žactvo";
    } else if (age >= 14 && age <= 15) {
        return "Starší žactvo";
    } else if (age >= 16 && age <= 17) {
        return "Dorost";
    } else if (age >= 18 && age <= 19) {
        return "Junioři/juniorky";
    } else if (age >= 20 && age <= 22) {
        return "Dospělí 20-22 let";
    } else if (age >= 23 && age <= 34) {
        return "Dospělí";
    } else if (age >= 35) {
        return "Veteráni";
    } else {
        return "nezjištěná kategorie";
    }
}



function sortAtleti(atleti, key, order = 'asc') {
    return atleti.sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
    });
}

/**
 *
 * @param jsonData {Object} ten jsson co přišl
 * @returns {Object[]} pole objektů Atlet
 */
function transformJsonToAtleti(jsonData) {
    console.log('transformJsonToAtleti called');
    console.log('jsonData', jsonData);
    const atleti = [];
    const data = jsonData.data; // Access the data key
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const atlet = new Atlet(
            item.TeamID,
            item.EAN,
            item.Fullname,
            item.Birthdate,
            item.Registered,
            item.Teamname
        );
        atleti.push(atlet);
    }
    return atleti;
}
export function manageAthletes(jsonData, year) {
    console.log('manageAthletes called');
    allAtleti = transformJsonToAtleti(jsonData);
    console.log('allAtleti', allAtleti);
    selectedYear = year;
    // const table = document.querySelector('#step2 table tbody');
    // table.innerHTML = '';
    // allAtleti.forEach(atlet => {
    //     table.insertAdjacentHTML('beforeend', `<tr>${atlet.toFirstTable(year)}</tr>`);
    // });
    // addTableListeners();
    return getTableRows();
}
function getTableRows(key = 'fullname') {
    if(allAtleti.length === 0) {
        console.error('Není co zobrazit');
        return false;
    }
    // sort as as required -- TODO: Move sort to the actual table
    allAtleti = sortAtleti(allAtleti, key);
    // return rows html object array
    return allAtleti.map(atlet => atlet.toFirstTable(selectedYear));

}

/**
 * Vrátí pole vybraných atletů
 * @returns {*[]}
 */
export function getSelectedAthletes() {
    console.log('getSelectedAthletes called');
   // console.log('selectedAthlets1', selectedAthlets1);
    return selectedAthlets1;
}