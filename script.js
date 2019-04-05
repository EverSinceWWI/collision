window.onload = function() {
      var webcam = document.getElementById('webcam');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d')

      if (navigator.mediaDevices.getUserMedia) {
        var successCallback = function(stream) {
          webcam.srcObject = stream;
        };
        var errorCallback = function(error) {
          console.log(error);
        };
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: { ideal: 'environment' } } // prefer rear-facing camera
        }).then(successCallback, errorCallback);
      };

tracking.ColorTracker.registerColor('red', function(r, g, b) {
  if (r > 120 && g < 60 && b < 60) {
    return true;
  }
  return false;
});
tracking.ColorTracker.registerColor('blue', function(r, g, b) {
  if (r < 50 && g < 50 && b > 50) {
    return true;
  }
  return false;
});

var colors = new tracking.ColorTracker(['red','blue']);
// colors.setMinDimension(50);
// colors.setMinGroupSize(50);
  // var tol = 5;
colors.on('track', function(event) {

  context.clearRect(0, 0, canvas.width, canvas.height);
  if (event.data.length === 0) {
    // No colors were detected in this frame.
  } else {
    event.data.forEach(function(rect)
    {
      if (rect.colors === 'custom') {
        rect.color = colors.customColor;
      }
      context.strokeStyle = rect.colors;
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      context.fillText('+',rect.x + rect.width/2, rect.y + rect.height/2);
    });
  }
  if(event.data.length > 0) {
    document.getElementById('car1').innerHTML=event.data[0].color + " car"

    if(event.data.length>1 && (event.data[0].color !== event.data[1].color)) {
    document.getElementById('car2').innerHTML=event.data[1].color + " car";

    var car1 = event.data[0];
    var car2 = event.data[1];

    var x1 = event.data[0].x;
    var x2 = event.data[1].x;

    var y1 = event.data[0].y;
    var y2 = event.data[1].y;

    var w1 = event.data[0].width;
    var w2 = event.data[1].width;

    var h1 = event.data[0].height;
    var h2 = event.data[1].height;

    // if ((
    //   Math.abs((event.data[0].x - event.data[1].x))<=tol ||Math.abs((event.data[0].y - event.data[1].y))<=tol)&&
    //   (
    //     event.data[0].color !== event.data[1].color
    //   ))
    if (((x1 <= x2 && x1+w1 >= x2) &&
		(y1 <= y2 && y1+h1 >= y2))
    && event.data[0].color !== event.data[1].color)
     {
       document.getElementById("collision").style.background='red'
       document.getElementById("collision").innerHTML="COLLISION DETECTED";
     }
     else{
       document.getElementById("collision").innerHTML="";
       document.getElementById("collision").style.background='none';
     }
  }
}
});

tracking.track('#webcam', colors);
};
