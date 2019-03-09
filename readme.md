## How to record canvas activity using media recorder?
Fabric canvas provides various in build functions to draw shapes within canvas element.
Media recorder library used to record canvas element. But if you want to record activities like drawing in canvas then there is not any library for that.

To record activities you need to use fabric canvas and media recorder libraries at once.

Steps to create fabric canvas recording
- **Add fabric canvas javascript library to access it's functions**
- **Add media recorder functions to record video**
- **Create canvas object and refer it for fabric canvas drawing functions**	
- **Start canvas recording by using below media recorder function**

    $(document).on('click', '#recordbtn', function(){	     
        startRecording();
    });

    function startRecording()
    {
        let options = {mimeType: 'video/webm'};
        recordedBlobs = [];
        try {
            mediaRecorder = new MediaRecorder(stream, options);
        } catch (e0) {
            console.log('Unable to create MediaRecorder with options    Object: ', e0);
            try {
                options = {mimeType: 'video/webm,codecs=vp9'};
                mediaRecorder = new MediaRecorder(stream, options);
            } catch (e1) {
                console.log('Unable to create MediaRecorder’);
                try {
                    options = 'video/vp8'; // Chrome 47
                    mediaRecorder = new MediaRecorder(stream, options);
                } catch (e2) {
                    alert('MediaRecorder is not supported by this browser');
                    return;
                }
            }
        }
        mediaRecorder.onstop = handleStop;
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start(100); // collect 100ms of data
    }

- **Stop recording and attach recorded video in video element**

    $(document).on('click', '#stop_record', function(){
        mediaRecorder.stop();
    });

    function handleStop(event) {
        superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
        video = document.getElementById('canvas_video');
        video.src = window.URL.createObjectURL(superBuffer);
        var reader = new FileReader();
        reader.readAsDataURL(superBuffer);
        reader.onloadend = function() {
            var base64data = reader.result;
            video.setAttribute('data-base64',base64data)
        }
    }

    function handleDataAvailable(event) {
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    }
    
- **View or download video from video element**

For more you can refer above example.

[You can check full detail about it. you can open our blog](https://github.com/logisticinfotech/laravel-Fabric-js-canvas-drawing-with-recording-video).