window.addEventListener('load', () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  canvas.height = (window.innerHeight)/2;
  canvas.width = (window.innerHeight)/2;
  
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Variables
  let painting = false;

  function startPostition(e) {
    painting = true;
    draw(e);
  }
  function finishedPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 30;
    ctx.lineCap = "round";

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  }

  // EventListeners
  canvas.addEventListener('mousedown', startPostition);
  canvas.addEventListener('mouseup', finishedPosition);
  canvas.addEventListener('mousemove', draw);
  document.getElementById('clearCanvas').addEventListener('click', function() {
    console.log("clicked");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, false);
});

window.addEventListener('resize', () => {
  canvas.height = (window.innerHeight)/2;
  canvas.width = (window.innerHeight)/2;
});

$(function() {
  $('#upload').click(function() {
    const canvas = document.querySelector("#canvas");
    var imgURL = canvas.toDataURL();
    console.log(imgURL);
    $.ajax({
      url: '/send_pic',
      data: imgURL,
      type: 'POST',
      success: function (response) {
        $("#result").html(response);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
});


// function getImage() {
//   const canvas = document.querySelector("#canvas");
//   var imgURL = canvas.toDataURL();
//   console.log(imgURL);
//   $.ajax({
//     type: 'POST',
//     url: '/send_pic',
//     data: imgURL,
//     success: function (data) {
//     }
//   });
  
// }