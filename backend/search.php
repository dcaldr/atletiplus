<?php
// Nastavení hlavičky odpovědi
header('Content-Type: application/json');

// Získání vstupních dat z POST
$year = $_POST['year'] ?? null;
$query = $_POST['query'] ?? null;

// Validace vstupů
if (!$year || !$query) {
    echo json_encode(['error' => 'Missing required parameters: year and query']);
    exit;
}

// API URL
$url = "https://online.atletika.cz/clenska-sekce/atleti/AthleteData/";

// Data pro POST požadavek
$postData = http_build_query([
    'draw' => 2,
    'columns[0][data]' => 'Fullname',
    'columns[0][searchable]' => 'true',
    'columns[0][orderable]' => 'false',
    'columns[1][data]' => 'Birthdate',
    'columns[1][searchable]' => 'true',
    'columns[1][orderable]' => 'false',
    'columns[2][data]' => 'Teamname',
    'columns[2][searchable]' => 'true',
    'columns[2][orderable]' => 'false',
    'columns[3][data]' => 'Registered',
    'columns[3][searchable]' => 'true',
    'columns[3][orderable]' => 'false',
    'start' => 0,
    'length' => 50, //počet výsledků dukla má cca 730 atletů (todo: vymyslet zvýšení, do produkce)
    'season' => $year,
    'fulltext' => $query,
]);

// Hlavičky požadavku
$headers = [
    'Content-Type: application/x-www-form-urlencoded; charset=UTF-8',
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.86 Safari/537.36',
];

// Inicializace cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// Odeslání požadavku
$response = curl_exec($ch);

// Kontrola na chyby
if (curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
} else {
    echo $response;
}

// Zavření cURL
curl_close($ch);
