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

}(this));;(function(window) {
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

}(this));;(function(window) {
	'use strict';
	// 자주 사용하는 글로벌 객체 레퍼런스 확보
	var document = window.document;
	var console = window.console;

	// 사용할 네임 스페이스 확보	
	var Cube3D = window.Cube3D || {};
	Cube3D.Dynamics = Cube3D.Dynamics || {};

	// 의존성 정의
	var c3Vec3 = Cube3D.Common.Math.c3Vec3;
	var c3Transform = Cube3D.Common.Math.c3Transform;
	var c3MassData = Cube3D.Collision.Shapes.c3MassData;



function c3FixtureDef() {
//	c3FixtureDef.c3FixtureDef.apply(this, arguments);
	if (this.constructor === c3FixtureDef) this.c3FixtureDef.apply(this, arguments);
}

c3FixtureDef.prototype.c3FixtureDef = function () {
    this.shape = null;
	this.density = 0.0;
};
/*
var fixDef = new c3FixtureDef();
fixDef.shape = new c3SphereShape(radius);
fixDef.shape = new c3CuboidShape(halfWidth, halfHeight, halfDepth);
*/

function c3Fixture() {
//	c3Fixture.c3Fixture.apply(this, arguments);
	if (this.constructor === c3Fixture) this.c3Fixture.apply(this, arguments);
}

c3Fixture.prototype.c3Fixture = function () {
	this.m_userData = null;
	this.m_body = null; // 나를 소유한 부모바디를 가리킴
	this.m_next = null;
	this.m_shape = null;
	this.m_density = 0.0;
};

c3Fixture.prototype.create = function (body, def) {
	this.m_userData = def.userData;
	this.m_body = body;
	this.m_next = null;
	this.m_shape = def.shape.copy();
	this.m_density = def.density;
};

c3Fixture.prototype.getMassData = function(massData) {
	var md = (massData && (massData instanceof c3MassData))?massData:new c3MassData();
	md.mass = this.m_shape.computeMass(this.m_density);
	return md.mass;
};

c3Fixture.prototype.getNext = function() {
	return this.m_next;
}
function c3BodyDef() {
	c3BodyDef.c3BodyDef.apply(this, arguments);
	if (this.constructor === c3BodyDef) this.c3BodyDef.apply(this, arguments);
}
// 멤버의 객체를 생성하는 생성자 
c3BodyDef.c3BodyDef = function () {
	this.angle = new c3Vec3();
	this.position = new c3Vec3();
	this.linearVelocity = new c3Vec3();
	this.angularVelocity = new c3Vec3();
};
// 멤버 객체의 값을 초기화 하는 생성자
c3BodyDef.prototype.c3BodyDef = function () {
	this.userData = null; // entity.id
	this.angle.set(0.0, 0.0, 0.0);
	this.position.set(0.0, 0.0, 0.0);
	this.linearVelocity.set(0.0, 0.0, 0.0);
	this.angularVelocity.set(0.0, 0.0, 0.0);
};

function c3Body() {
	c3Body.c3Body.apply(this, arguments);
	if (this.constructor === c3Body) this.c3Body.apply(this, arguments);
}
// 멤버의 객체를 생성하는 생성자 
c3Body.c3Body = function () {
	this.m_xf = new c3Transform();
	this.m_linearVelocity = new c3Vec3();
	this.m_angularVelocity = new c3Vec3();
	this.m_force = new c3Vec3();
};
// 멤버 객체의 값을 초기화 하는 생성자
c3Body.prototype.c3Body = function (bodyDef, world) {
	this.m_world = world;
	this.m_xf.position.setV(bodyDef.position);
	this.m_xf.R.setV(bodyDef.angle);
	this.m_prev = null;
	this.m_next = null;
	this.m_linearVelocity.setV(bodyDef.linearVelocity);
	this.m_angularVelocity.setV(bodyDef.angularVelocity);
	this.m_force.set(0.0, 0.0, 0,0);
    this.m_invMass = 0.0;
	this.m_mass = 1.0;
	this.m_userData = bodyDef.userData;
	this.m_fixtureList = null;
	this.m_fixtureCount = 0;
};

c3Body.prototype.createFixture = function (fixtureDef) {
      var fixture = new c3Fixture();
      fixture.create(this, fixtureDef);
      fixture.m_next = this.m_fixtureList;
      this.m_fixtureList = fixture;
      ++this.m_fixtureCount;
      fixture.m_body = this;
      if (fixture.m_density > 0.0) {
         this.resetMassData();
      }
      return fixture;	
}

c3Body.prototype.getNext = function() {
	return this.m_next;
}
   c3Body.prototype.getMass = function () {
      return this.m_mass;
   }
   c3Body.prototype.getMassData = function (data) {
      data.mass = this.m_mass;
      //data.I = this.m_I;
      //data.center.SetV(this.m_sweep.localCenter);
   }
   c3Body.prototype.setMassData = function (massData) {
      this.m_invMass = 0.0;
      this.m_mass = massData.mass;
      if (this.m_mass <= 0.0) {
         this.m_mass = 1.0;
      }
      this.m_invMass = 1.0 / this.m_mass;
   }   
   c3Body.prototype.resetMassData = function () {
      this.m_mass = 0.0;
      this.m_invMass = 0.0;
      for (var f = this.m_fixtureList; f; f = f.m_next) {
         if (f.m_density == 0.0) {
            continue;
         }
         var massData = f.getMassData();
         this.m_mass += massData.mass;
      }
      if (this.m_mass > 0.0) {
         this.m_invMass = 1.0 / this.m_mass;
      }
      else {
         this.m_mass = 1.0;
         this.m_invMass = 1.0;
      }
   } 
c3Body.prototype.getUserData = function() {
	return this.m_userData;
}
c3Body.prototype.getPosition = function() {
	return this.m_xf.position;
}
c3Body.prototype.getAngle = function() {
	return this.m_xf.R;
}
	// 공개 메서드 - 생성자만 노출
	Cube3D.Dynamics.c3FixtureDef = c3FixtureDef;
	Cube3D.Dynamics.c3Fixture = c3Fixture;
	Cube3D.Dynamics.c3BodyDef = c3BodyDef;
	Cube3D.Dynamics.c3Body = c3Body;

	// 글로벌 객체에 모듈을 프로퍼티로 등록한다.
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Cube3D;
		// browser export
	} else {
		window.Cube3D = Cube3D;
	}    	

}(this));
;(function(window) {
	'use strict';
	// 자주 사용하는 글로벌 객체 레퍼런스 확보
	var document = window.document;
	var console = window.console;

	// 사용할 네임 스페이스 확보	
	var Cube3D = window.Cube3D || {};
	Cube3D.Dynamics = Cube3D.Dynamics || {};
	Cube3D.Dynamics.c3World = Cube3D.Dynamics.c3World || {};

	// 의존성 정의
	var c3Body = Cube3D.Dynamics.c3Body;
	


	var c3World = function( gravity_ ){ // c3Vec3,
		this.m_gravity = gravity_;
		this.step = new c3TimeStep();
	};
	
	c3World.prototype.set = function( x_, y_, z_ ) {

	};
	
   c3World.prototype.createBody = function (def) {
      /*
      if (this.IsLocked() == true) {
         return null;
      }
      */
      var b = new c3Body(def, this);
      b.m_prev = null;
      b.m_next = this.m_bodyList;
      if (this.m_bodyList) {
         this.m_bodyList.m_prev = b;
      }
      this.m_bodyList = b;
      ++this.m_bodyCount;
      return b;
   };
   
   c3World.prototype.getBodyList = function() {
	   return this.m_bodyList;
   };
   c3World.prototype.clearForces = function () {
      for (var body = this.m_bodyList; body; body = body.m_next) {
         body.m_force.SetZero();
         //body.m_torque = 0.0;
      }
   }   
	
   c3World.prototype.Step = function (dt) {
      if (dt === undefined) dt = 0;
//      if (velocityIterations === undefined) velocityIterations = 0;
  //    if (positionIterations === undefined) positionIterations = 0;

      var step = this.step;
      step.dt = dt;
    //  step.velocityIterations = velocityIterations;
    //  step.positionIterations = positionIterations;
      if (dt > 0.0) {
         step.inv_dt = 1.0 / dt;
      }
      else {
         step.inv_dt = 0.0;
      }

      if (step.dt > 0.0) {
         this.Solve(step, this.m_gravity);
      }
   }
   c3World.prototype.Solve = function (step) {
      var b, gravity = this.m_gravity;
      for (b = this.m_bodyList;b; b = b.m_next) {
        b.m_xf.position.x += step.dt * b.m_linearVelocity.x + Math.pow(step.dt, 2) * gravity.x * 0.5;
        b.m_xf.position.y += step.dt * b.m_linearVelocity.y + Math.pow(step.dt, 2) * gravity.y * 0.5;
        b.m_xf.position.z += step.dt * b.m_linearVelocity.z + Math.pow(step.dt, 2) * gravity.z * 0.5;

      
      	b.m_linearVelocity.x += step.dt * gravity.x;
      	b.m_linearVelocity.y += step.dt * gravity.y;
      	b.m_linearVelocity.z += step.dt * gravity.z;        
      }
      
   }
   
	function c3TimeStep() {
		c3TimeStep.c3TimeStep.apply(this, arguments);
		if (this.constructor === c3TimeStep) this.c3TimeStep.apply(this, arguments);
	}
	c3TimeStep.c3TimeStep = function () {};	
	// 멤버 객체의 값을 초기화 하는 생성자
	c3TimeStep.prototype.c3TimeStep = function () {
	      this.dt = 0.0;
	      this.inv_dt = 0.0;
	};
	c3TimeStep.prototype.set = function (step) {
	  this.dt = step.dt;
	  this.inv_dt = step.inv_dt;
	}

	// 공개 메서드 - 생성자만 노출
	Cube3D.Dynamics.c3World = c3World;
	Cube3D.Dynamics.c3TimeStep = c3TimeStep;
	
	// 글로벌 객체에 모듈을 프로퍼티로 등록한다.
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Cube3D;
		// browser export
	} else {
		window.Cube3D = Cube3D;
	}    	

}(this));