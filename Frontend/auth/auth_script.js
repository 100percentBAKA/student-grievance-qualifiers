document.addEventListener('DOMContentLoaded', () => {
    // Elements related to switching between login and signup and otp
    const stdLoginBtn = document.querySelector('.std-login-btn');
    const tchLoginBtn = document.querySelector('.tch-login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const loginCtn = document.querySelector('.login');
    const signupCtn = document.querySelector('.signup');
    const h2Element = document.querySelector('.login h2');
    const otpCtn = document.querySelector('.otp-ctn');

    // Event listeners for login and signup buttons
    stdLoginBtn.addEventListener('click', () => {
        h2Element.textContent = 'Login (Student)';
        toggleLoginSignup(loginCtn, signupCtn);
        otpCtn.classList.add('hidden');
    });

    tchLoginBtn.addEventListener('click', () => {
        h2Element.textContent = 'Login (Faculty)';
        toggleLoginSignup(loginCtn, signupCtn);
        otpCtn.classList.add('hidden');
    });

    signupBtn.addEventListener('click', () => {
        toggleLoginSignup(signupCtn, loginCtn);
        otpCtn.classList.add('hidden');
    });

    // Elements related to signup form
    const signupPass = document.querySelector('.signup-password');
    const signupRePass = document.querySelector('.retype-password');
    const firstName = document.querySelector('.first-name');
    const lastName = document.querySelector('.last-name');
    const signupEmail = document.querySelector('.signup-email');
    const submitBtn = document.querySelector('.submit-btn');
    const signupContainer = document.querySelector('.signup');
    const otpContainer = document.querySelector('.otp-ctn');
    const termsCheckbox = document.querySelector('[name="agree-terms"]');

    // Event listener for signup form submission
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const emailValue = signupEmail.value;
        const passwordValue = signupPass.value;
        const retypePasswordValue = signupRePass.value;
        const firstNameValue = firstName.value;
        const lastNameValue = lastName.value;

        if (!emailValue.includes('@')) {
            alert('Email must contain the "@" symbol.');
            return;
        }
        if (!termsCheckbox.checked) {
            alert('Please agree to the Terms and Conditions.');
            return;
        }

        setTimeout(() => {
            signupContainer.classList.add('hidden');
            otpContainer.classList.remove('hidden');
        }, 500);
    });

    // Elements related to Login Form
    const loginBtn = document.querySelector('.login-btn');
    const loginUsername = document.querySelector('.login-username');
    const loginPassword = document.querySelector('.login-password');

    loginBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const usernameValue = loginUsername.value;
        const passwordValue = loginPassword.value;

        // Function checks the validity of password and username
        const isValid = checkCredentialsValidity(usernameValue, passwordValue);

        if (isValid) {
            console.log('Credentials are valid. Proceed to next steps.');
        } else {
            console.log('Invalid credentials. Please check your username and password.');
        }
    });


    function checkCredentialsValidity(username, password) {
        return false;
    }

    // Function to toggle login and signup containers
    function toggleLoginSignup(show, hide) {
        if (show.classList.contains('hidden')) {
            hide.classList.add('hidden');
            show.classList.remove('hidden');
        }
    }
});
