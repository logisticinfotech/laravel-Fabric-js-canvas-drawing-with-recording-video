'use strict';

mediaSource.addEventListener('sourceopen', handleSourceOpen, false);

canvasElement = document.getElementById('video-canvas');

video = document.getElementById('canvas_video');

recordButton = document.getElementById('record');
stopRecordButton = document.getElementById('stop_record');
recordIcon = document.getElementById('record_icon')
stream = canvasElement.captureStream(); // frames per second

function handleSourceOpen(event) {
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function handleStop(event) {
  superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
  video.src = window.URL.createObjectURL(superBuffer);
  var reader = new FileReader();
  reader.readAsDataURL(superBuffer); 
  reader.onloadend = function() {
      var base64data = reader.result;
      video.setAttribute('data-base64',base64data)
  }
}

$(document).on('click', '#record', function(){
  if (recordButton.textContent=='Record') {
    stopRecordButton.className = "text-danger";
    recordIcon.className="fa fa-video-camera text-danger"
    startRecording();
  }
});

$(document).on('click', '#stop_record', function(){
    stopRecording();
    recordButton.className = "";
    stopRecordButton.className = "d-none";
    recordIcon.className="d-none";
});

function startRecording() {
  let options = {mimeType: 'video/webm'};
  recordedBlobs = [];
  try {
    mediaRecorder = new MediaRecorder(stream, options);
  } catch (e0) {
    console.log('Unable to create MediaRecorder with options Object: ', e0);
    try {
      options = {mimeType: 'video/webm,codecs=vp9'};
      mediaRecorder = new MediaRecorder(stream, options);
    } catch (e1) {
      console.log('Unable to create MediaRecorder with options Object: ', e1);
      try {
        options = 'video/vp8'; // Chrome 47
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e2) {
        alert('MediaRecorder is not supported by this browser.\n\n' +
          'Try Firefox 29 or later, or Chrome 47 or later, ' +
          'with Enable experimental Web Platform features enabled from chrome://flags.');
        console.error('Exception while creating MediaRecorder:', e2);
        return;
      }
    }
  }
  recordButton.className = "d-none";
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(100); // collect 100ms of data
}

function stopRecording() {
  mediaRecorder.stop();
}

$(document).on('click', '#download', function(){
  blob = new Blob(recordedBlobs, {type: 'video/webm'});
  url = window.URL.createObjectURL(blob);
  a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'recording.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
});