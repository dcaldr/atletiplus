<?php
// Kontrola roku a EAN
function isValidEan($ean) {
    return preg_match('/^\\d+$/', $ean) && strlen($ean) === 11;
}

function isValidYear($year) {
    $currentYear = date("Y");
    return is_numeric($year) && $year >= 1900 && $year <= $currentYear;
}

// Získání vstupních dat
$ean = $_GET['ean'] ?? '';
$year = $_GET['year'] ?? '';

if (!isValidEan($ean) || !isValidYear($year)) {
    header('Content-Type: text/plain; charset=utf-8');
    echo "Neplatný vstup: zkontrolujte EAN a rok.";
    exit;
}

// Sestavení URL pro požadavek
$url = "https://online.atletika.cz/vysledky-atleta/$year/$ean";

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
    echo "Chyba při načítání dat. HTTP kód: $httpCode, Chyba: $error";
    exit;
}

// Vrácení HTML obsahu
header('Content-Type: text/html; charset=utf-8');
echo $response;