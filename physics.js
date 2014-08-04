/*
Copyright 2011 Seth Ladd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// 개발중일 때 
/* 
importScripts('./src/Cube3D.Common.Math.c3Vec3.js');
importScripts('./src/Cube3D.Collision.Shapes.js');
importScripts('./src/Cube3D.Dynamics.js');
importScripts('./src/Cube3D.Dynamics.c3World.js');
*/
// 빌드하고나서 
importScripts('./build/Cube3D.js');

var c3Vec3 = Cube3D.Common.Math.c3Vec3
 , c3Transform = Cube3D.Common.Math.c3Transform
 , c3SphereShape = Cube3D.Collision.Shapes.c3SphereShape
 , c3CuboidShape = Cube3D.Collision.Shapes.c3CuboidShape
 , c3MassData = Cube3D.Collision.Shapes.c3MassData
 , c3FixtureDef = Cube3D.Dynamics.c3FixtureDef
 , c3Fixture = Cube3D.Dynamics.c3Fixture 
 , c3BodyDef = Cube3D.Dynamics.c3BodyDef
 , c3Body = Cube3D.Dynamics.c3Body 
 , c3World = Cube3D.Dynamics.c3World
 , c3TimeStep = Cube3D.Dynamics.c3TimeStep
   ;
     
function bTest(intervalRate, adaptive) {
	this.intervalRate = parseInt(intervalRate);
	this.adaptive = adaptive;
	
	this.lastTimestamp = Date.now();
	
	var SCALE = 30;
	
	this.world = new c3World(
	    new c3Vec3(0, -9.8, 0)    //gravity
	);
	
	this.fixDef = new c3FixtureDef();
	this.bodyDef = new c3BodyDef();

}

bTest.prototype.update = function() {
  var now = Date.now();
  var stepRate = (this.adaptive) ? (now - this.lastTimestamp) / 1000 : (1 / this.intervalRate);
  this.lastTimestamp = now;
  this.world.Step(
         stepRate   //frame-rate
   );
   //this.world.ClearForces();
   var world = box.getState();
   postMessage({"w": world});     
}


bTest.prototype.getState = function() {
  var state = {};
  for (var b = this.world.getBodyList(); b; b = b.m_next) {
    if (typeof b.getUserData() !== 'undefined' && b.getUserData() != null) {
		var position = b.getPosition();
		var angle = b.getAngle();
		
        state[b.getUserData()] = {
        	x: position.x, 
        	y: position.y, 
        	z: position.z,
        	angle: {
        		x: angle.x,
        		y: angle.y,
        		z: angle.z
        	}
        };
    }
  }
  return state;
}

bTest.prototype.setBodies = function(bodyEntities) {
    //this.bodyDef.type = b2Body.b2_dynamicBody;
    for(var id in bodyEntities) {
        var entity = bodyEntities[id];
        if (entity.radius) {
            this.fixDef.shape = new c3SphereShape(entity.radius);
        } else {
            this.fixDef.shape = new c3CuboidShape(entity.halfWidth, entity.halfHeight, entity.halfDepth);
        }
       this.bodyDef.position.x = entity.x;
       this.bodyDef.position.y = entity.y;
       this.bodyDef.position.z = entity.z;
      
       this.bodyDef.angle.set(entity.angle.x, entity.angle.y, entity.angle.z);

	   // 초기속도 랜덤 배치 샘플코드
	   this.bodyDef.linearVelocity.set(Math.random() * 10 -5,Math.random() * 15+ 5, Math.random() * -10 - 10);
	   // 초기각속도 랜덤 배치 샘플코드
	   this.bodyDef.angularVelocity.set(Math.random() * 4  -2,Math.random() * 4 - 2, Math.random() * 4 - 2);
	   
       this.bodyDef.userData = entity.id;
       this.world.createBody(this.bodyDef).createFixture(this.fixDef);
    }
    this.ready = true;
}

var Hz = 60;
var AdaptiveTimeStep = true;

var box = new bTest(Hz, AdaptiveTimeStep); // intervalRate, adaptive

var loop = function() {
    if (box.ready) box.update();
}
setInterval(loop, 1000/60);

self.onmessage = function(e) {
    switch (e.data.cmd) {
      case 'bodies':
        box.setBodies(e.data.msg);
        break;
    }
};
