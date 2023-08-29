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
    }
});