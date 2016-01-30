"use strict";
// Line class
function Line(p1, p2) {
  this.p1 = p1;
  this.p2 = p2;
  this.color = "#000";
}
Line.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.moveTo(this.p1.x, this.p1.y);
  ctx.lineTo(this.p2.x, this.p2.y);
  ctx.strokeStyle = this.color;
  ctx.stroke();
}

Line.prototype.collidingCircle = function(circle) {
  return Collisions.circleIntersectsLine(circle, this);
}

Line.prototype.collidingLine = function(line) {
  return Collisions.lineIntersectsLine(this, line);
}


