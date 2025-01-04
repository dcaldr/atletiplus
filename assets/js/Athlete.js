let allAtleti = [];
let selectedAthlets = [];
let selectedYear = null;

class Atlet {
    constructor(inTeamID, inEan, inFullname, inBirthyear, inRegistred, inTeamname) {
        this.teamID = inTeamID;
        this.ean = inEan;
        this.fullname = inFullname;
        this.birthyear = inBirthyear;
        this.registered = inRegistred; // asi půjde zahodit
        this.teamname = inTeamname;
        this.disciplines = []; // Pole disciplín a výkonů
    }
    addDiscipline(discipline, performance) {
        this.disciplines.push({ discipline, performance });
    }
    toFirstTable(year) {
        return `
            <tr>
            <td><input type="checkbox" class="form-check-input" data-ean="${this.ean}" data-fullname="${this.fullname}" data-birthyear="${this.birthyear}" data-teamname="${this.teamname}" data-year="${year}"></td>
            <td><a href="https://online.atletika.cz/vysledky-atleta/${year}/${this.ean}">${this.fullname}</a></td>
            <td>${guessAgeCategory(this.birthyear, year)}</td>
            <td>${this.birthyear}</td>
            <td>${this.teamname}</td>
            <td class="d-none">${this.ean}</td>
            </tr>
        `;
    }


}
function guessAgeCategory(birthYearTwoDigits, referenceYear) {
    if (birthYearTwoDigits == null || referenceYear == null) {
        throw new Error("Both birthYearTwoDigits and referenceYear are required.");
    }

    // Určení celého roku narození
    const century = Math.floor(referenceYear / 100); // Aktuální století (např. 20 pro roky 2000-2099)
    const birthYear = birthYearTwoDigits <= referenceYear % 100
        ? century * 100 + birthYearTwoDigits
        : (century - 1) * 100 + birthYearTwoDigits; // v podstatě voodoo - pokud je někdo mladší než vybraný rok
    // -> tak je vlastně z min století, tím pádem by to nemělo mít hromadu ifů

    const age = referenceYear - birthYear;

    if (birthYear >= referenceYear - 11) {
        return "Přípravka";
    } else if (birthYear >= referenceYear - 13 && birthYear <= referenceYear - 12) {
        return "Mladší žactvo";
    } else if (birthYear >= referenceYear - 15 && birthYear <= referenceYear - 14) {
        return "Starší žactvo";
    } else if (birthYear >= referenceYear - 17 && birthYear <= referenceYear - 16) {
        return "Dorost";
    } else if (birthYear >= referenceYear - 19 && birthYear <= referenceYear - 18) {
        return "Junioři/juniorky";
    } else if (birthYear >= referenceYear - 22 && birthYear <= referenceYear - 20) {
        return "Dospělí 20-22 let";
    } else if (birthYear >= referenceYear - 34 && birthYear <= referenceYear - 23) {
        return "Muži/ženy";
    } else if (birthYear <= referenceYear - 35) {
        return "Veteráni";
    } else {
        console.error(`Nepodařilo se určit kategorii věku pro rok ${referenceYear} a rok narození ${birthYear}`);
        return "nezjištěná  kategorie";
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