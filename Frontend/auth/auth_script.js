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
    const signupContainer = document.querySelector('.signup');
    const otpContainer = document.querySelector('.otp-ctn');
    const termsCheckbox = document.querySelector('[name="agree-terms"]');
    const signupForm = document.getElementById('signup-form')

    // Elements related to OTP
    const otpInputs = document.querySelectorAll('.otp');
    const otpVerifyBtn = document.querySelector('.otp-verify-btn');

    // Event listener for signup form submission
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const emailValue = signupEmail.value;
        const passwordValue = signupPass.value;
        const retypePasswordValue = signupRePass.value;
        const firstNameValue = firstName.value;
        const lastNameValue = lastName.value;

        // Regex for college email and password verification
        const regexEmail = /^1RN(19|20|21|22)(CS|IS|AI|DS|EE|EC|CI|ME)(00[1-9]|0[1-9]\d|1\d{2}|2[0-1]\d|220)\.\w+@GMAIL\.COM$/;
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // validating signup form
        if(emailValue == "" || passwordValue == "" || retypePasswordValue == "" || firstNameValue == "" || lastNameValue == "") {
            alert('Please enter all input fields');
            return;
        }
        if (!regexEmail.test(emailValue.toUpperCase())) {
            alert('Please enter a valid college email address.');
            return;
        }
        if(!regexPassword.test(passwordValue)) {
            alert('Passord must contain:' + '\n' +
            'a minimum of 8 characters' + '\n' +
            'one lowercase' + '\n' +
            'one uppercase' + '\n' +
            'one digit' + '\n' +
            'one special character - @$!%*?&'
            );
            return;
        }
        if(passwordValue != retypePasswordValue) {
            alert('Passwords are not matching');
            return;
        }
        if (!termsCheckbox.checked) {
            alert('Please agree to the Terms and Conditions.');
            return;
        }

        
        
        fetch("http://localhost:2000/api/user/check/" + emailValue, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(res) {
            if(res.status == 200) {
                res.json().then(function(result) {
                    if(result) {
                        fetch("http://localhost:2000/api/mail/" + emailValue, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(function(res) {
                            if(res.status == 200) {
                                signupContainer.classList.add('hidden');
                                otpContainer.classList.remove('hidden');
                                
                                otpInputs.forEach((input, index) => {
                                    input.addEventListener('input', (event) => {
                                        const inputValue = event.target.value;
                                        if (inputValue.length == 1) {
                                            if (index < otpInputs.length - 1) otpInputs[index + 1].focus();
                                            else otpVerifyBtn.focus();
                                        }
                                    });
                            
                                    input.addEventListener('keydown', (event) => {
                                        if (event.key === 'Backspace' && input.value === '' && index > 0) {
                                            otpInputs[index - 1].focus();
                                        }
                                    });
                                });

                                otpVerifyBtn.addEventListener('click', () => {
                                    const otpValue = Array.from(otpInputs).map(input => input.value).join('');
                                    if (otpValue.length !== otpInputs.length) alert("Please fill all the fields.");
                                    else {
                                        fetch("http://localhost:2000/api/mail/" + emailValue, {
                                            method: 'GET',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        })
                                        .then(function(res) {
                                            if(res.status == 200) {
                                                res.json().then(function(result) {
                                                    console.log(result.otp + " " + otpValue);
                                                    if(result.otp == otpValue) {
                                                        fetch("http://localhost:2000/api/mail/" + emailValue, {
                                                            method: 'DELETE',
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            }
                                                        })

                                                        fetch("http://localhost:2000/api/user/register", {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            },
                                                            body: JSON.stringify({
                                                                email: emailValue,
                                                                password: passwordValue,
                                                                first_name: firstNameValue,
                                                                last_name: lastNameValue,
                                                                is_admin: false
                                                            })
                                                        })
                                                        .then(function(res) {
                                                            if(res.status == 200) {
                                                                alert('Email registered');
                                                                setTimeout(() => {
                                                                    window.location.href = "../dashboard/student/student.html"
                                                                }, 500);
                                                            }
                                                            else return "internal server error";
                                                        });
                                                    } else alert("Invalid otp")
                                                });
                                            }
                                            else alert("OTP Expired");
                                        });
                                    }
                                });
                            }
                            else alert("Invalid email address");
                        });
                    }
                    else alert("Email already registered");
                });
            }
            return "Internal server error";
        })
    });

    // Elements related to Login Form
    const loginForm = document.getElementById('login-form');
    const loginUsername = document.querySelector('.login-username');
    const loginPassword = document.querySelector('.login-password');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const usernameValue = loginUsername.value;
        const passwordValue = loginPassword.value;

        fetch("http://localhost:2000/api/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: usernameValue,
                password: passwordValue
            })
        })
        .then(function(res) {
            if(res.status == 200) {
                res.json().then(function(result) {
                    if(result) {
                        alert("login successful");
                        setTimeout(() => {
                            window.location.href = "../dashboard/student/student.html"
                        },
                        500);
                    } else alert("Invalid credentials");
                });
            } else if(res.status === 400) alert("Email not registered");
            else alert("Internal server error");
        })
    });

    // Function to toggle login and signup containers
    function toggleLoginSignup(show, hide) {
        if (show.classList.contains('hidden')) {
            hide.classList.add('hidden');
            show.classList.remove('hidden');
        }
    }
});