(function(window) {
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
