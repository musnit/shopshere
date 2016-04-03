import { THREE } from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);
const TransformControls = require('three-transformcontrols');

const viewerSizeX = 800;
const viewerSizeY = 400;
const sphereRadius = 100;

const testImage = "/images/360_shop_from_aid.jpg";
const imageAspectRatio = 2;

export default class SphereViewer {

  constructor(params){
    this.mouse = {};
    this.setupRenderer(params.domContainerElement);
    this.setupScene();
    this.setupCamera();
    this.setupSphereProjection();
		this.setupViewerControls();
    this.setupHotspots();
    this.someOtherControlsCode();
    this.setupMouseTracker();
    this.setupClickEvent();
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
		this.camera = new THREE.PerspectiveCamera(75, viewerSizeX / viewerSizeY, 0.1, 1000);
		//camera.target = new THREE.Vector3(0, 0, 0);
  }

  setupSphereProjection() {
		// creation of a big sphere geometry
		//THREE.SphereGeometry(SPHERE RADIUS, WIDTH SEGMENTS, HEIGHT SEGMENTS)
		this.sphere = new THREE.SphereGeometry(sphereRadius, 40, 40);
		this.sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

		// creation of the sphere material
		let sphereMaterial = new THREE.MeshBasicMaterial();

		let loader = new THREE.TextureLoader();
		loader.crossOrigin = "anonymous";
		sphereMaterial.map = loader.load(testImage);

		// geometry + material = mesh (actual object)
		this.sphereMesh = new THREE.Mesh(this.sphere, sphereMaterial);
		this.scene.add(this.sphereMesh);
	}

  setupViewerControls() {
		//transform controls!!
		let TControl = new TransformControls(this.camera, this.renderer.domElement);
		//TControl.addEventListener('change', this.reRender.bind(this));
		this.camera.position.z = 0.0001;

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    //dont want to zoom out further than the radius of the sphere of our shopwindow
    this.controls.maxDistance = sphereRadius;
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

  setupHotspots(){
		//BOOTS
		var geometry_hs_1 = new THREE.SphereGeometry( 90, 10, 10, 0, 0.5, 1, 0.6 );
		geometry_hs_1.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
		var material_hs_1 = new THREE.MeshBasicMaterial( { color: 0xfff68f, opacity: 0.5, transparent: true } );
		this.hotspot1 = new THREE.Mesh( geometry_hs_1, material_hs_1 );
		var quaternion = new THREE.Quaternion(-0.16815593676922186,0.01700779740021236,0.9856080075829905,0.00334331928233356);
  	this.hotspot1.rotation.setFromQuaternion(quaternion);
		this.scene.add( this.hotspot1 );
    this.hotspot1.isHotspot = true;
    this.hotspot1.name = 'boots';

		//BICYCLE
		var geometry_hs_1 = new THREE.SphereGeometry( 90, 10, 10, 0, 0.25, 1, 0.6 );
		geometry_hs_1.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
		var material_hs_1 = new THREE.MeshBasicMaterial( { color: 0xfff68f, opacity: 0.5, transparent: true } );
		this.hotspot2 = new THREE.Mesh( geometry_hs_1, material_hs_1 );
		var quaternion_hs_2 = new THREE.Quaternion(-0.16258955772340344,0.5748515026788531,-0.3753630095464339,0.708669867339882);
		this.hotspot2.rotation.setFromQuaternion(quaternion_hs_2);
		this.scene.add( this.hotspot2 );
    this.hotspot2.isHotspot = true;
    this.hotspot2.name = 'bike';
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

  setupMouseTracker() {
    var newSphereGeom = new THREE.SphereGeometry(5,5,5);
  	var sphere = new THREE.Mesh(newSphereGeom, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
  	this.scene.add(sphere);
  	this.mouseSphere = sphere;
    document.addEventListener( 'mousemove', (event) => {
      const viewpointX = this.renderer.domElement.offsetLeft;
      const viewpointY = this.renderer.domElement.offsetTop - window.scrollY;
    	this.mouse.x = ((event.clientX - viewpointX)/viewerSizeX) * 2 - 1;
    	this.mouse.y = - ((event.clientY - viewpointY)/viewerSizeY) * 2 + 1;
    }, false );
  }

  updateMouseCursor() {
    const v3MouseCoords = new THREE.Vector3( this.mouse.x , this.mouse.y , 1 );

    v3MouseCoords.unproject( this.camera );
    var ray = new THREE.Raycaster( this.camera.position, v3MouseCoords.sub( this.camera.position ).normalize() );

    var intersects = ray.intersectObjects( [this.sphereMesh] );
    if ( intersects.length > 0 ) {
      this.mouseSphere.position.set(intersects[0].point.x,intersects[0].point.y,intersects[0].point.z);
    }
  }

  setupClickEvent() {
    function onDocumentMouseUp( event ){
			event.preventDefault();

			if(event.target == this.renderer.domElement) {
        const v3MouseCoords = new THREE.Vector3( this.mouse.x , this.mouse.y , 1 );

        v3MouseCoords.unproject( this.camera );
        var ray = new THREE.Raycaster( this.camera.position, v3MouseCoords.sub( this.camera.position ).normalize() );

        var intersects = ray.intersectObjects( [this.hotspot1, this.hotspot2, this.sphereMesh] );

        if ( intersects.length > 0 ) {
          if (intersects[0].object.isHotspot){
            console.log("hit " + intersects[0].object.name + " at " + intersects[0].point);
          }
          else {
            const rectLength = 20, rectWidth = 20;
            const originX = intersects[0].point.x;
            const originY = intersects[0].point.y;
            var rectShape = new THREE.Shape();
            rectShape.moveTo( originX, originY );
            rectShape.lineTo( originX, rectWidth + originY );
            rectShape.lineTo( originX + rectLength, rectWidth + originY );
            rectShape.lineTo( originX + rectLength, originY );
            rectShape.lineTo( originX, originY );

            var rectGeom = new THREE.ShapeGeometry( rectShape );
            const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
            material.side = THREE.DoubleSide;
            var rectMesh = new THREE.Mesh( rectGeom, material) ;
            this.scene.add( rectMesh );

            var geometry = new THREE.BoxGeometry( 5, 5, 5 );
            var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
            var cube = new THREE.Mesh( geometry, material );
            this.scene.add( cube );
            cube.position.x = intersects[0].point.x;
            cube.position.y = intersects[0].point.y;
            cube.position.z = intersects[0].point.z;
          }
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

  reRender() {
    requestAnimationFrame(this.reRender.bind(this));
    this.updateMouseCursor.call(this);
    this.controls.update();
    // calling again render function
    this.renderer.render(this.scene, this.camera);
  }

}
