(function(window) {
	'use strict';
	// 자주 사용하는 글로벌 객체 레퍼런스 확보
	var document = window.document;
	var console = window.console;

	// 사용할 네임 스페이스 확보	
	var Cube3D = window.Cube3D || {};
	Cube3D.Collision = Cube3D.Collision || {};
	Cube3D.Collision.Shapes = Cube3D.Collision.Shapes || {};

function c3SphereShape() {
  //c3SphereShape.c3SphereShape.apply(this, arguments);
  if (this.constructor === c3SphereShape) this.c3SphereShape.apply(this, arguments);
};
//c3SphereShape.c3SphereShape = function(){};
c3SphereShape.prototype.c3SphereShape = function (radius) {
  if (radius === undefined) radius = 0;
  this.m_radius = radius;
}
c3SphereShape.prototype.getRadius = function () {
  return this.m_radius;
}
c3SphereShape.prototype.setRadius = function (radius) {
  if (radius === undefined) radius = 0;
  this.m_radius = radius;
}
c3SphereShape.prototype.set = function (other) {
  //this.__super.set.call(this, other);
  this.m_radius = other.getRadius();
}       
c3SphereShape.prototype.copy = function () {
  var s = new c3SphereShape();
  s.set(this);
  return s;
}
c3SphereShape.prototype.computeMass = function(density) {
	var volume = (4/3)*Math.PI*Math.pow(this.m_radius,3);
	return volume*density;
}
// new c3CuboidShape(halfWidth, halfHeight, halfDepth)

function c3CuboidShape() {
  //c3CuboidShape.c3SphereShape.apply(this, arguments);
  if (this.constructor === c3CuboidShape) this.c3CuboidShape.apply(this, arguments);
};
//c3CuboidShape.c3SphereShape = function(){};
c3CuboidShape.prototype.c3CuboidShape = function (halfWidth, halfHeight, halfDepth) {
  if (halfWidth === undefined) halfWidth = 0;
  if (halfHeight === undefined) halfHeight = 0;
  if (halfDepth === undefined) halfDepth = 0;  
  this.m_halfWidth = halfWidth;
  this.m_halfHeight = halfHeight;
  this.m_halfDepth = halfDepth;
}
c3CuboidShape.prototype.getHalfWidth = function () {
  return this.m_halfWidth;
}
c3CuboidShape.prototype.getHalfHeight = function () {
  return this.m_halfHeight;
}
c3CuboidShape.prototype.getHalfDepth = function () {
  return this.m_halfDepth;
}
c3CuboidShape.prototype.setHalfWidth = function (halfWidth) {
  if (halfWidth === undefined) halfWidth = 0;
  this.m_halfWidth = halfWidth;
};
c3CuboidShape.prototype.setHalfHeight = function (halfHeight) {
  if (halfHeight === undefined) halfHeight = 0;
  this.m_halfHeight = halfHeight;
};
c3CuboidShape.prototype.setHalfDepth = function (halfDepth) {
  if (halfDepth === undefined) halfDepth = 0;
  this.m_halfDepth = halfDepth;
};

c3CuboidShape.prototype.set = function (other) {
  //this.__super.set.call(this, other);
  this.m_halfWidth = other.getHalfWidth();
  this.m_halfHeight = other.getHalfHeight();
  this.m_halfDepth = other.getHalfDepth();
};      
c3CuboidShape.prototype.copy = function () {
  var s = new c3CuboidShape();
  s.set(this);
  return s;
};
c3CuboidShape.prototype.computeMass = function(density) {
	var volume = 8 * this.m_halfWidth * this.m_halfHeight * this.m_halfDepth;
	return volume*density;
}

function c3MassData() {
  this.mass = 0.0
};



	// 공개 메서드 - 생성자만 노출
	Cube3D.Collision.Shapes.c3SphereShape = c3SphereShape;
	Cube3D.Collision.Shapes.c3CuboidShape = c3CuboidShape;
	Cube3D.Collision.Shapes.c3MassData = c3MassData;
	
	// 글로벌 객체에 모듈을 프로퍼티로 등록한다.
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Cube3D;
		// browser export
	} else {
		window.Cube3D = Cube3D;
	}    	

}(this));