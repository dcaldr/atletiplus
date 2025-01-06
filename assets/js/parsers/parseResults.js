/**
 * převede html na důležitá data dost pravděpodobně asynchronně
 * @param htmlString
 * @returns {({discipline: string, result: string}|null)[]|boolean}
 */
export function extractPersonalBests(htmlString) {
    // Kontrola, zda stránka nezačíná "CHYBA:"
    if (htmlString.trim().startsWith("CHYBA:")) {
        console.error("Stránka obsahuje chybu: " + htmlString.trim());
        return false;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Najde všechny panely s třídou "innerpanel"
    const panels = doc.querySelectorAll('div.innerpanel');
    const personalBestPanel = Array.from(panels).find(panel => {
        const heading = panel.querySelector('h2');
        return heading && heading.textContent.trim() === 'Osobní maxima';
    });

    if (!personalBestPanel) {
        console.warn('Sekce "Osobní maxima" nebyla nalezena.');
       return  false;
    }

    // Najde tabulku uvnitř tohoto panelu
    const table = personalBestPanel.querySelector('table.table-striped');
    if (!table) {
        console.warn('Tabulka "Osobní maxima" nebyla nalezena.');
       return  false;
    }

    // Extrahuje data z tabulky
    const rows = table.querySelectorAll('tr');
    const personalBests = Array.from(rows).slice(1).map(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
            let discipline = cells[0]?.textContent?.trim();
            const result = cells[1]?.textContent?.trim();
            const dh = cells[2]?.textContent?.trim().toLowerCase();

            // Přidání (h) k disciplíně, pokud D/H obsahuje "h"
            if (dh === 'h') {
                discipline += " (h)";
            }

            return { discipline, result };
        }
        return null;
    }).filter(entry => entry);

    return personalBests;
}


// Příklad použití -data odebrána
export function testParser() {
//     const htmlContent = '\n' +

//         '</html>\n'; // HTML obsah jako string
//
//
//     const personalBests = extractPersonalBests(htmlContent);
//     console.log(personalBests);
}