function countAngle(theta){
    if (theta < 0.0) {
        theta += 360.0;
    }
    if (theta > 90 && theta <= 180) {
        theta = 180 - theta;
    }
    else if (theta > 180 && theta <= 270) {
         theta = theta - 180;
    }
    else if (theta > 270 && theta <= 360) {
       theta = 360 - theta;
    }
    else if (theta > 360) {
       theta = theta - 360;
    }
    return theta;
}
// Vector functions
function v_vector(x, y) {
    return { x : x, y : y }
}
function v_vector2(mag, dir) {
    return v_vector(mag * Math.sin(dir), mag * Math.cos(dir));
}
function v_add(v1, v2) {
    return v_vector(v1.x + v2.x, v1.y + v2.y);
}
function v_scale(v, s) {
    return v_vector(v.x * s, v.y * s);
}
function v_displace(point, angle, distance) {
    return v_add(point, v_vector2(distance, angle));
}

// Fabric.js functions
function getLocation(obj) {
    return v_vector(obj.left,obj.top);
}
function setLocation(obj, dispacement) {
    obj.left = dispacement.x;
    obj.top = dispacement.y;
}
function rotateText(line){
    var angle = line.getAngle() % 360;
    var centerPoint = getLocation(line);
    var antiAngle = -angle * Math.PI / 180;
    var distanceToTop = line.height * line.scaleY / 2;
    var textOffset = 5;
    var distance = -1 * (distanceToTop + textOffset);
    var displacement = v_displace(centerPoint, antiAngle, distance);
    var textDimensions = v_vector(line.lineText.width, line.lineText.height);
    var textLocation = v_add(displacement, v_scale(textDimensions, -0.5));
    setLocation(line.lineText, textLocation);
}
function getCurrentAngle(e){
    var newAngle;
    var currentAngle = parseInt(e.target.getAngle());
    startAngle = parseInt(e.target.startAngle);
    if (currentAngle > 180) {
        newAngle = startAngle - (360 - currentAngle);
    }
    else if (180 == (currentAngle+startAngle)) {
        newAngle = 180;
    }
    else if (currentAngle <= 180 && 180 >= (currentAngle+startAngle)) {
        newAngle = startAngle + currentAngle;
    }
    else if (currentAngle <= 180 && 180 < (currentAngle+startAngle)) {
        newAngle = startAngle + currentAngle - 360;
    }
    return newAngle;
}