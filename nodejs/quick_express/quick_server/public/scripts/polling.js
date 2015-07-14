var now, xhr = null;
function polling(url){
    if (xhr !== null) {
        return;
    }
    xhr = new XMLHttpRequest();
    now = Date.now();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4) {
            console.log('time elapsed: ' + (Date.now() - now));
            console.log(xhr.response);
            xhr.onreadystatechange = null;
            xhr = null;
            setTimeout(function() {
                polling(url);
            }, 2000);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
};