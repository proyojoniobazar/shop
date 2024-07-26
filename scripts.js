function generateUniqueId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueId = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        uniqueId += chars[randomIndex];
    }
    return uniqueId;
}

function generateComplexUniqueId() {
    const uniqueId = generateUniqueId();
    const now = new Date();
    const dateTimeString = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
    const combinedString = uniqueId + dateTimeString;
    const truncatedId = combinedString.substring(0, 9); // Limit to 16 characters
    return btoa(truncatedId); // Encode the string using Base64
}

// Check local storage on page load and generate a new complex unique ID
window.onload = function() {
    let addressData = localStorage.getItem('addressData');
    if (!addressData) {
        window.location.href = 'failed.html';
    } else {
        // Generate and save a new complex unique ID every time the page loads
        let complexUniqueId = generateComplexUniqueId();
        localStorage.setItem('uniqueId', complexUniqueId);
    }
}

// Countdown timer
let timerElement = document.getElementById('timer');
let resultElement = document.getElementById('result');
let countdown = 3;

let countdownInterval = setInterval(() => {
    countdown--;
    timerElement.textContent = countdown;

    if (countdown <= 0) {
        clearInterval(countdownInterval);
        submitForm();
    }
}, 1000);

function submitForm() {
    // Fetch data from local storage
    let addressData = JSON.parse(localStorage.getItem('addressData'));
    let uniqueId = localStorage.getItem('uniqueId');
    if (!addressData) {
        window.location.href = 'failed.html';
        return;
    }

    let data1 = addressData.fullName;
    let data2 = addressData.mobileNumber;
    let data3 = addressData.area;
    let data4 = addressData.address;
    let data5 = addressData.landmark;
    let data6 = addressData.hmc;
    let data7 = addressData.amount;
    let data8 = uniqueId;
    let data9 = 'urlcode';

    // Get today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so add 1
    const day = today.getDate();
    const paymentDate = `${year}-${month}-${day}`;

    // Google form URL
    let googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdU_z6qrgwQYtreeIuSLFh49xbrBmaqDqcNXGeyo3Q3C3_vZw/formResponse';

    // Prepare form data
    let formData = new FormData();
    formData.append('entry.854278608', data1);
    formData.append('entry.687688741', data2);
    formData.append('entry.1253851502', data3);
    formData.append('entry.129735148', data4);
    formData.append('entry.1737210649', data5);
    formData.append('entry.519165036', data6);
    formData.append('entry.912229487', data7);
    formData.append('entry.278789162', data8);
    formData.append('entry.1546171737', data9);
    
    // Submit form data
    fetch(googleFormUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    })
    .then(response => {
        // Clear old local storage data
        localStorage.removeItem('uniqueId');
        localStorage.removeItem('addressData');

        // Set new local storage data
        localStorage.setItem('uniqueId', uniqueId);
        localStorage.setItem('paymentDate', paymentDate);
        localStorage.setItem('username', data1);
        localStorage.setItem('adress', data3);
localStorage.setItem('amountx', data7);
localStorage.setItem('unit', data6);

        resultElement.textContent = 'Redirecting...';
        // Redirect to another page with unique ID
        window.location.href = 'done.html';
    })
    .catch(error => {
        // Redirect to another page with unique ID
        window.location.href = '404.html';

        
    });
}