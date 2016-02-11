"use strict";
// Module for detection between different shapes.
var Collisions = {
  circleIntersectsCircle: function (c1, c2) {
    var delta = c1.position.clone().sub(c2.position);
    var dSq = delta.lengthSq();
    var sumR = c1.radius + c2.radius;
    if (dSq < (sumR * sumR)) {
      return c1.position.clone().add(delta.multiplyScalar(0.5));
    } else {
      return false;
    }
  },

  circleIntersectsLine: function (circle, line) {
    // http://stackoverflow.com/questions/1073336/circle-line-segment-collision-detection-algorithm
    var e = line.p1.clone();
    var l = line.p2.clone();
    var c = circle.position.clone();
    var r = circle.radius;

    var d = l.clone().subtract(e);
    var f = e.clone().subtract(c);

    var a = d.dot(d);
    var b = 2 * f.dot(d);
    var c = f.dot(f) - r*r;

    var discriminant = (b*b) - (4 * a * c);

    if(discriminant < 0) {
      // No intersection.
      return false;
    } else {
      // Some kind of intersection happened.
      discriminant = Math.sqrt(discriminant);

      var t1 = (-b - discriminant)/(2*a);
      var t2 = (-b + discriminant)/(2*a);

      // Impale or poke intersection.
      if(t1 >= 0 && t1 <= 1) {
        return e.add(d.multiplyScalar(t1));
      }
      // Exit wound intersections.
      if(t2 >= 0 && t2 <= 1) {
        return e.add(d.multiplyScalar(t2));
      }
    }
    return false;
  },

  lineIntersectsLine: function(l1, l2) {
    // http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
    var p = l1.p1.clone();
    var q = l2.p1.clone();
    var r = l1.p2.clone().subtract(p);
    var s = l2.p2.clone().subtract(q);

    var t = q.clone().subtract(p).cross(s) / r.cross(s);
    var u = q.clone().subtract(p).cross(r) / r.cross(s);

    if (r.cross(s) != 0 && t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return p.add(r.multiplyScalar(t));
    } else {
      return false;
    }
  }
};
