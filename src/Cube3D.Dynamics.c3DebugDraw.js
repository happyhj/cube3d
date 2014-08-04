(function(window) {
	'use strict';
	// 자주 사용하는 글로벌 객체 레퍼런스 확보
	var document = window.document;
	var console = window.console;

	// 사용할 네임 스페이스 확보	
	var Cube3D = window.Cube3D || {};
	Cube3D.Dynamics = Cube3D.Dynamics || {};

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
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setClearColor( 0x888888, 1 );

		// add subtle ambient lighting
		var ambientLight = new THREE.AmbientLight(0x222222);
		this.scene.add(ambientLight);
		
		// directional lighting
		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(5, 5, 5).normalize();
		this.scene.add(directionalLight);



		document.body.appendChild( this.renderer.domElement );
		
		// 초기 body의 정보를 scene에 추가한다.
		this.addEntitiesFromWorld();
    };
    c3DebugDraw.prototype.addEntitiesFromWorld = function() {
	    // world 내의 body들을 순회하면서 scene에 모두 추가시킨 후에 그리기를 수행한다.
		for (var id in this.world) {
			var entity = world[id];
			/*
			var center = {
				x : entity.position.x,
				y : entity.y,
				z : entity.z,
			};
			*/
			if(entity instanceof SphereEntity) {
//				this.AddSphere(entity, entity.radius, 0x00ff00);
				this.AddSphere(entity, entity.radius, Math.random()*16777215);

			}
			if(entity instanceof CubeEntity) {
//				this.AddCube(entity, entity.halfWidth, entity.halfHeight, entity.halfDepth , 0xff0000);
				this.AddCube(entity, entity.halfWidth, entity.halfHeight, entity.halfDepth , Math.random()*16777215);

			}
		}
    };      
    c3DebugDraw.prototype.AddSphere =  function (entity, radius, color) {
		if (!radius) return;
		var geometry = new THREE.SphereGeometry( radius, 12, 12 );
		var material = new THREE.MeshBasicMaterial( 
			{	
				color: color
		//		, wireframe: true
			} 
		);
var material = new THREE.MeshPhongMaterial({
        // light
        specular: '#a9fcff',
        // intermediate
        color: color,
        // dark
        emissive: '#006063',
        shininess: 50 
      });
		var sphere = new THREE.Mesh( geometry, material );
		
		sphere.position.x = entity.x;
		sphere.position.y = entity.y;
		sphere.position.z = entity.z;
		sphere.rotation.x = entity.angle.x;
		sphere.rotation.y = entity.angle.y;
		sphere.rotation.z = entity.angle.z;
						
		entity.renderRef = sphere;
      		
		this.scene.add( sphere );	    
    };
    c3DebugDraw.prototype.AddCube =  function (entity, halfWidth, halfHeight, halfDepth , color) {
		if (!halfWidth || !halfHeight || !halfDepth) return;
		var geometry = new THREE.BoxGeometry( 2*halfWidth , 2*halfHeight, 2*halfDepth); // 기하학적 모양 결정
		var material = new THREE.MeshBasicMaterial( 
			{	
				color: color
//				, wireframe: true
			} 
		);
var material = new THREE.MeshPhongMaterial({
        // light
        specular: '#a9fcff',
        // intermediate
        color: color,
        // dark
        emissive: '#006063',
        shininess: 100 
      });
      
		var cube = new THREE.Mesh( geometry, material ); // 해당 모양과 재질을 가진 물체 생성 
		cube.position.x = entity.x;
		cube.position.y = entity.y;
		cube.position.z = entity.z;

		cube.rotation.x = entity.angle.x;
		cube.rotation.y = entity.angle.y;
		cube.rotation.z = entity.angle.z;
				
		entity.renderRef = cube;
		
		this.scene.add( cube ); // 물체를 장면에 추가	    
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
