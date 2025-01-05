<?php
// Kontrola roku a EAN
function isValidEan($ean) {
    return preg_match('/^\d+$/', $ean) && strlen($ean) === 11;
}

function isValidYear($year) {
    if (!is_numeric($year)) {
        header('Content-Type: text/plain; charset=utf-8');
        echo "CHYBA: Neplatný rok: není číselná hodnota.";
        exit;
    } else {
        $year = (int) $year;
        if ($year < 2003 || $year > date('Y')) {
            header('Content-Type: text/plain; charset=utf-8');
            echo "CHYBA: Neplatný rok: mimo rozsah.";
            exit;
        }
    }
}

// Získání vstupních dat
$ean = $_GET['ean'] ?? '';
$year = $_GET['year'] ?? '';

if (!isValidEan($ean) || !isValidYear($year)) {
    header('Content-Type: text/plain; charset=utf-8');
    echo "CHYBA: Neplatný vstup. Zkontrolujte EAN a rok.";
    exit;
}

// Sestavení URL pro požadavek
$url = "https://online.atletika.cz/vysledky-atleta/$year/$ean";

// Cesta k adresáři cache
$cacheDir = __DIR__ . '/searchCache';
if (!is_dir($cacheDir)) {
    mkdir($cacheDir, 0777, true);
}

// Cesta k souboru cache
$cacheFile = "$cacheDir/{$ean}_{$year}.html";

// Pokud existuje cache, vraťte její obsah
if (file_exists($cacheFile)) {
    header('Content-Type: text/html; charset=utf-8');
    echo file_get_contents($cacheFile);
    exit;
}

// Inicializace cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // Důležité pro produkční prostředí
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36');

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($response === false || $httpCode !== 200) {
    header('Content-Type: text/plain; charset=utf-8');
    echo "CHYBA: Chyba při načítání dat. HTTP kód: $httpCode, Chyba: $error.";
    exit;
}

// Uložení do cache
file_put_contents($cacheFile, $response);

// Vrácení HTML obsahu
header('Content-Type: text/html; charset=utf-8');
echo $response;
exit;
