var canvas = new fabric.Canvas("video-canvas", {selection: false, backgroundImage:  "img/blank-bg.jpeg"});
var circle, isDown, origX, origY, isDownAngle, line, dashedLine;
var freeDrawing = true;
var isLineDrawing = isCircleDrawing = isAngleDrawing = "0";
var elementStrokeWidth = 4;
// current unsaved state
var state;
// past states
var undo = [];
// reverted states
var redo = [];

function save() {
    // clear the redo stack
    redo = [];
    $('#redo').prop('disabled', true);
    // initial call won't have a state
    if (state) {
        undo.push(state);
        $('#undo').prop('disabled', false);
    }
    state = JSON.stringify(canvas);
}

function replay(playStack, saveStack, buttonsOn, buttonsOff) {
    saveStack.push(state);
    state = playStack.pop();
    var on = $(buttonsOn);
    var off = $(buttonsOff);
    // turn both buttons off for the moment to prevent rapid clicking
    on.prop('disabled', true);
    off.prop('disabled', true);
    canvas.clear();

    canvas.loadFromJSON(state, function() {
        canvas.renderAll();
        // now turn the buttons back on if applicable
        on.prop('disabled', false);
        
        if (playStack.length) {
            off.prop('disabled', false);
        }
    });
}

// undo and redo buttons
$('#undo').click(function() {
    $("#mov_btn").trigger('click'); 
        replay(undo, redo, '#redo', this);
});
$('#redo').click(function() {
    replay(redo, undo, '#undo', this);
})

function changeCanvasHw(width,height){
    canvas.setWidth(width);
    canvas.setHeight(height);
    // save initial state
    save();
    // register event listener for user's actions
    canvas.on('object:modified', function() {
      save();
    });
}
function preventLeaving(e) {
    var activeObject = e.target;
    activeObject.lockUniScaling = true;
    activeObject.hasControls = activeObject.hasBorders = false;
    
    if ((activeObject.get('left') - (activeObject.get('width') * activeObject.get('scaleX') / 2) < 0))
        activeObject.set('left', activeObject.get('width') * activeObject.get('scaleX') / 2);
    if ((activeObject.get('top') - (activeObject.get('height') * activeObject.get('scaleY') / 2) < 0))
        activeObject.set('top', activeObject.get('height') * activeObject.get('scaleY') / 2);
    if (activeObject.get('left') + (activeObject.get('width') * activeObject.get('scaleX') / 2) > canvas.getWidth())
    {
        var positionX = canvas.getWidth() - (activeObject.get('width') * activeObject.get('scaleX')) / 2;
        activeObject.set('left', positionX > canvas.getWidth() / 2 ? positionX : canvas.getWidth() / 2);
    }
    if (activeObject.get('top') + (activeObject.get('height') * activeObject.get('scaleY') / 2) > canvas.getHeight())
    {
        var positionY = canvas.getHeight() - (activeObject.get('height') * activeObject.get('scaleY') / 2);
        activeObject.set('top', positionY > canvas.getHeight() / 2 ? positionY : canvas.getHeight() / 2);
    }

    //below just prevention for object from getting width or height greater than canvas width and height
    if (activeObject.get('width') * activeObject.get('scaleX') > canvas.getWidth())
    {
        activeObject.set('scaleX', canvas.getWidth() / activeObject.get('width'));
    }
    if (activeObject.get('height') * activeObject.get('scaleY') > canvas.getHeight())
    {
        activeObject.set('scaleY', canvas.getHeight() / activeObject.get('height'));
    }
    save();
}

canvas.observe('object:moving', preventLeaving);
canvas.observe('object:scaling', preventLeaving);
canvas.observe('object:selected', preventLeaving);

$(document).on('click', '.line-drawing-tools', function (event) {
    event.preventDefault();
    isLineDrawing = "0";
    isCircleDrawing = "0";
    isAngleDrawing = "0";

        canvas.selection = false;
        canvas.forEachObject(function(o) {
            o.selectable = false;
        });

        var btnValue = $(this).data("value") || "";
        if (btnValue != "") {
            if (btnValue == "line") {
                isLineDrawing = "1";
                drawLine();
            }
            else if (btnValue == "dashed-line") {
                isLineDrawing = "1";
                drawDashedLine();
            }
            else if (btnValue == "circle") {
                isCircleDrawing = "1";
                drawCircle();
            }
            else if (btnValue == "clear") {
                canvas.clear();
                canvas.setBackgroundImage('img/blank-bg.jpeg',canvas.renderAll.bind(canvas))
            }
            else if (btnValue == "move") {
                canvas.selection = true;
                canvas.forEachObject(function(o) {
                    o.selectable = true;
                  });
                changeDrawing();
            }
        // }
        $(".line-drawing-tools").removeClass('active');
        $(this).addClass('active');
    }
});

function changeDrawing() {
    canvas.isDrawingMode = false;
    canvas.selection = true;
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');
    canvas.forEachObject(function (o) {
        o.cornerSize = 6;
        o.setCoords()
    })
}

function drawLine() {
    canvas.on('mouse:down', function (o) {
        if (isLineDrawing == "1") {
            canvas.selection = false;
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            var points = [pointer.x, pointer.y, pointer.x, pointer.y];

            line = new fabric.Line(points, {
                strokeWidth: elementStrokeWidth,
                fill: 'black',
                stroke: 'black',
                strokeWidth: 2,
                originX: 'center',
                originY: 'center'
            });
            canvas.add(line);
            save();
        }
    });

    canvas.on('mouse:move', function (o) {
        if (!isDown)
            return;
        if (isLineDrawing == "1") {
            var pointer = canvas.getPointer(o.e);
            line.set({x2: pointer.x, y2: pointer.y});
            canvas.renderAll();
        }
    });

    canvas.on('mouse:up', function (o) {
        isDown = false;
    });
}

function drawDashedLine() {
    canvas.on('mouse:down', function (o) {
        if (isLineDrawing == "1") {
            canvas.selection = false;
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            var points = [pointer.x, pointer.y, pointer.x, pointer.y];

            line = new fabric.Line(points, {
                strokeWidth: elementStrokeWidth,
                fill: 'black',
                strokeDashArray: [7, 5],
                stroke: 'black',
                strokeWidth: 2,
                originX: 'center',
                originY: 'center'
            });
          
            canvas.add(line);
            save();
        }
    });

    canvas.on('mouse:move', function (o) {
        if (!isDown)
            return;
        if (isLineDrawing == "1") {
            var pointer = canvas.getPointer(o.e);
            line.set({x2: pointer.x, y2: pointer.y});
            canvas.renderAll();
        }
    });

    canvas.on('mouse:up', function (o) {
        isDown = false;
    });

}

function drawCircle() {
    canvas.on('mouse:down', function (o) {
        if (isCircleDrawing == "1") {
            isDown = true;
            canvas.selection = false;
            var pointer = canvas.getPointer(o.e);
            origX = pointer.x;
            origY = pointer.y;
            circle = new fabric.Circle({
                left: pointer.x,
                top: pointer.y,
                originX: 'left',
                originY: 'top',
                radius: pointer.x - origX,
                angle: 0,
                fill: '',
                stroke: 'black',
                strokeWidth: elementStrokeWidth,
            });
            canvas.add(circle);
        }
    });

    canvas.on('mouse:move', function (o) {
        if (isCircleDrawing == "1") {
            if (!isDown)
                return;
            var pointer = canvas.getPointer(o.e);
            var radius = Math.max(Math.abs(origY - pointer.y), Math.abs(origX - pointer.x)) / 2;
            if (radius > circle.strokeWidth) {
                radius -= circle.strokeWidth / 2;
            }
            circle.set({radius: radius});

            if (origX > pointer.x) {
                circle.set({originX: 'right'});
            } else {
                circle.set({originX: 'left'});
            }
            if (origY > pointer.y) {
                circle.set({originY: 'bottom'});
            } else {
                circle.set({originY: 'top'});
            }
            canvas.renderAll();
        }
    });

    canvas.on('mouse:up', function (o) {
        isDown = false;
    });
}