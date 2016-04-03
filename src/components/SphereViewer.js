import { THREE } from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);
const TransformControls = require('three-transformcontrols');

const viewerSizeX = 800;
const viewerSizeY = 500;
const testImage = "/images/360_shop_from_aid.jpg";

export default class SphereViewer {

  constructor(params){
    this.setupRenderer(params.domContainerElement);
    this.setupScene();
    this.setupCamera();
		this.setupViewerControls();
		this.setupSphereProjection();
    this.setupRayCaster();
    this.setupDefaultHotspot();
    this.setupPreloadHotspots();
    this.someOtherControlsCode();
    this.setupMouseStuff();
    this.setupWindowResized();
    this.reRender.call(this);
  }

  disableOrbit(){
    this.controls.enabled = !this.controls.enabled;
	}

  setupRenderer(domContainerElement) {
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(viewerSizeX, viewerSizeY);
		domContainerElement.appendChild(this.renderer.domElement);
	}

  setupScene(){
		this.scene = new THREE.Scene();
  }

  setupCamera(){
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		//camera.target = new THREE.Vector3(0, 0, 0);
  }

  setupViewerControls() {
		//transform controls!!
		let TControl = new TransformControls(this.camera, this.renderer.domElement);
		TControl.addEventListener('change', this.reRender.bind(this));
		this.camera.position.z = -80;

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    //dont want to zoom out further than the radius of the sphere of our shopwindow
    this.controls.maxDistance = 100;
    //can only look down to 45 degrees ( dont wanna display floor)
    this.controls.minPolarAngle = Math.PI/4.0;
    //can only look up to 45 degrees (dont wanna display ceiling)
    this.controls.maxPolarAngle  = (3.0*Math.PI)/4.0;
    //this is disabled so you cant pan out of the sphere
    this.controls.enablePan  = false;
    //autorotation - can disable too
    this.controls.autoRotate = false;
		this.controls.autoRotateSpeed = 0.5;
		//this.controls.enabled = false;
	}

	setupSphereProjection() {
		// creation of a big sphere geometry
		//THREE.SphereGeometry(SPHERE RADIUS, WIDTH SEGMENTS, HEIGHT SEGMENTS)
		this.sphere = new THREE.SphereGeometry(100, 40, 40);
		this.sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

		// creation of the sphere material
		let sphereMaterial = new THREE.MeshBasicMaterial();

		let loader = new THREE.TextureLoader();
		loader.crossOrigin = "anonymous";
		sphereMaterial.map = loader.load(testImage);

		// geometry + material = mesh (actual object)
		let sphereMesh = new THREE.Mesh(this.sphere, sphereMaterial);
		this.scene.add(sphereMesh);
	}

  setupRayCaster() {
    this.raycaster = new THREE.Raycaster();
  }

  setupDefaultHotspot(){
    //adding one default hotspot here:
		var geometry1 = new THREE.SphereGeometry( 90, 10, 10, 0, 1.3, 1, 0.6 );
		geometry1.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
		var material1 = new THREE.MeshBasicMaterial( { color: 0x00a9ff, wireframe: true, vertexColors: THREE.FaceColors} );
		var sphere1 = new THREE.Mesh( geometry1, material1 );
		// this.scene.add( sphere1 );

    //var geometry1 = new THREE.BoxGeometry( 1, 1, 1 );
    //var material1 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    //var cube = new THREE.Mesh( geometry1, material1 );
    //this.scene.add( cube );
  }

  setupPreloadHotspots(){
		//BOOTS
		var geometry_hs_1 = new THREE.SphereGeometry( 90, 10, 10, 0, 0.5, 1, 0.6 );
		geometry_hs_1.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
		var material_hs_1 = new THREE.MeshBasicMaterial( { color: 0xfff68f, opacity: 0.5, transparent: true } );
		this.hotspot1 = new THREE.Mesh( geometry_hs_1, material_hs_1 );
		var quaternion = new THREE.Quaternion(-0.16815593676922186,0.01700779740021236,0.9856080075829905,0.00334331928233356);
  	this.hotspot1.rotation.setFromQuaternion(quaternion);
		this.scene.add( this.hotspot1 );

		//BICYCLE
		var geometry_hs_1 = new THREE.SphereGeometry( 90, 10, 10, 0, 0.5, 1, 0.6 );
		geometry_hs_1.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
		var material_hs_1 = new THREE.MeshBasicMaterial( { color: 0xfff68f, opacity: 0.5, transparent: true } );
		var hotspot2 = new THREE.Mesh( geometry_hs_1, material_hs_1 );
		var quaternion_hs_2 = new THREE.Quaternion(-0.16258955772340344,0.5748515026788531,-0.3753630095464339,0.708669867339882);
		hotspot2.rotation.setFromQuaternion(quaternion_hs_2);
		this.scene.add( hotspot2 );
  }

  someOtherControlsCode(){
    //transform controls!!
		// TControl.attach( hotspot2 );
		// scene.add( TControl );
		// TControl.setMode( "rotate" );

		// listeners
		// document.addEventListener("mousedown", onDocumentMouseDown, false);
		// document.addEventListener("mousemove", onDocumentMouseMove, false);
  }

  setupMouseStuff() {
    function onDocumentMouseUp( event ){
			event.preventDefault();

			if(event.target == this.renderer.domElement)
			    {
			    	var mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
					var mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1;

			        var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
			        vector.unproject( this.camera );

			        var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
			        var intersects = raycaster.intersectObjects( [this.hotspot1] );
			        // console.log("intersects.length: " + intersects.length);
			        if ( intersects.length > 0 ) {
			        	console.log(intersects.length);
			        	console.log(intersects[0].object.quaternion);
			        	console.log(intersects)

			            // console.log("intersected objects");
			            // console.log(intersects[0].point);
			            // console.log(intersects[0].point.x);
			            // console.log(intersects[0].point.y);
			            // console.log(intersects[0].point.z);
			            /* do stuff */

			     //        var map2 = new THREE.TextureLoader().load( "../images/sprite2.png" );
  						// var material2 = new THREE.SpriteMaterial( { map: map2, color: 0xffffff, fog: true } );
  						// var sprite2 = new THREE.Sprite( material2 );
    				// 	sprite2.position.setX(intersects[0].point.x);
    				// 	sprite2.position.setY(intersects[0].point.y);
    				// 	sprite2.position.setZ(intersects[0].point.z);
    				// 	scene.add( sprite2 );

    					//SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)




			        }
			    }
		}

		document.addEventListener("mouseup", onDocumentMouseUp.bind(this), false);


		// let isDragging = false;
		// let previousMousePosition = {
		// 	x: 0,
		// 	y: 0
		// }

		// //MOUSEDOWN
		// function onDocumentMouseDown( event ) {

		// 	event.preventDefault();

		// 	if(event.target == renderer.domElement) {
		// 		isDragging = true;
		// 		console.log("successful mousedown");
		// 	}


		// };

		//document.addEventListener("mousedown", onDocumentMouseDown, false);

		//document.addEventListener("mousemove", onDocumentMouseMove, false);



		//commented out to test performance increase
		// document.addEventListener( 'dragover', function ( event ) {

		// 			event.preventDefault();
		// 			event.dataTransfer.dropEffect = 'copy';

		// 		}, false );


		// document.addEventListener( 'dragenter', function ( event ) {

		// 			document.body.style.opacity = 0.5;

		// 		}, false );

		// document.addEventListener( 'dragleave', function ( event ) {
		// 			document.body.style.opacity = 1;
		// 		}, false );

		// document.addEventListener( 'drop', function ( event ) {
		// 			event.preventDefault();
		// 			var reader = new FileReader();

		// 			reader.addEventListener( 'load', function ( event ) {

		// 				sphereMaterial.map.image.src = event.target.result;
		// 				sphereMaterial.map.needsUpdate = true;

		// 			}, false );

		// 			reader.readAsDataURL( event.dataTransfer.files[ 0 ] );
		// 			document.body.style.opacity = 1;
		// 		}, false );
		// 		//
  }

  setupWindowResized() {
    window.addEventListener( 'resize', onWindowResize.bind(this), false );
		function onWindowResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(viewerSizeX, viewerSizeY);
		}
  }

  reRender() {
    requestAnimationFrame(this.reRender.bind(this));
    this.controls.update();
    // calling again render function
    this.renderer.render(this.scene, this.camera);
  }

}
