(function(window) {
	'use strict';
	// 자주 사용하는 글로벌 객체 레퍼런스 확보
	var document = window.document;
	var console = window.console;

	// 사용할 네임 스페이스 확보	
	var Cube3D = window.Cube3D || {};
	Cube3D.Common = Cube3D.Common || {};
	Cube3D.Common.Math = Cube3D.Common.Math || {};
	Cube3D.Common.Math.c3Vec3 = Cube3D.Common.Math.c3Vec3 || {};

	var c3Vec3 = function( x_, y_, z_ ){
		this.x = x_||0;
		this.y = y_||0;
		this.z = z_||0;	
	};
	
	c3Vec3.prototype.set = function( x_, y_, z_ ) {
		this.x = x_||0;
		this.y = y_||0;
		this.z = z_||0;	
	};
	c3Vec3.prototype.setV = function( v ) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;	
	};
		
	c3Vec3.prototype.setZero = function() {
		this.x = 0;
		this.y = 0;
		this.z = 0;	
	};
	
	c3Vec3.prototype.add = function( v ) { // vector
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;	
	};
	
	c3Vec3.prototype.subtract = function( v ) { // vector
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;	
	};
	
	c3Vec3.prototype.multiply = function( a ) { // number
		this.x *= a;
		this.y *= a;
		this.z *= a;	
	};
	
	c3Vec3.prototype.getCopy = function() { // vector
		return new c3Vec3( this.x, this.y, this.z );
	};
	
	c3Vec3.prototype.getNegative = function() { // number
		var v = this.getCopy();
		v.multiply( -1 );
		return v;
	};

	var c3Transform = function ( p_, a_ ) { // c3Vec3, c3Vec3
		this.position = p_|| new c3Vec3(); // c3Vec3
		this.R = a_|| new c3Vec3();
	};
	c3Transform.prototype.initialize = function( p_, a_ ) {
		this.position = p_|| new c3Vec3(); // c3Vec3
		this.R = a_|| new c3Vec3();
	};	
	c3Transform.prototype.set = function(other) {
		this.position.setV(other.position); // c3Vec3
		this.R.setV(other.angle);
	};	
	c3Transform.prototype.setIdentity = function() {
		this.position.setZero(); // c3Vec3
		this.R.setZero();
	};	
	
	// 공개 메서드 - 생성자만 노출
	Cube3D.Common.Math.c3Vec3 = c3Vec3;
	Cube3D.Common.Math.c3Transform = c3Transform;
	
	// 글로벌 객체에 모듈을 프로퍼티로 등록한다.
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Cube3D;
		// browser export
	} else {
		window.Cube3D = Cube3D;
	}    	

}(this));