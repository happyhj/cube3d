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

      	// 가속도로 속도변화적용
      	b.m_linearVelocity.x += step.dt * gravity.x;
      	b.m_linearVelocity.y += step.dt * gravity.y;
      	b.m_linearVelocity.z += step.dt * gravity.z;     
      	
      	// 각가속도 고려안함
      	b.m_xf.R.x += step.dt * b.m_angularVelocity.x;
      	b.m_xf.R.y += step.dt * b.m_angularVelocity.y;
      	b.m_xf.R.z += step.dt * b.m_angularVelocity.z;
 
      }
      
   }
 /*
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
*/  
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

}(this));;(function(window) {
	'use strict';
	// 자주 사용하는 글로벌 객체 레퍼런스 확보
	var document = window.document;
	var console = window.console;

	// 사용할 네임 스페이스 확보	
	var Cube3D = window.Cube3D || {};
	Cube3D.Dynamics = Cube3D.Dynamics || {};
	
	var array = [[0x556270, 0x4ECDC4, 0xC7F464, 0xFF6B6B, 0xC44D58]
				, [0x3FB8AF, 0x7FC7AF, 0xDAD8A7, 0xFF9E9D, 0xFF3D7F]
				, [0xFAD089, 0xFF9C5B, 0xF5634A, 0xED303C, 0x3B8183]
				, [0x00A8C6, 0x40C0CB, 0xF9F2E7, 0xAEE239, 0x8FBE00]
				, [0x490A3D, 0xBD1550, 0xE97F02, 0xF8CA00, 0x8A9B0F]];	     //cheer up emo kid
	
	var palette = array[Math.floor(Math.random() * array.length)];
	
	function getRandomColorFromPalette() {
		return palette[Math.floor(Math.random() * palette.length)];
	}

    // 화면에 그려주는 모듈
    function c3DebugDraw(world) {
    	this.world = world;
	    this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
		this.camera.position.x = 10; // 카메라 위치 세팅 
		this.camera.position.y = 2; // 카메라 위치 세팅 
		this.camera.position.z = 30; // 카메라 위치 세팅 
		
		this.init();
    }
    c3DebugDraw.prototype.init = function() {
    	// 렌더러 인스턴스를 만들고 canvas객체를 화면에 붙인다.
		this.renderer = new THREE.WebGLRenderer();
		//this.renderer = new THREE.CanvasRenderer();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
//		this.renderer.setClearColor( 0xFAFAFA, 1 );
		this.renderer.setClearColor( 0xF9F2E7, 1 );

		// add subtle ambient lighting
		var ambientLight = new THREE.AmbientLight(0x333333);
		this.scene.add(ambientLight);
		
		// directional lighting
		var directionalLight = new THREE.DirectionalLight(0xdddddd);
		directionalLight.position.set(5, 5, 5).normalize();
		this.scene.add(directionalLight);

		// directional lighting
		var directionalLight2 = new THREE.DirectionalLight(0xdddddd);
		directionalLight2.position.set(-5, -5, -7).normalize();
		this.scene.add(directionalLight2);
		
		var directionalLight3 = new THREE.DirectionalLight(0xdddddd);
		directionalLight3.position.set(0, -10, 0).normalize();
		this.scene.add(directionalLight3);
		
		document.body.appendChild( this.renderer.domElement );
		
		// 초기 body의 정보를 scene에 추가한다.
		this.addEntitiesFromWorld();
    };
    c3DebugDraw.prototype.addEntitiesFromWorld = function() {
	    // world 내의 body들을 순회하면서 scene에 모두 추가시킨 후에 그리기를 수행한다.	    
		for (var id in this.world) {
			var entity = world[id];
			
			if(entity instanceof EllipsoidEntity) {
				this.AddEllipsoid(entity, entity.halfWidth, entity.halfHeight, entity.halfDepth , getRandomColorFromPalette() );
			}
			if(entity instanceof CuboidEntity) {
				this.AddCuboid(entity, entity.halfWidth, entity.halfHeight, entity.halfDepth , getRandomColorFromPalette() );
			}
		}
    };      
    c3DebugDraw.prototype.AddEllipsoid =  function (entity, halfWidth, halfHeight, halfDepth , color) {
		if (!halfWidth || !halfHeight || !halfDepth) return;
		
		var max = (halfWidth>halfHeight)?((halfWidth>halfDepth)?halfWidth:halfDepth):((halfHeight>halfDepth)?halfHeight:halfDepth);
		
		var geometry = new THREE.SphereGeometry( max, 12, 12 );
		geometry.applyMatrix( new THREE.Matrix4().makeScale( halfWidth / max, halfHeight / max, halfDepth / max ) );

		var material = new THREE.MeshPhongMaterial({
		        // light
		        specular: '#444444',
		        // intermediate
		        color: color,
		        // dark
		        emissive: '#000000',
		        shininess: 4
		});
		var ellipsoid = new THREE.Mesh( geometry, material );
		
		ellipsoid.position.x = entity.x;
		ellipsoid.position.y = entity.y;
		ellipsoid.position.z = entity.z;
		ellipsoid.rotation.x = entity.angle.x;
		ellipsoid.rotation.y = entity.angle.y;
		ellipsoid.rotation.z = entity.angle.z;
						
		entity.renderRef = ellipsoid;
      		
		this.scene.add( ellipsoid );	    
    };
    c3DebugDraw.prototype.AddCuboid =  function (entity, halfWidth, halfHeight, halfDepth , color) {
		if (!halfWidth || !halfHeight || !halfDepth) return;
		var geometry = new THREE.BoxGeometry( 2*halfWidth , 2*halfHeight, 2*halfDepth); // 기하학적 모양 결정

		var material = new THREE.MeshPhongMaterial({
		        // light
		        specular: '#444444',
		        // intermediate
		        color: color,
		        // dark
		        emissive: '#000000',
		        shininess: 4 
		      });
      
		var cuboid = new THREE.Mesh( geometry, material ); // 해당 모양과 재질을 가진 물체 생성 
		cuboid.position.x = entity.x;
		cuboid.position.y = entity.y;
		cuboid.position.z = entity.z;

		cuboid.rotation.x = entity.angle.x;
		cuboid.rotation.y = entity.angle.y;
		cuboid.rotation.z = entity.angle.z;
				
		entity.renderRef = cuboid;
		
		this.scene.add( cuboid ); // 물체를 장면에 추가	    
    };   
    c3DebugDraw.prototype.draw = function() { 
    	this.renderer.render(this.scene, this.camera); 
	};
	
	// 공개 메서드 - 생성자만 노출
	Cube3D.Dynamics.c3DebugDraw = c3DebugDraw;
	
	// 글로벌 객체에 모듈을 프로퍼티로 등록한다.
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Cube3D;
		// browser export
	} else {
		window.Cube3D = Cube3D;
	}    	

}(this));
