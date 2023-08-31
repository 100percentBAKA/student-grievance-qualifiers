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

if (getCookie("email") == null) logout();
else {
    fetch("http://localhost:2000/api/user/" + getCookie("email"), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (res) {
        if (res.status == 200) {
            res.json().then(function (result) {
                setCookie("firstname", result.first_name, 365);
                setCookie("lastname", result.last_name, 365);
                setCookie("id", result.id, 365);
            });
        } else logout();
    });
}

document.addEventListener('DOMContentLoaded', () => {    
    const popularity = [];
    fetch("http://localhost:2000/api/category/top", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (res) {
        if(res.status === 200) {
            res.json().then(function(data) {
                popularity = data;
            });
        }
    });

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

    // Elements related to drop down menu
    const dropDownCtn = document.querySelector('.drop-down-wrapper');
    const name = document.querySelector('.drop-down-name');
    const menuEmail = document.querySelector('.menu-email');

    // Profile btn element 
    const profileBtn = document.querySelector('.icon-ctn');

    // Overlay element
    const overlay = document.querySelector('.screen-overlay');

    profileBtn.addEventListener(
        'click', () => {
            dropDownCtn.classList.toggle('hidden');
        }
    );

    // getting profile with cookies 
    name.textContent = getCookie('firstname') + '  ' + getCookie('lastname');
    menuEmail.textContent = "Email: " + getCookie('email');

    // Handling of drop down menu, profile btn

        // Left container element of student.html
        const leftContainer = document.querySelector('.left-ctn');

        // Function to create Dynamic elements in student.html
        function createDynamicContainer(title, tag, detail) {
            const dynamicDiv = document.createElement('div');
            dynamicDiv.className = 'dynamic-content gre-div-check';
    
            const dynamicDivCtn = document.createElement('div');
            dynamicDivCtn.className = 'dynamic-content-ctn';
    
            const titleTagContentDiv = document.createElement('div');
            titleTagContentDiv.className = 'title-tag-content';
    
            const titleContent = document.createElement('h3');
            titleContent.textContent = title;
            const tagContent = document.createElement('p');
            tagContent.textContent = tag;
    
            titleTagContentDiv.appendChild(titleContent);
            titleTagContentDiv.appendChild(tagContent);
    
            const pElement = document.createElement('p');
            pElement.textContent = detail;
    
            dynamicDiv.appendChild(dynamicDivCtn);
            dynamicDivCtn.appendChild(titleTagContentDiv);
            dynamicDivCtn.appendChild(pElement);
    
            leftContainer.appendChild(dynamicDiv);
        }
});