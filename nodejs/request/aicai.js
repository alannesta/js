const request = require('request');

const url = 'https://yq.aicai.com/sportdata/f?agentId=2335059&platform=wap&version=5.4.0&appVersion=5.3.0';
// const url = 'https://yq.aicai.com/sportdata/f';

const formData = {apiName: "getMatchStanding", matchId: 3114291, timestamp: new Date().getTime(), verifyStr: ""};

cookieStr = "UM_distinctid=16ef363692b613-05cf684eeccd08-3960720b-1fa400-16ef363692c625; AUM=dgnRZ7PV3Fvc8l7KkkRrePcXjN5nt-yqlWtWpTno5j7lw; VUID=0634FE863110418091F04DD4E981EDC1; NAGENTID=0; Hm_lvt_49024937a7f937de669432245102dac6=1576041405,1578260973; jcobroute=5f48e16de86946a841e3d776be3013d6; JSESSIONID=27A09276579C14E17AAC5D75B0573526.c219; CNZZDATA3538029=cnzz_eid%3D2124619296-1578360808-https%253A%252F%252Fwww.aicai.com%252F%26ntime%3D1578409410; Hm_lpvt_49024937a7f937de669432245102dac6=1578413914";

const j = request.jar();
const cookie = request.cookie(cookieStr);
j.setCookie(cookie, url);

options = {
    url: url,
    headers: {
        'Host': 'yq.aicai.com',
        'Origin': 'https://yq.aicai.com',
        'Referer': 'https://yq.aicai.com/matchPlanDetail/1763573-1/room',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    jar: j,
    form: formData
};

request.post(options, function(err, resp, body) {
// request.post(url, {form: formData}, function (err, resp, body) {
    if (err) {
        console.log(err);
    }
    console.log(resp.statusCode);

    console.log(body);
});