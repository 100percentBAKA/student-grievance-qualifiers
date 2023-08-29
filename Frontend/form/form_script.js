document.addEventListener('DOMContentLoaded', () => {
    // Elements related to form input
    const greTitle = document.querySelector('.title-gre-input');
    const tagDropdown = document.querySelector(".gre-selector");
    const greDetail = document.querySelector(".gre-detail");

    // Elements related to form next button
    const greTitleNextBtn = document.querySelector('.title-gre-next-btn');
    const tagNextBtn = document.querySelector(".tag-drop-next");
    const detailNextBtn = document.querySelector(".gre-detail-next");
    const finalSubmitBtn = document.querySelector('.final-gre-submit-btn');


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