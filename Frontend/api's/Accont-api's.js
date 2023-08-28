export function register(emailValue, passwordValue, firstNameValue, lastNameValue, isAdmin) {
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
            is_admin: isAdmin
        })
    })
    .then(function(res) {
        if(res.status == 200) return 1;
        else return "internal server error";
    });
}

export function login(emailValue, passwordValue) {
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
        if(res.status === 200) {
            res.json().then(function(result) {
                if(result) return 1;
                else return 0;
            });
        } else if(res.status === 400) return -1;
        else alert("Internal server error");
    })
}

export function isEmailAvailable(emailValue) {
    fetch("http://localhost:2000/api/user/check/" + emailValue, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(res) {
        if(res.status === 200) {
            res.json().then(function(result) {
                if(result) return 1;
                else return 0;
            });
        }
        return "Internal server error";
    })
}

export function isAdmin(emailValue) {
    fetch("http://localhost:2000/api/user/role/" + emailValue, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(res) {
        if(res.status === 200) {
            res.json().then(function(result) {
                if(result) return 1;
                else return 0;
            });
        }
        else if(res.status === 400) return -1;
        return "Internal server error";
    })
}

export function getAccount(emailValue) {
    fetch("http://localhost:2000/api/user/" + emailValue, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(res) {
        if(res.status === 200) {
            res.json().then(function(result) {
                return result;
            });
        } else if(res.status === 400) return -1;
        return "Internal server error";
    })
}