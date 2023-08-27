const stdLoginBtn = document.querySelector('.std-login-btn');
const tchLoginBtn = document.querySelector('.tch-login-btn');
const signupBtn = document.querySelector('.signup-btn');
const loginCtn = document.querySelector('.login');
const signupCtn = document.querySelector('.signup');

const h2Element = document.querySelector('.login h2');

stdLoginBtn.addEventListener('click', () => {

    h2Element.textContent = 'Login (Student)';

    if (loginCtn.classList.contains('hidden')) {
        signupCtn.classList.add('hidden');
        loginCtn.classList.remove('hidden');
    }
});

tchLoginBtn.addEventListener('click', () => {

    h2Element.textContent = 'Login (Faculty)';

    if (loginCtn.classList.contains('hidden')) {
        signupCtn.classList.add('hidden');
        loginCtn.classList.remove('hidden');
    }
});

signupBtn.addEventListener('click', () => {
    if (signupCtn.classList.contains('hidden')) {
        loginCtn.classList.add('hidden');
        signupCtn.classList.remove('hidden');
    }
});
