function stream(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var now = Date.now();
        if(xhr.readyState == 4) {
            console.log('time elapsed: ' + (Date.now() - now));
            console.log(xhr.response);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}