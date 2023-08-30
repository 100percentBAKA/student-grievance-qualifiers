// add one category
fetch("http://localhost:2000/api/category/add/" + category_name, {
    // Header fields
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(function (response) {
    if(response.status === 200) alert('Added');
    else if(response.status === 400) alert('Duplicate category');
    else alert('Server error');
});

// add many categories
fetch("http://localhost:2000/api/category/add-all/" + categories_count, {
    // Header fields
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: [
        {
            "category_name": "Academics"
        },
        {
            "category_name": "Assignments"
        }
    ]
})
.then(function (response) {
    if(response.status === 200) alert('Added');
    else if(response.status === 400) alert('Duplicate category');
    else alert('Server error');
});


// get 4 popular categories
fetch("http://localhost:2000/api/category/popular", {
    method: "GET",
    headers: {
        "content-type": "application/json"
    }
})
.then(function(response) {
    if(response.status === 200) {
        response.json().then(function(data) {
            console.log(data[0]);
        });
    } else alert("internal server error");
});

// get grievances by category name
fetch("http://localhost:2000/api/category/grievances/" + category_name, {
    method: "GET",
    headers: {
        "content-type": "application/json"
    }
})
.then(function(response) {
    if(response.status === 200) {
        response.json().then(function(data) {
            console.log(data[0]);
        });
    } else alert("internal server error");
});

// increase popularity by 1
fetch("http://localhost:2000/api/category/increment/" + category_name, {
    method: "PATCH",
    headers: {
        "content-type": "application/json"
    }
})
.then(function(response) {
    if(response.status === 200) console.log("updated");
    else alert("internal server error");
});