// when the doc is ready
$(document).ready(function() {
  console.log("ready!");
// this is just for having something in the canvas
// could be done by P5JS
  var ctx = $('#foo')[0].getContext('2d');
  for (var x = 0; x < 20; x += 10) {
    for (var y = 0; y < 20; y += 10) {
      if (x == y) {
        ctx.fillStyle = '#000000';
      } else {
        ctx.fillStyle = '#8888aa';
      }
      ctx.fillRect(x, y, 10, 10);
    }
  }

// here is the gist
// if the user hits submit then
// turn the content of the canvas into the stiring we need and send it to
// the backend for saving
  $('form').submit(function(event){
    var str = $('#foo')[0].toDataURL();
    $('input#mydata').val(str);
    return true;
  });

});