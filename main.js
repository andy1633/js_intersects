"use strict";
// Main script.
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cW = canvas.width;
var cH = canvas.height;
ctx.lineWidth = 4;
const N_LINES = 256;
const N_CIRCLES = 32;

var line = new Line(new Victor(20.0, 20.0),
                    new Victor(300.0, 300.0));
var lines = [];
for(var i = 0; i < N_LINES; i++) {
  lines.push(new Line(new Victor(Math.random()*cW, Math.random()*cH),
                      new Victor(Math.random()*cW, Math.random()*cH)));
}

var circles = []; 
for(var i = 0; i < N_CIRCLES; i++) {
  circles.push(new Circle(new Victor(Math.random()*canvas.width,
                                     Math.random()*canvas.height), 30));
}

var objs = [line].concat(lines).concat(circles);

canvas.addEventListener("mousemove", function(e) {
  var rect = canvas.getBoundingClientRect();
  line.p2 = new Victor(e.clientX - rect.left,
      e.clientY - rect.top);

  for(var i = 0; i < lines.length; i++) {
    lines[i].color = line.collidingLine(lines[i]) ? "#f00" : "#000";
  }

  line.color = "#000";
  for (var i = 0; i < circles.length; i++) {
    if(circles[i].collidingLine(line)) {
      line.color = "#f00";
      circles[i].color = "#f00";
    } else {
      circles[i].color = "#000";
    }
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < objs.length; i++) {
    objs[i].draw(ctx);
  }

  window.requestAnimationFrame(animate);
}
animate();

