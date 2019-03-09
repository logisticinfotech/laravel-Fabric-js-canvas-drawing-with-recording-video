<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Fabric Canvas Record</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

        <style>
            .col-md-4{
                border: 1px solid #d8d8d8;
                background-color: #f7f7f7;
                margin: 20px 0px 0px 20px;
            }
            .content-canvas{
                padding: 50px 0px 55px 50px;
            }
            .content-video{
                text-align: center;
                margin: 0 auto;
            }
            video{
                padding-top: 50px;
                height: 300px;
                width: 100%;
            }
            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }
            .row{
                margin-top: 50px;
            }
        </style>
    </head>
    <body>
        <div class="row justify-content-center mb-0">
            <h1>Record Fabric Canvas Drawing</h1>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-4 col-sm-12">
                <h4 class="mt-3">Draw in canvas</h4>
                <div class="content-canvas">
                    <div class="diagram-ground">
                        <canvas id="video-canvas" height="250" width="330"></canvas>
                    </div>
                    <div class="inner_tool mt-5">
                        <button type="button" class="line-drawing-tools" data-value="move" id="mov_btn">
                            <i class="fa fa-arrows" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="line-drawing-tools" data-value="line">
                            <i class="fa fa-minus"></i>
                        </button>
                        <button type="button" class="line-drawing-tools" data-value="dashed-line">
                            <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="line-drawing-tools" data-value="circle">
                            <i class="fa fa-circle-o" aria-hidden="true"></i>
                        </button>
                        <button type="button" id="undo" class="line-drawing-tools" data-value="undo">
                            <i class="fa fa-rotate-left"></i>
                        </button>
                        <button type="button" id="redo" class="line-drawing-tools" data-value="redo">
                            <i class="fa fa-rotate-right"></i>
                        </button>
                        <button type="button" id="clear" class="line-drawing-tools" data-value="clear">
                            clear
                        </button>
                        <button type="button" id="record">Record</button>  
                        <i class="fa fa-video-camera text-danger d-none" id="record_icon"></i>
                        <button type="button" class="d-none text-danger" id="stop_record">
                            Stop
                        </button>                                                                
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <h4 class="mt-3">Playback</h4>
                <div class="content-video">
                    <div class="diagram-playback ">
                        <video id="canvas_video" playsInline loop src='' controls></video>
                    </div>
                    <div class="inner_tool mt-5 text-right">
                            <button type="button" id="download">
                            <i class="fa fa-download"></i>
                        </button>
                    </div>
                </div>
            </div>    
        </div>

        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        
        <!-- canvas drawing js -->  
        <script src="js/fabric.min.js"></script>
        <script src="js/canvas.js"></script>
        <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>

    <script>
        const mediaSource = new MediaSource();
        let canvasElement,video,recordButton,stream,superBuffer,blob,url,a, stopRecordButton,imageUrl,activeSlidePreview,activeVideo,recordIcon;
        let mediaRecorder;
        let recordedBlobs;
        let sourceBuffer;
        
    </script>
    <script src="js/media-recorder.js"></script>
    </body>
</html>
