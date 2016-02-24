"use strict";
// Circle class.
function Circle(position, radius) {
  this.position = position;
  this.radius = radius;
  this.color = "#000";
}
Circle.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.position.x, this.position.y, this.radius,
          0, 2 * Math.PI);
  ctx.strokeStyle = this.color;
  ctx.stroke();
}

Circle.prototype.collidingCircle = function(circle) {
  return Collisions.circleIntersectsCircle(circle);
}

Circle.prototype.collidingLine = function(line) {
  return Collisions.circleIntersectsLine(this, line);
}
