function polling(url){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4) {
            console.log(xhr.responseText);
            xhr.onreadystatechange = null;
            console.log(xhr.response);
            polling(url);
        }
    };

    xhr.open('GET', url, true);
};