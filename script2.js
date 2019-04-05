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
colors.setMinDimension(50);
  var tol = 50;
colors.on('track', function(event) {
  var car1 = event.data[0];
  var car2 = event.data[1];

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
    console.log(event.data);
    document.getElementById('car1').innerHTML=event.data[0].color + " car"
    console.log(car1.x+" "+car1.y);
    console.log("car1 - "+"x:"+car1.x+" y:"+car1.y);

    if(event.data.length>1) {
    document.getElementById('car2').innerHTML=event.data[1].color + " car"
    console.log("car2 - "+"x:"+car2.x+" y:"+car2.y);

    if (Math.abs((event.data[0].x - event.data[1].x))<=tol ||Math.abs((event.data[0].y - event.data[1].y))<=tol)
     {
       document.getElementById("collision").innerHTML="COLLISION DETECTED";
     }
  }
}
});

tracking.track('#webcam', colors);
};
