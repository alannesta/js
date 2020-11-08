const request = require('request').defaults({jar: true});

request.post('https://soccer.hupu.com/schedule/schedule.server.php', {form: {"d": "20191101", "type": "m", "league_id": 5}}, async(error, response, body) => {
    if (error) {
        console.log(error)
    } else {
        console.log(body)
    }
});
