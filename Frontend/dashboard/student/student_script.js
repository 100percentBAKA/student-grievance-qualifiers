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

    fetch("http://localhost:2000/api/category/top", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (res) {

        });

    const popularity = ["Academics", "Finance", "Timetable", "Ragging"];

    // Elements related to tracker btns
    const checkBtn = document.querySelector('.gre-div-check');
    const progressCheckBtn = document.querySelector('.gre-progress-check');

    // Elements related to ctns
    const progressCtn = document.querySelector('.progress-ctn');
    const checkCtn = document.querySelector('.checkbox-ctn');

    // Elements related to progress checkboxes and vertical progress bar
    const checkboxes = document.querySelectorAll(".progress-checkbox input[type='checkbox']");
    const progressElements = document.querySelectorAll(".progress-ctn .progress");

    checkBtn.addEventListener(
        'click', () => {
            progressCtn.classList.toggle('hidden');
            checkCtn.classList.toggle('hidden');
        }
    );

    progressCheckBtn.addEventListener(
        'click', () => {
            checkboxes.forEach((checkbox, index) => {
                if (checkbox.checked) {
                    while (index >= 0) {
                        progressElements[index].style.backgroundColor = 'blue';
                        // console.log(`${index} checked`);
                        index--;
                    }
                }
                else {
                    while (index < progressElements.length) {
                        progressElements[index++].style.backgroundColor = '#555';
                        // console.log(`${index} unchecked`);
                        index++;
                    }
                }

                if (checkboxes[checkboxes.length - 1].checked) {
                    progressElements.forEach((element) => {
                        element.style.backgroundColor = 'green';
                    });
                }
            });
        }
    );
});