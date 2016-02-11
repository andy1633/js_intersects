"use strict";
// Main script.
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cW = canvas.width;
var cH = canvas.height;
ctx.lineWidth = 4;
const N_LINES = 8;
const N_CIRCLES = 8;

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
                                     Math.random()*canvas.height),
                          Math.random() * 70 + 10));
}

var objs = [line].concat(lines).concat(circles);

canvas.addEventListener("mousemove", function(e) {
  var rect = canvas.getBoundingClientRect();
  line.p2 = new Victor(e.clientX - rect.left,
      e.clientY - rect.top);

  var collisions = [];

  for(var i = 0; i < lines.length; i++) {
    lines[i].color = "#000";
    var collision = line.collidingLine(lines[i]);
    if (collision) collisions.push({ p: collision, o: lines[i] });
  }

  for (var i = 0; i < circles.length; i++) {
    circles[i].color = "#000";
    var collision = circles[i].collidingLine(line)
    if (collision) collisions.push({ p: collision, o: circles[i]} );

  }

  var min = Number.MAX_VALUE;
  var obj = null;
  for (var i = 0; i < collisions.length; i++) {
    var delta = collisions[i].p.clone().subtract(line.p1);
    var lengthSq = delta.lengthSq();
    if (lengthSq < min) {
      min = lengthSq;
      obj = collisions[i].o;
      line.p2 = collisions[i].p;
    }
  }
  if (obj) obj.color = "#f00";
});

canvas.addEventListener("click", function (e) {
  var rect = canvas.getBoundingClientRect();
  line.p1 = new Victor(e.clientX - rect.left, e.clientY - rect.top);
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < objs.length; i++) {
    objs[i].draw(ctx);
  }

  window.requestAnimationFrame(animate);
}
animate();

