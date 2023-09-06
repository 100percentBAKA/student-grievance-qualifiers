// set cookie
function setCookie(name, value, daysToLive) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/;`;
}

// get cookie
function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    else return null;
}

// delete cookie
function deleteCookie(name) {
    setCookie(name, null, null);
}

function logout() {
    deleteCookie("email");
    deleteCookie("firstname");
    deleteCookie("lastname");
    deleteCookie("id");
    window.location.href = "../../";
}

// if (getCookie("email") == null) logout();
// else {
//     fetch("http://localhost:2000/api/user/" + getCookie("email"), {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(function (res) {
//             if (res.status == 200) {
//                 res.json().then(function (result) {
//                     setCookie("firstname", result.first_name, 365);
//                     setCookie("lastname", result.last_name, 365);
//                     setCookie("id", result.id, 365);
//                 });
//             } else logout();
//         });
// }

document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:2000/api/category/popular", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (res) {
        if(res.status === 200) {
            res.json().then(function(data) {
                for(i = 0; i < 4; i++) {
                    document.getElementById(`${i + 1}`).innerHTML = data[i].substring(0, 8) + "..";
                }
            });
        }
    });

    // Drop down menu handler 
    const profileBtn = document.querySelector('.icon-ctn');
    const dropDown = document.querySelector(".drop-down-wrapper");
    const screenOverlay = document.querySelector(".screen-overlay");


    // Elements related to drop down menu
    const nameDropdown = document.querySelector(".drop-down-name");
    const emailDropdown = document.querySelector(".drop-down-email");

    profileBtn.addEventListener("click", () => {
        dropDown.classList.toggle("hidden");
        screenOverlay.classList.toggle("hidden");

        // setting cookies for drop down menu
        const firstName = getCookie("firstname");
        const lastName = getCookie("lastname");

        const name = `${firstName} ${lastName}`;
        const email = getCookie("email");

        nameDropdown.textContent = name;
        emailDropdown.textContent = email;
    });

    let student_email = "1rn21cs044.mohith@gmail.com";
    fetch("http://localhost:2000/api/grievance/student/" + getCookie('email'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (response) {        
        if(response.status === 200) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else if(response.status === 400) alert("No grievances posted yet");
        else alert('Server error');
    });

});