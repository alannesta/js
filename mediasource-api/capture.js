function startRecording(stream, lengthInMS) {
    const options = {
        mimeType: 'video/webm\;codecs=vp9'
    };

    var recorder = new MediaRecorder(stream, options);

    let data = [];  // recorded chunks

    recorder.ondataavailable = event => data.push(event.data);

    recorder.start();

    console.log(recorder.state + " for " + (lengthInMS / 1000) + " seconds...");

    let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = event => reject(event.name);
    });

    setTimeout(() => {
        recorder.stop();
    }, lengthInMS);

    return stopped.then(() => data);
}

function stop(stream) {
    stream.getTracks().forEach(track => track.stop());
}

function addDownloadLink(url, chunk) {
    var body = document.getElementsByTagName('body')[0];

    // append new element to page:
    var recording = document.createElement("video");
    var div = document.createElement("div");
    var download = document.createElement('a');
    // download.textContent = 'Download';

    div.style = "height: 200px; background-color: green";

    // recording.src = URL.createObjectURL(recordedBlob);
    download.href = url;
    download.id = 'download-chunk' + chunk;
    download.innerHTML = 'Download_' + chunk;
    download.download = 'chunk' + chunk + ".webm";

    div.appendChild(download);

    // body.appendChild(recording);
    body.appendChild(div);

}

function init(){

    var playbackElement = document.getElementById("video-player_html5_api");
    var videoJsPlayer = videojs('video-player_html5_api');

    var captureStream = playbackElement.captureStream();

    const segmentLength = 10 * 60 * 1000;    // split video into 10 minutes chunks;
    let chunk = 0;

    videoJsPlayer.play();

    startRecording(captureStream, segmentLength)
    .then(recordedChunks => {
        videoJsPlayer.pause();
        let recordedBlob = new Blob(recordedChunks, {type: "video/webm"});

        console.log("Successfully recorded " + recordedBlob.size + " bytes of " +
            recordedBlob.type + " media.");

        const objectUrl = URL.createObjectURL(recordedBlob);

        addDownloadLink(objectUrl, chunk);

    }).catch(err => {
        console.log('error recording: ', err);
    })

}

function abort(stream) {

}
// init();