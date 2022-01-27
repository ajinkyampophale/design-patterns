// 1st Implementation - Normal
const CoordinateSystem = {
  cartesian: 0,
  polar: 1
};

class PointFirst{
  constructor(a, b, cs = CoordinateSystem.cartesian){
    switch(cs){
      case CoordinateSystem.cartesian:
        this.x = a;
        this.y = b;
        break;
      case CoordinateSystem.polar:
        this.x = a * Math.cos(a);
        this.y = a * Math.sin(b);
        break;
    }
  }
}

const pc = new PointFirst(45, 20, CoordinateSystem.cartesian);
const pp = new PointFirst(45, 20, CoordinateSystem.polar);
console.log(pc);
console.log(pp);

// 2nd Implementation - Factory Method
class Point{

  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class PointFactory{
  static newCartesianPoint(x, y){
    return new Point(x, y);
  }

  static newPolarPoint(rho, theta){
    return new Point(
      rho * Math.cos(rho),
      theta * Math.sin(theta)
    )
  }
}

const pfc = PointFactory.newCartesianPoint(45, 20);
const pfp = PointFactory.newPolarPoint(45, 20);
console.log(pfc);
console.log(pfp);