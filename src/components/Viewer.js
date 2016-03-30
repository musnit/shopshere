import React, { Component, PropTypes } from 'react';
import { THREE } from 'three';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Button } from 'react-bootstrap';
import Navbar from '../Navbar.js';

var OrbitControls = require('three-orbit-controls')(THREE);
var TransformControls = require('three-transformcontrols');

var controls = {};

class Viewer extends Component {

	disableOrbit(){
		console.log("here");
		console.log(controls);
		controls.enabled = !controls.enabled;
	}

	componentDidMount() {

		let image3 = "https://c1.staticflickr.com/1/155/331606921_19fe851c12_b.jpg";
		let image4 = "http://www.yurukaze.com/wp-content/uploads/2014/09/Suzunoya-Kimono-Shop-360-degree.jpg";
		let image5 = "https://upload.wikimedia.org/wikipedia/commons/7/71/Piccadilly_Arcade_360,_London_-_June_2009.jpg";
		let image6 = "https://i.ytimg.com/vi/4bhCnXOlRbg/maxresdefault.jpg";
		let image7 = "https://z-1-scontent-lax3-1.xx.fbcdn.net/hphotos-xfp1/v/t35.0-12/12675270_10154611510406102_593114028_o.jpg?oh=32848a29ee1a44305146b6f8da3ac4de&oe=56F43AE4";

		// panoramas background
		let panoramasArray = [image3];
		let panoramaNumber = Math.floor(Math.random()*panoramasArray.length);

		// setting up the renderer
		let renderer = new THREE.WebGLRenderer();
		renderer.setSize(800, 500);
		document.getElementById('viewer-placeholder').appendChild(renderer.domElement);

		// creating a new scene
		let scene = new THREE.Scene();

		// adding a camera
		let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		//camera.target = new THREE.Vector3(0, 0, 0);

		//transform controls!!
		let TControl = new TransformControls(camera, renderer.domElement);
		TControl.addEventListener( 'change', render );

		camera.position.z = -5;

		// creation of a big sphere geometry
		//THREE.SphereGeometry(SPHERE RADIUS, WIDTH SEGMENTS, HEIGHT SEGMENTS)
		let sphere = new THREE.SphereGeometry(100, 40, 40);
		sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

		// creation of the sphere material
		let sphereMaterial = new THREE.MeshBasicMaterial();

		let loader = new THREE.TextureLoader();
		loader.crossOrigin = "anonymous";
		sphereMaterial.map = loader.load(panoramasArray[panoramaNumber]);

		// geometry + material = mesh (actual object)
		let sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
		scene.add(sphereMesh);

    controls = new OrbitControls( camera );
    //dont want to zoom out further than the radius of the sphere of our shopwindow
    controls.maxDistance = 100;
    //can only look down to 45 degrees ( dont wanna display floor)
    controls.minPolarAngle = Math.PI/4.0;
    //can only look up to 45 degrees (dont wanna display ceiling)
    controls.maxPolarAngle  = (3.0*Math.PI)/4.0;
    //this is disabled so you cant pan out of the sphere
    controls.enablePan  = false;
    //autorotation - can disable too
    controls.autoRotate = false;
		controls.autoRotateSpeed = 0.5;

		var raycaster = new THREE.Raycaster();

		//adding one default hotspot here:


		var geometry1 = new THREE.SphereGeometry( 90, 10, 10, 0, 1.3, 1, 0.6 );
		geometry1.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
		var material1 = new THREE.MeshBasicMaterial( { color: 0x00a9ff, wireframe: true, vertexColors: THREE.FaceColors} );
		var sphere1 = new THREE.Mesh( geometry1, material1 );
		scene.add( sphere1 );



		//var geometry1 = new THREE.BoxGeometry( 1, 1, 1 );
		//var material1 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		//var cube = new THREE.Mesh( geometry1, material1 );
		//scene.add( cube );


		//transform controls!!
		TControl.attach( sphere1 );
		scene.add( TControl );
		TControl.setMode( "rotate" );

		// listeners
		// document.addEventListener("mousedown", onDocumentMouseDown, false);
		// document.addEventListener("mousemove", onDocumentMouseMove, false);

		// function onDocumentMouseUp( event ){
		// 	event.preventDefault();

		// 	if(event.target == renderer.domElement)
		// 	    {
		// 	    	isDragging = false;

		// 	    	var mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
		// 			var mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1;

		// 	        var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
		// 	        vector.unproject( camera );

		// 	        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
		// 	        var intersects = raycaster.intersectObjects( [sphereMesh] );
		// 	        // console.log("intersects.length: " + intersects.length);
		// 	        if ( intersects.length > 0 ) {
		// 	            // console.log("intersected objects");
		// 	            // console.log(intersects[0].point);
		// 	            // console.log(intersects[0].point.x);
		// 	            // console.log(intersects[0].point.y);
		// 	            // console.log(intersects[0].point.z);
		// 	            /* do stuff */

		// 	     //        var map2 = new THREE.TextureLoader().load( "../images/sprite2.png" );
  // 						// var material2 = new THREE.SpriteMaterial( { map: map2, color: 0xffffff, fog: true } );
  // 						// var sprite2 = new THREE.Sprite( material2 );
  //   				// 	sprite2.position.setX(intersects[0].point.x);
  //   				// 	sprite2.position.setY(intersects[0].point.y);
  //   				// 	sprite2.position.setZ(intersects[0].point.z);
  //   				// 	scene.add( sprite2 );

  //   					//SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)




		// 	        }
		// 	    }
		// }

		function render(){
			requestAnimationFrame(render);
			controls.update();
			// calling again render function
			renderer.render(scene, camera);
		}

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

		//document.addEventListener("mouseup", onDocumentMouseUp, false);

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

		window.addEventListener( 'resize', onWindowResize, false );

		function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

		render();
    }

  componentWillUnmount() {
    let canvasElement = document.getElementsByTagName("canvas");
    canvasElement[0].remove();
  }

  render() {
    return (
			<div>
      	<button
          className = "btn btn-lg btn-primary btn-block"
          type = "submit"
          onClick = {this.disableOrbit.bind(this)} >
          Toggle Camera Controls
        </button>
				<div id='viewer-placeholder'></div>
      </div>
    );
  }

};

export default Viewer;
