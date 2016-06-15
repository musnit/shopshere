import { THREE } from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);
const TransformControls = require('three-transformcontrols');
import { forEach } from 'lodash';

const viewerSizeX = 800;
const viewerSizeY = 400;
const sphereRadius = 100;

const testImage = "/images/360_shop_from_aid.jpg";
const testImage2 = "/images/360_shop_1.jpg";
const prodHsImage = "/images/product_hs.jpg";
const navHsImage = "/images/nav_hs.jpg";

const imageAspectRatio = 2;

export default class SphereViewer {

  constructor(params) {
    this.mouse = {};
    this.openModal = params.openModal;
    this.openNewHSModal = params.openNewHSModal;

    this.drawingPoints = [];
    this.drawingMarkers = [];
    this.Hotspots = [];

    this.currentUnsavedHotspot = undefined;

    this.setupRenderer(params.domContainerElement);
    this.setupScene();
    this.setupCamera();
    this.setupSphereProjection(params.imageURL);
    this.setupViewerControls();
    this.setupHotspots();
    this.someOtherControlsCode();
    this.setupMouseTracker();
    this.setupClickEvent();
    this.reRender.call(this);
  }

  //  disableOrbit(){
  //    this.controls.enabled = !this.controls.enabled;
  //    //this.scene.remove(this.sphereMesh);
  // }

  setupRenderer(domContainerElement) {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(viewerSizeX, viewerSizeY);
    domContainerElement.appendChild(this.renderer.domElement);
  }

  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(75, viewerSizeX / viewerSizeY, 0.1, 1000);
  //camera.target = new THREE.Vector3(0, 0, 0);
  }

  setupSphereProjection(imageURL) {
    // creation of a big sphere geometry
    //THREE.SphereGeometry(SPHERE RADIUS, WIDTH SEGMENTS, HEIGHT SEGMENTS)
    this.sphere = new THREE.SphereGeometry(sphereRadius, 40, 40);
    this.sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

    // creation of the sphere material
    this.sphereMaterial = new THREE.MeshBasicMaterial();

    let loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    this.sphereMaterial.map = loader.load(imageURL);

    this.sphereMaterial.depthWrite = false;
    this.sphereMaterial.depthTest = false;

    // geometry + material = mesh (actual object)
    this.sphereMesh = new THREE.Mesh(this.sphere, this.sphereMaterial);
    this.sphereMesh.renderDepth = 1e20;
    this.scene.add(this.sphereMesh);
  }

  setupViewerControls() {
    //transform controls!!
    // let TControl = new TransformControls(this.camera, this.renderer.domElement);
    //TControl.addEventListener('change', this.reRender.bind(this));
    this.camera.position.x = -0.0001;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    //dont want to zoom out further than the radius of the sphere of our shopwindow
    this.controls.maxDistance = sphereRadius;
    //can only look down to 45 degrees ( dont wanna display floor)
    this.controls.minPolarAngle = Math.PI / 4.0;
    //can only look up to 45 degrees (dont wanna display ceiling)
    this.controls.maxPolarAngle = (3.0 * Math.PI) / 4.0;
    //this is disabled so you cant pan out of the sphere
    this.controls.enablePan = false;
    //autorotation - can disable too
    this.controls.autoRotate = false;
    this.controls.autoRotateSpeed = 0.5;
  //this.controls.enabled = true;
  }

  setupHotspots() {
    // //JACKETS
    // var geometry_hs_1 = new THREE.SphereGeometry( 90, 10, 10, 0, 0.5, 1, 0.6 );
    // geometry_hs_1.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
    // var material_hs_1 = new THREE.MeshBasicMaterial( { color: 0xfff68f, opacity: 0.5, transparent: true } );
    // this.hotspot1 = new THREE.Mesh( geometry_hs_1, material_hs_1 );
    // var quaternion = new THREE.Quaternion(-0.16815593676922186,0.01700779740021236,0.9856080075829905,0.00334331928233356);
    // this.hotspot1.rotation.setFromQuaternion(quaternion);
    // //this.scene.add( this.hotspot1 );
    // this.hotspot1.isHotspot = true;
    // this.hotspot1.name = 'jackets';
    // //this.Hotspots.push(this.hotspot1);

    // //BICYCLE
    // var geometry_hs_1 = new THREE.SphereGeometry( 90, 10, 10, 0, 0.25, 1, 0.6 );
    // geometry_hs_1.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
    // var material_hs_1 = new THREE.MeshBasicMaterial( { color: 0xfff68f, opacity: 0.5, transparent: true } );
    // this.hotspot2 = new THREE.Mesh( geometry_hs_1, material_hs_1 );
    // var quaternion_hs_2 = new THREE.Quaternion(-0.16258955772340344,0.5748515026788531,-0.3753630095464339,0.708669867339882);
    // this.hotspot2.rotation.setFromQuaternion(quaternion_hs_2);
    // //this.scene.add( this.hotspot2 );
    // this.hotspot2.isHotspot = true;
    // this.hotspot2.name = 'bike';
    // //this.Hotspots.push(this.hotspot2);


    // this.geometry_hs_3 = new THREE.SphereGeometry( 90, 10, 10, 0, 0.25, 1, 0.8 );
    // this.geometry_hs_3.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
    // var material_hs_1 = new THREE.MeshBasicMaterial( { color: 0xbe8fff, opacity: 0.5, transparent: true } );
    // this.hotspot3 = new THREE.Mesh( this.geometry_hs_3, material_hs_1 );

    // // var quaternion_hs_2 = new THREE.Quaternion(-0.16258955772340344,0.5748515026788531,-0.3753630095464339,0.708669867339882);
    // // this.hotspot2.rotation.setFromQuaternion(quaternion_hs_2);

    // //attempting to rotate according to xyz!

    // // var Mat = new THREE.Matrix4();

    // var xPoint = -45.77134193267549;
    // var yPoint = 18.08499658268368;
    // var zPoint = -86.86518506819539;

    // // var rotX;
    // // var rotY;
    // // var rotZ;

    // // if ( xPoint < 0 ) {
    // //   rotX = Math.atan2(zPoint,yPoint) + Math.PI;
    // // }
    // // else {
    // //   rotX = Math.atan2(zPoint,yPoint);
    // // }

    // // if ( yPoint < 0 ) {
    // //   rotY = Math.atan2(xPoint,zPoint) + Math.PI;
    // // }
    // // else {
    // //   rotY = Math.atan2(xPoint,zPoint);
    // // }

    // // if ( zPoint < 0 ) {
    // //   rotZ = Math.atan2(yPoint,xPoint) + Math.PI;
    // // }
    // // else {
    // //   rotZ = Math.atan2(yPoint,xPoint);
    // // }

    // // var Quat = new THREE.Quaternion();

    // // var Rot = new THREE.Euler( rotX, rotY, rotZ );
    // // Quat.setFromEuler( Rot );
    // // this.hotspot3.rotation.setFromQuaternion( Quat );

    // var vect = new THREE.Vector3( xPoint, yPoint, zPoint );
    // //this.hotspot3.lookAt(vect);

    // //this.scene.add( this.hotspot3 );
    // this.hotspot3.isHotspot = true;
    // this.hotspot3.name = 'test';

  }



  addNewProductHotspot(name, coords) {

    var map = new THREE.TextureLoader().load(prodHsImage);
    var material = new THREE.SpriteMaterial({
      map: map,
      color: 0xffffff,
      fog: true
    });
    var prodhs = new THREE.Sprite(material);

    prodhs.position.x = coords.x
    prodhs.position.y = coords.y
    prodhs.position.z = coords.z

    prodhs.isHotspot = true;
    prodhs.isProduct = true;
    prodhs.name = name;

    this.scene.add(prodhs);

    this.currentUnsavedHotspot = prodhs;

    var prodhsScalar = 10;

    prodhs.scale.x *= prodhsScalar
    prodhs.scale.y *= prodhsScalar
    prodhs.scale.z *= prodhsScalar

    this.Hotspots.push(prodhs);
  };

  addNewNavigationHotspot(name, coords) {

    var map = new THREE.TextureLoader().load(navHsImage);
    var material = new THREE.SpriteMaterial({
      map: map,
      color: 0xffffff,
      fog: true
    });
    var navhs = new THREE.Sprite(material);

    navhs.position.x = coords.x
    navhs.position.y = coords.y
    navhs.position.z = coords.z

    navhs.isHotspot = true;
    navhs.isNavigation = true;
    navhs.name = name;

    this.scene.add(navhs);

    this.currentUnsavedHotspot = navhs;

    var navhsScalar = 10;

    navhs.scale.x *= navhsScalar
    navhs.scale.y *= navhsScalar
    navhs.scale.z *= navhsScalar

    this.Hotspots.push(navhs);

  };


  saveNewHotspotLocation() {

    var outputPosition = {
      "X": this.currentUnsavedHotspot.position.x,
      "Y": this.currentUnsavedHotspot.position.y,
      "Z": this.currentUnsavedHotspot.position.z
    };

    var outputType;

    if (this.currentUnsavedHotspot.isProduct) {
      outputType = "product";
    } else if (this.currentUnsavedHotspot.isNavigation) {
      outputType = "navigation";
    }

    this.currentUnsavedHotspot = undefined;

    return [outputPosition, outputType];
  }

  changeBackgroundImage(imageURL) {
    let loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    this.sphereMaterial.map = loader.load(imageURL);
  }

  someOtherControlsCode() {
    //transform controls!!
    // TControl.attach( hotspot2 );
    // scene.add( TControl );
    // TControl.setMode( "rotate" );

    // listeners
    // document.addEventListener("mousedown", onDocumentMouseDown, false);
    // document.addEventListener("mousemove", onDocumentMouseMove, false);
  }

  setupMouseTracker() {
    var sphereGeom = new THREE.SphereGeometry(3, 3, 3);
    var sphere = new THREE.Mesh(sphereGeom, new THREE.MeshBasicMaterial({
      color: 0xff0000
    }));
    this.scene.add(sphere);
    this.mouseSphere = sphere;
    document.addEventListener('mousemove', (event) => {
      const viewpointX = this.renderer.domElement.offsetLeft;
      const viewpointY = this.renderer.domElement.offsetTop - window.scrollY;
      this.mouse.x = ((event.clientX - viewpointX) / viewerSizeX) * 2 - 1;
      this.mouse.y = -((event.clientY - viewpointY) / viewerSizeY) * 2 + 1;
    }, false);
  }

  updateMouseCursor() {
    const v3MouseCoords = new THREE.Vector3(this.mouse.x, this.mouse.y, 1);

    v3MouseCoords.unproject(this.camera);
    var ray = new THREE.Raycaster(this.camera.position, v3MouseCoords.sub(this.camera.position).normalize());

    var intersects = ray.intersectObjects([this.sphereMesh]);
    if (intersects.length > 0) {
      this.mouseSphere.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);
    //console.log(intersects[0].point.x);
    }
  }


  removeHotspots() {
    var viewportScene = this.scene;
    _.forEach(this.Hotspots, function(o) {
      viewportScene.remove(o);
    });
    this.Hotspots = [];
  }

  addAHotspot(hotspot) {

    var map
    var material
    var hs

    if (hotspot.type === "product") {
      map = new THREE.TextureLoader().load(prodHsImage);
    } else if (hotspot.type == "navigation") {
      map = new THREE.TextureLoader().load(navHsImage);
    }

    material = new THREE.SpriteMaterial({
      map: map,
      color: 0xffffff,
      fog: true
    });

    hs = new THREE.Sprite(material);
    hs.isHotspot = true;
    hs.hotspotID = hotspot.id;

    if (hotspot.type === "product") {
      hs.isProduct = true;
    } else if (hotspot.type == "navigation") {
      hs.isNavigation = true;
    }

    hs.position.y = hotspot.position["Y"];
    hs.position.x = hotspot.position["X"];
    hs.position.z = hotspot.position["Z"];

    var hsScalar = 10;


    hs.scale.x *= hsScalar
    hs.scale.y *= hsScalar
    hs.scale.z *= hsScalar

    this.scene.add(hs);

    this.Hotspots.push(hs);
  }


  setupClickEvent() {
    function onDocumentMouseUp(event) {
      event.preventDefault();

      if (event.target == this.renderer.domElement) {
        const v3MouseCoords = new THREE.Vector3(this.mouse.x, this.mouse.y, 1);

        v3MouseCoords.unproject(this.camera);
        var ray = new THREE.Raycaster(this.camera.position, v3MouseCoords.sub(this.camera.position).normalize());

        var intersects = ray.intersectObjects(this.Hotspots);

        if (intersects.length > 0) {
          if (intersects[0].object.isHotspot) {
            this.openModal(intersects[0].object.hotspotID);
          } else {

          }
        }
      }
    }
    document.addEventListener("mouseup", onDocumentMouseUp.bind(this), false);

    function onDocumentMouseDoubleclick(event) {
      event.preventDefault();

      if (event.target == this.renderer.domElement) {
        const v3MouseCoords = new THREE.Vector3(this.mouse.x, this.mouse.y, 1);

        v3MouseCoords.unproject(this.camera);
        var ray = new THREE.Raycaster(this.camera.position, v3MouseCoords.sub(this.camera.position).normalize());

        var intersects = ray.intersectObjects([this.sphereMesh]);

        if (intersects.length > 0) {
          //console.log(intersects[0].point);

          this.openNewHSModal(intersects[0].point);
        }
      }
    }
    document.addEventListener("dblclick", onDocumentMouseDoubleclick.bind(this), false);

  }

  reRender() {
    requestAnimationFrame(this.reRender.bind(this));
    this.updateMouseCursor.call(this);
    this.controls.update();
    // calling again render function
    this.renderer.render(this.scene, this.camera);
  }

}
