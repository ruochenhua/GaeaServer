/*eslint-disable*/
var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
	
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.z = 10;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(2, 4, 2);
    var color = new THREE.Color("#7833aa");
    material = new THREE.MeshLambertMaterial({
        color: color.getHex()
    });
    //material = new THREE.MeshNormalMaterial();

    var light = new THREE.PointLight(0xFFFFFF, 1.5);
    light.position.set(10, 0, 80);
    scene.add(light);

    var light = new THREE.PointLight(0xFFFFFF, 1.5);
    light.position.set(25, 0, -80);
    scene.add(light);

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 15, 0);
    controls.maxPolarAngle = Math.PI / 2;
}

function animate() {

    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);

}
