(function(window) {
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
