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
    

document.addEventListener('DOMContentLoaded', () => {
    if (getCookie("email") == null) {
        window.location.href = "../../";
    } else {
        fetch("http://localhost:2000/api/user/" + getCookie("email"), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (res) {
            if (res.status == 200) {
                res.json().then(function (result) {
                    console.log(result);
                    setCookie("firstname", result.first_name, 365);
                    setCookie("lastname", result.last_name, 365);
                });
            } else {
                deleteCookie("email");
                deleteCookie("firstname");
                deleteCookie("lastname");
                window.location.href = "../../";
            }
        });
    }

    // Elements related to form input
    const greTitle = document.querySelector('.title-gre-input');
    const tagDropdown = document.querySelector(".gre-selector");
    const greDetail = document.querySelector(".gre-detail");

    // Elements related to form next button
    const greTitleNextBtn = document.querySelector('.title-gre-next-btn');
    const tagNextBtn = document.querySelector(".tag-drop-next");
    const detailNextBtn = document.querySelector(".gre-detail-next");
    const finalSubmitBtn = document.querySelector('.final-gre-submit-btn');
    const grievanceForm = document.getElementById("")


    // Variables to store the inputs from the form
    // File attach and Image section not implemented
    let title = '',
        tag = '',
        detail = '';

    // Handling title next button
    greTitleNextBtn.addEventListener(
        'click', () => {
            title = greTitle.value;
        }
    );

    // Handling tag next button
    tagNextBtn.addEventListener(
        'click', () => {
            tag = tagDropdown.value;
        }
    );

    // Handling the description button
    detailNextBtn.addEventListener(
        'click', () => {
            detail = greDetail.value;
        }
    );

    // Handling the final submit button
    finalSubmitBtn.addEventListener(
        'click', () => {
            checkInputField();
            // ***** Handling the Backend here *****
        }
    );


    function checkInputField() {
        // Checking if the title input is left empty
        if (title === '') {
            alert('Cannot leave the input field empty');
        }

        // Checking if the detail text area is left empty
        if (detail === '') {
            alert("Please enter your grievance details");
        }

        // Checking if the detail < 20
        if (detail.length < 20) {
            alert(`Your Grievance must be atleast of length ${20}`);
        }
    }
});