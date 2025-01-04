let allAtleti = [];
let selectedAthlets = [];

class Atlet {
    constructor(ean, fullname, birthdate, registered, teamname) {
        this.ean = ean;
        this.fullname = fullname;
        this.birthdate = birthdate;
        this.registered = registered;
        this.teamname = teamname;
        this.disciplines = []; // Pole disciplín a výkonů
    }
    addDiscipline(discipline, performance) {
        this.disciplines.push({ discipline, performance });
    }
    toFirstTable(year) {
        return `<tr>
            <td><a href="https://online.atletika.cz/vysledky-atleta/2024/${this.ean}">${this.fullname}</a></td>
            <td>${this.birthdate}</td>
            <td>${this.registered}</td>
            <td>${this.teamname}</td>
        </tr>`;
    }
}
function sortAtleti(atleti, key, order = 'asc') {
    return atleti.sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
    });
}
function transformJsonToAtleti(jsonData) {
    return jsonData.map(item => new Atlet(
        item.EAN,
        item.Fullname,
        item.Birthdate,
        item.Registered,
        item.Teamname
    ));
}