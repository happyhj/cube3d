(function(window) {
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

}(this));