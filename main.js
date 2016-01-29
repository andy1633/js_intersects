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

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.lineWidth = 4;

var line = new Line(new Victor(20.0, 20.0),
		new Victor(300.0, 300.0));
var circle = new Circle(new Victor(300.0, 300.0), 80.0);

var objs = [line, circle];

canvas.addEventListener("mousemove", function(e) {
		var rect = canvas.getBoundingClientRect();
		line.p2 = new Victor(e.clientX - rect.left,
			e.clientY - rect.top);

		//http://stackoverflow.com/questions/1073336/circle-line-segment-collision-detection-algorithm
		var e = line.p1.clone();
		var l = line.p2.clone();
		var c = circle.position.clone();
		var r = circle.radius;

		var d = l.subtract(e);
		var f = e.subtract(c);

		var a = d.dot(d);
		var b = 2 * f.dot(d);
		var c = f.dot(f) - r*r;

		var discriminant = (b*b) - (4 * a * c);

		if(discriminant < 0) {
			// No intersection.
			line.color = "#000";
		} else {
			line.color = "#0f0";

			discriminant = Math.sqrt(discriminant);

			var t1 = (-b - discriminant)/(2*a);
			var t2 = (-b + discriminant)/(2*a);

			if(t1 >= 0 && t1 <= 1) {
				line.color = "#f00";
			}
			if(t2 >= 0 && t2 <= 1) {
				line.color = "#f00";
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

