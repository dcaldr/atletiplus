/**
 * testovací skript - php script output do konzole
 */
export function verifyPhpScript() {
    const url = 'backend/search.php';
    const data = new URLSearchParams();
    data.append('year', '2024');
    data.append('query', 'šsk újezd nad lesy');

    fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Call the function to verify the PHP script
// verifyPhpScript();