# Architektura projektu 
Tato sekce popisuje strukturu projektu "Atletiplus" a jednotlivé složky a jejich účel. 
 
## Struktura 
``` 
atletiplus 
├── assets 
│   ├── css\styles.css         # Stylování aplikace 
│   ├── js\app.js             # Hlavní soubor propojující kroky 
│   ├── js\step1_input.js     # Logika pro zadání oddílu a sezóny 
│   ├── js\step2_selection.js # Logika pro výběr atletů 
│   ├── js\step3_table.js     # Logika pro generování tabulky 
│   └── js\parsers 
│       ├── parseSearch.js     # Parsování dat pro vyhledávání oddílů a atletů 
│       └── parseResults.js    # Parsování dat pro výsledky atletů 
├── backend 
│   ├── search.php            # Vyhledávání oddílů a atletů 
│   ├── results.php           # Získání výsledků atletů 
│   ├── cache.php             # Správa cache 
│   ├── config.php            # Konfigurace aplikace 
│   ├── mock-data.php         # Záložní data 
├── data\athletes.json         # Záložní data atletů (JSON) 
├── docs\architecture.md      # Popis architektury projektu 
├── docs\testing-guide.md     # Dokumentace k testování 
├── tests 
│   ├── unit-tests.html       # Testovací stránka pro QUnit 
│   └── unit-tests.js         # Jednotkové testy QUnit 
├── index.html                # Hlavní HTML stránka aplikace 
└── README.md                 # Obecná dokumentace projektu 
``` 
```mermaid
graph LR
    A[atletiplus] --> B[assets]
    B --> B1[css]
    B1 --> B11[styles.css - Stylování aplikace]
    B --> B2[js]
    B2 --> B21[app.js - Hlavní soubor propojující kroky]
    B2 --> B22[step1_input.js - Zadání oddílu a sezóny]
    B2 --> B23[step2_selection.js - Výběr atletů]
    B2 --> B24[step3_table.js - Generování tabulky]
    B2 --> B25[parsers]
    B25 --> B251[parseSearch.js - Parsování pro vyhledávání]
    B25 --> B252[parseResults.js - Parsování pro výsledky]
    B --> B3[img - Obrázky]

    A --> C[backend]
    C --> C1[search.php - Vyhledávání oddílů a atletů]
    C --> C2[results.php - Získání výsledků atletů]
    C --> C3[cache.php - Správa cache]
    C --> C4[config.php - Konfigurace aplikace]
    C --> C5[mock-data.php - Záložní data]

    A --> D[data]
    D --> D1[athletes.json - Záložní data atletů]

    A --> E[docs]
    E --> E1[architecture.md - Popis architektury]
    E --> E2[testing-guide.md - Průvodce testováním]

    A --> F[tests]
    F --> F1[unit-tests.html - Testovací stránka pro QUnit]
    F --> F2[unit-tests.js - Jednotkové testy QUnit]

    A --> G[index.html - Hlavní stránka aplikace]
    A --> H[README.md - Obecná dokumentace projektu]
```