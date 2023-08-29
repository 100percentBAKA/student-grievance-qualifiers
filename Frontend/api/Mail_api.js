// Mail api
fetch("http://localhost:2000/api/mail/" + email, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(function(res) {
    if(res.status == 200) return 1;
    else return 0;
});

fetch("http://localhost:2000/api/mail/" + email, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(function(res) {
    if(res.status == 200) return 1;
    else return 0;
});

fetch("http://localhost:2000/api/mail/" + email, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(function(res) {
    if(res.status == 200) {
        res.json().then(function(result) {
            var max = moment(now).subtract(5, 'minutes').toDate();
            var maxTime = maxTime.getHours() + ':' + maxTime.getMinutes() + ':' + maxTime.getSeconds();
            if(maxTime < result.time) {
                if(res.otp === otp) return 1;
            } else deleteOtp(email);
        });
    }
    else return 0;
});

fetch("http://localhost:2000/api/mail/" + email, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
})