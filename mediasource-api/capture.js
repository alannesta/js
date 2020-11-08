function startRecording(stream, lengthInMS) {
    let recorder = new MediaRecorder(stream);
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

function init(){

    var playbackElement = document.getElementById("video-player_html5_api");
    var videoJsPlayer = videojs('video-player_html5_api');

    var captureStream = playbackElement.captureStream();
    videoJsPlayer.play();

    startRecording(captureStream, 60 * 1000)
    .then(recordedChunks => {
        videoJsPlayer.pause();
        let recordedBlob = new Blob(recordedChunks, {type: "video/webm"});
        console.log("Successfully recorded " + recordedBlob.size + " bytes of " +
            recordedBlob.type + " media.");

        var body = document.getElementsByTagName('body')[0];
        // append new element to page:
        var recording = document.createElement("video");
        var download = document.createElement('a');
        // download.textContent = 'Download';

        recording.src = URL.createObjectURL(recordedBlob);
        download.href = recording.src;
        download.innerHTML = 'download';
        download.download = "RecordedVideo.webm";

        body.appendChild(recording);
        body.appendChild(download);


    }).catch(err => {
        console.log('error recording: ', err);
    })

}
// init();