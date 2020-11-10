class VideoRecorder {
    constructor() {
        this.chunk = 0;     // calling start will increase the chunk count
        this.recorder = null;
        this.recordedData = []; // recorded bytes
    }

    // avgle
    getStreamSource() {
        const playbackElement = document.getElementById("video-player_html5_api");
        const videoJsPlayer = videojs('video-player_html5_api');

        const captureStream = playbackElement.captureStream();

        return new StreamSource(captureStream, videoJsPlayer);
    }

    // test demo
    // getStreamSource() {
    //     const playbackElement = document.getElementById("playback");
    //     // const videoJsPlayer = videojs('video-player_html5_api');
    //
    //     const captureStream = playbackElement.captureStream();
    //
    //     const streamSource = new StreamSource(captureStream, playbackElement);
    //
    //     return streamSource;
    // }

    start() {

        const streamSource = this.getStreamSource();

        const segmentLengthMS = 10 * 60 * 1000;    // split video into 10 minutes chunks;
        const options = {
            mimeType: 'video/webm\;codecs=vp9'
        };

        this.chunk++;

        streamSource.videoController.play();   // start the player

        this.recorder = new MediaRecorder(streamSource.stream, options);

        let data = [];  // recorded chunks

        this.recorder.ondataavailable = event => data.push(event.data);
        this.recorder.onerror = event => {
            streamSource.videoController.pause();
        };

        this.recorder.onstop = event => {
            // pause the video
            streamSource.videoController.pause();

            let recordedBlob = new Blob(data, {type: "video/webm"});

            console.log("Successfully recorded " + recordedBlob.size + " bytes of " +
                recordedBlob.type + " media.");

            const objectUrl = URL.createObjectURL(recordedBlob);
            console.log('object url: ', objectUrl);

            this.addDownloadLink(objectUrl, this.chunk);
        };

        this.recorder.start();

        console.log(this.recorder.state + " for " + (segmentLengthMS / 1000) + " seconds...");

        setTimeout(() => {
            try {
                this.recorder.stop();
            } catch (err) {
                console.log(err);
            }
        }, segmentLengthMS);
    }

    stop() {
        this.recorder.stop();
    }

    addDownloadLink(url, chunk) {
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
}

class StreamSource {
    constructor(stream, videoController) {
        this.videoController = videoController;  // control video playback
        this.stream = stream;
    }
}

// usage

// kaka = new VideoRecorder();
// kaka.start();
// kaka.stop();
// $('#download-chunk1')[0].click();
