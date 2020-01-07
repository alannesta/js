const request = require('request').defaults({jar: true});

const url = 'https://yq.aicai.com/sportdata/f?agentId=2335059&platform=wap&version=5.4.0&appVersion=5.3.0';
// const url = 'http://jcob-daily-v2.ttyingqiu.com/sportdata/f?agentId=2335059&platform=wap&version=5.4.0&appVersion=5.3.0';

const formData = {apiName: "getMatchStanding", matchId: 3114291, timestamp: new Date().getTime(), verifyStr: ""};

cookieStr = "NAGENTID=2335205;" +
    " JSESSIONID=2899939FFFD0F4C5AACF1DA0A89577BD.c219; jcobroute=5f48e16de86946a841e3d776be3013d6";

const j = request.jar();
const cookie = request.cookie(cookieStr);
j.setCookie(cookie, url);

options = {
    url: url,
    json: formData
};

request.post(options, function(err, resp, body) {
// request.post(url, {form: formData}, function (err, resp, body) {
    if (err) {
        console.log(err);
    }
    console.log(resp.statusCode);

    console.log(body);
});