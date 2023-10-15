const formID = '1COaD0aW1PwPEj2tW4QtQ_IRY3JPK0kc5BulEK8GjADk';

async function runSample() {
    const accessToken = 'ya29.a0AfB_byCHsMKcmvCEIBFRk8CNCFJUWMQa-xaFvMTxAHkSXTdYzXQBjgZq-EhVjtJn4v4YZKUZ-OELOe8HIpNQa46GLKIHEa2cSJ4heSdyQg91lJ7QoiJSUiwRuflKb2CZXv7obF6Kcslred_uTYj8zcFNN6p6tPjsX76MaCgYKATgSARESFQGOcNnCnP1cKiOQTp0ilZPM4dT7Rw0171';

// URL of the Google Sheets API endpoint you want to access
    const apiUrl = 'https://forms.googleapis.com/v1/forms/' + formID;

    // SPREADSHEET_ID: The ID of your Google Spreadsheet
    // RANGE: The range of cells you want to access, e.g., 'Sheet1!A1:B2'

    // Make a GET request to the Google Sheets API
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Handle the API response data here
        console.log(data);
    })
    .catch(error => {
        // Handle errors here
        console.error('Error:', error);
    });

}

runSample();
