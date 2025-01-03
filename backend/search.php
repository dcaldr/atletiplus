<?php
// Nastavení hlavičky odpovědi
header('Content-Type: application/json');

// Získání vstupních dat z POST
$year = $_POST['year'] ?? null;
$query = $_POST['query'] ?? null;
$test = $_POST['test'] ?? false;

// Validace vstupů
if (!$year) {
    echo json_encode(['error' => 'year : missing']);
    exit;
}
if (!$query) {
    echo json_encode(['error' => 'query : missing']);
    exit;
}

// validace správnosti vstupů
if (!is_numeric($year)){
    echo json_encode(['error' => 'year : NaN']);
    exit;
} else {
    $year = (int) $year;
    // aspoň rok 2003 - současný rok
    if ($year < 2003 || $year > date('Y')) {
        echo json_encode(['error' => 'year : out of range']);
        exit;
    }
}

// povolené znaky
if (!filter_var($query, FILTER_VALIDATE_REGEXP, ["options" => ["regexp" => "/^[\p{L}\p{N}\s\-]+$/u"]])) {
    echo json_encode(['error' => 'query : invalid']);
    exit;
}
/// pokud jen testování vstupů - vypíše testovací režim a stop
if ($test) {
    echo json_encode(['ok' => 'Test mode successful']);
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
curl_setopt($ch, CURLOPT_URL, $url); // atletika.cz
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // zabalení do stringu?
curl_setopt($ch, CURLOPT_POST, true); // požije POST na atletika.cz
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData); // nasáčkuje data requestu
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); // hlavička

// Odeslání požadavku na server
$response = curl_exec($ch); // doopravdy pošle

// Kontrola na chyby -- čistě transitu
if (curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
} else {
    echo $response;
}

// Zavření cURL
curl_close($ch);
