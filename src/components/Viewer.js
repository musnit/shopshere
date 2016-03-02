import React, { Component, PropTypes } from 'react';
import { THREE } from 'three';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput } from 'react-bootstrap';
import Navbar from '../Navbar.js';






class Viewer extends Component {

	componentDidMount() {
	    let manualControl = false;
		let longitude = 0;
		let latitude = 0;
		let savedX;
		let savedY;
		let savedLongitude;
		let savedLatitude;

		//let image1 = "http://blog.360cities.net/wp-content/uploads/2012/05/5225.jpg";
		//let image2 = "https://www.marchebacchus.com/wp-content/themes/MB-Template/images/wine-shop-360degree.jpg";
		let image3 = "https://c1.staticflickr.com/1/155/331606921_19fe851c12_b.jpg";
		let image4 = "http://www.yurukaze.com/wp-content/uploads/2014/09/Suzunoya-Kimono-Shop-360-degree.jpg";
		let image5 = "https://upload.wikimedia.org/wikipedia/commons/7/71/Piccadilly_Arcade_360,_London_-_June_2009.jpg";
		let image6 = "https://i.ytimg.com/vi/4bhCnXOlRbg/maxresdefault.jpg";

		// panoramas background
		let panoramasArray = [image3];
		let panoramaNumber = Math.floor(Math.random()*panoramasArray.length);

		// setting up the renderer
		let renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		// creating a new scene
		let scene = new THREE.Scene();

		// adding a camera
		let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		camera.target = new THREE.Vector3(0, 0, 0);

		// creation of a big sphere geometry
		let sphere = new THREE.SphereGeometry(100, 100, 40);
		sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

		// creation of the sphere material
		let sphereMaterial = new THREE.MeshBasicMaterial();

		let loader = new THREE.TextureLoader();
		loader.crossOrigin = "anonymous";
		sphereMaterial.map = loader.load(panoramasArray[panoramaNumber]);

		// geometry + material = mesh (actual object)
		let sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
		scene.add(sphereMesh);

		// listeners
		document.addEventListener("mousedown", onDocumentMouseDown, false);
		document.addEventListener("mousemove", onDocumentMouseMove, false);
		document.addEventListener("mouseup", onDocumentMouseUp, false);
			
		render();
		   
		function render(){
			
			requestAnimationFrame(render);
			
			if(!manualControl){
				longitude += 0.1;
			}

			// limiting latitude from -85 to 85 (cannot point to the sky or under your feet)
		        latitude = Math.max(-85, Math.min(85, latitude));

			// moving the camera according to current latitude (vertical movement) and longitude (horizontal movement)
			camera.target.x = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.cos(THREE.Math.degToRad(longitude));
			camera.target.y = 500 * Math.cos(THREE.Math.degToRad(90 - latitude));
			camera.target.z = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.sin(THREE.Math.degToRad(longitude));
			camera.lookAt(camera.target);

			// calling again render function
			renderer.render(scene, camera);
			
		}

		// when the mouse is pressed, we switch to manual control and save current coordinates
		function onDocumentMouseDown(event){

			event.preventDefault();

			manualControl = true;

			savedX = event.clientX;
			savedY = event.clientY;

			savedLongitude = longitude;
			savedLatitude = latitude;

		}

		// when the mouse moves, if in manual contro we adjust coordinates
		function onDocumentMouseMove(event){

			if(manualControl){
				longitude = (savedX - event.clientX) * 0.1 + savedLongitude;
				latitude = (event.clientY - savedY) * 0.1 + savedLatitude;
			}

		}

		// when the mouse is released, we turn manual control off
		function onDocumentMouseUp(event){

			manualControl = false;

		}
    }


  render() {
    return (
<div>
      <Navbar> </Navbar>
      <div>

      	<h1> Viewer </h1>

      </div>

      </div>
    );
  }
  	
};


export default Viewer;