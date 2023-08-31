// add grievance
fetch("http://localhost:2000/api/grievance/add/", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        "title": "Title of the Grievance",
        "description": "Description of the Grievance",
        "status": 1,
        "student": {
            "id": 1
        },
        "faculty": [
            {
                "id": 2
            }
        ],
        "categories": [
            {
                "id": 1
            },
            {
                "id": 2
            }
        ]
    }
})
.then(function (response) {
    if(response.status === 200) alert('Added');
    else alert('Server error');
});

// get grievance
fetch("http://localhost:2000/api/grievance/" + grievance_id, {
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
    } else if(response.status === 400) alert("Grievance not found, might have deleted by user");
    else alert('Server error');
});

// get all grievances of a student
fetch("http://localhost:2000/api/grievance/student/" + student_email, {
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

// get popular grievances
fetch("http://localhost:2000/api/grievance/popular", {
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

// increase popularity of grievance
fetch("http://localhost:2000/api/grievance/increment/" + grievance_id, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(function (response) {        
    if(response.status === 200) console.log("updated");
    else alert('Server error');
});

// delete grievance
http://localhost:2000/api/grievance/3
fetch("http://localhost:2000/api/grievance/" + grievance_id, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(function (response) {
    if(response.status === 200) console.log("deleted");
    else if(response.status === 400) alert("No grievances posted yet");
    else alert('Server error');
});