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
tracking.ColorTracker.registerColor('yellow', function(r, g, b) {
  if (r > 110 && g > 150 && b < 60) {
    return true;
  }
  return false;
});
tracking.ColorTracker.registerColor('blue', function(r, g, b) {
  if (r < 60 && g < 60 && b > 60) {
    return true;
  }
  return false;
});

var colors = new tracking.ColorTracker(['red','yellow']);
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


    var rect1 = [[x1, y1], [x1+w1, y1], [x1, y1+h1], [x1+w1, y1+h1]]
    var rect2 = [[x2, y2], [x2+w2, y2], [x2, y2+h2], [x2+w2, y2+h2]]

    // if (
    //   (
    // (x1 < x2 && x1+w1 > x2 && y1 < y2 && y1+h1 > y2)||
    // (x2 < x1 && x2+w2 > x1 && y2 < y1 && y2+h2 > y1)
    //   )
    if (
      (
        (rect1[0][0] < rect2[0][0] && rect2[0][0] < rect1[1][0]) //Event that x3 is inbetween x1 and x2
        || (rect1[0][0] < rect2[1][0] && rect2[1][0] < rect1[1][0]) //Event that x4 is inbetween x1 and x2
        || (rect2[0][0] < rect1[0][0] && rect1[1][0] < rect2[1][0])  //Event that x1 and x2 are inbetween x3 and x4
        || (rect1[0][1] < rect2[0][1] && rect2[0][1] < rect1[1][1]) //Event that y3 is between y1 and y2
            || (rect1[0][1] < rect2[1][1] && rect2[1][1] < rect1[1][1]) //Event that y4 is between y1 and y2
            || (rect2[0][1] < rect1[0][1] && rect1[1][1] < rect2[1][1])
          )
                && event.data[0].color !== event.data[1].color
          )


     {
       document.getElementById("collision").style.background='red'
       document.getElementById("collision").innerHTML="COLLISION DETECTED in Via Volta 8 <br> - Camera 64E -";
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
