### Plán aplikace: Oddílový pohled na atletické výsledky Atleti+

#### **Celkový koncept aplikace**

Cílem aplikace je umožnit oddílům získat přehled o nejlepších výkonech svých atletů v jedné tabulce. Aplikace bude sloužit pro plánování závodů a usnadnění práce, která se aktuálně dělá manuálně. Díky jednoduchému uživatelskému rozhraní bude aplikace přístupná širokému spektru uživatelů a nabídne moderní řešení problému.

Aplikace bude navržena jako **Single Page Application (SPA)** s důrazem na moderní UX, rychlou odezvu a interaktivitu. Použití SPA umožní dynamické přechody mezi jednotlivými kroky bez nutnosti reloadu stránky, s možností záložního režimu v případě selhání komunikace s API.
její název je Atleti+ resp. `atletiplus`

#### **Hlavní funkčnost**

1. **Zadání oddílu a sezóny:**

    - Uživatel zadá název oddílu a sezónu (předvyplněno na aktuální rok).
    - Po odeslání se provede dotaz na API (atletika.cz) nebo na lokální cache serveru.

2. **Výběr atletů:**

    - Dynamicky generovaný seznam atletů s možností odškrtnutí atletů, kteří nemají být zahrnuti do tabulky.
    - Data o atletech budou uchována v klientské cache (např. `localStorage`) pro zrychlení procesu.

3. **Zobrazení tabulky výsledků:**

    - Tabulka se výsledky atletů vygenerovaná na základě vybraných dat.
    - Možnost exportu dat do Excelu nebo Google Sheets pomocí knihovny jako `SheetJS`.

4. **Fallback mechanismus:**

    - Pokud komunikace s API selže, aplikace použije předuložená záložní data ve formátu JSON.

#### **Technické detaily**

##### **Frontend (SPA)**

- **Framework:** Použití čistého JavaScriptu pokud jde popř. importování existujících knihoven.
- **Bootstrap:** Použití komponent pro moderní a responzivní design (formuláře, tabulky, tlačítka).
- **Správa stavu:**
    - Data o oddílech, sezónách a atletech budou uchovávána v `localStorage` jako primární mechanismus pro ukládání výsledků atletů a zrychlení uživatelského zážitku. Lokální cache umožní přístup k výsledkům i bez opakovaných API dotazů.
    - URL správa pomocí `history.pushState` pro podporu tlačítka zpět.

##### **Backend (PHP)**

- **API vrstva:** PHP endpointy budou spravovat volání na atletika.cz a uchování dat v cache.
- **Server caching:** Tato funkčnost bude implementována jako bonus a umožní uchovávat výsledky atletů pro minimalizaci zátěže API. Cache bude platná pro každý dotaz na oddíl a sezónu po určitou dobu (např. 1 hodina).
- **Záložní data:**
    - JSON soubory budou použity jako fallback pro případ, že API nebude dostupné.

##### **Export dat**

- Použití knihovny `SheetJS` pro export dat do Excelu přímo na straně klienta.

#### **Uživatelský postup (User Flow)**

1. **Krok 1:** Zadání oddílu a sezóny.

    - Formulář pro vstup s validací na straně klienta i serveru.
    - Po odeslání se provede dotaz na API nebo cache.

2. **Krok 2:** Výběr atletů.

    - Seznam atletů je zobrazen s možností odškrtnutí.
    - Zvolená data jsou udržována v klientské cache.

3. **Krok 3:** Generování tabulky.

    - Tabulka s názvy disciplín a výsledky.
    - Tlačítko pro export dat.

#### **Zajištění stability a UX**

- **Validace vstupů:** Na straně klienta (JavaScript) a serveru (PHP).
- **Synchronizace:** Jakákoli změna v kroku 1 nebo 2 automaticky invaliduje následující kroky a vyžádá jejich aktualizaci.
- **Fallback mechanismus:** Pokud API nebo cache selže, aplikace použije záložní data.

#### **Testování**

- **Unit testy (QUnit):** Testování jednotlivých funkcí a validací na klientovi pomocí CDN knihovny QUnit. Zaměřeno na pokrytí všech klíčových funkcí s důrazem na vysokou test coverage.
- **Backend testy:** Testy PHP endpointů pro API a cache.


#### **Shrnutí**

Tento plán využívá SPA architekturu s důrazem na moderní UX, flexibilitu a robustnost. Kombinace klientské a serverové cache zajistí rychlý a spolehlivý chod aplikace i v případě výpadku API. Aplikace bude snadno rozšířitelná a optimalizovaná pro testování a budoucí úpravy.

---

### **Celková aktualizovaná struktura projektu „Atletiplus“**

```
atletiplus
├── assets
│   ├── css
│   │   └── styles.css         # Stylování aplikace
│   ├── js
│   │   ├── app.js            # Hlavní soubor propojující kroky
│   │   ├── step1_input.js    # Logika pro zadání oddílu a sezóny
│   │   ├── step2_selection.js# Logika pro výběr atletů
│   │   ├── step3_table.js    # Logika pro generování tabulky
│   │   └── parsers
│   │       ├── parseSearch.js  # Parsování dat pro vyhledávání oddílů a atletů
│   │       └── parseResults.js # Parsování dat pro výsledky atletů
│   └── img                   # Obrázky pro aplikaci
├── backend
│   ├── search.php            # Vyhledávání oddílů a atletů
│   ├── results.php           # Získání výsledků atletů
│   ├── cache.php             # Správa cache
│   ├── config.php            # Konfigurace aplikace
│   ├── mock-data.php         # Záložní data
├── data
│   └── athletes.json         # Záložní data atletů (JSON)
├── docs
│   ├── architecture.md       # Dokumentace architektury projektu
│   ├── testing-guide.md      # Dokumentace k testování aplikace
├── tests
│   ├── unit-tests.html       # Testovací stránka pro QUnit
│   └── unit-tests.js         # Jednotkové testy QUnit
├── index.html                # Hlavní HTML stránka aplikace
└── README.md                 # Obecná dokumentace projektu
```

