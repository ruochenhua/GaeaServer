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
    material = new THREE.MeshPhongMaterial({
        color: color.getHex(),
        specular: 0x00ff00,
        shinyness: 20
    });
    //material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    var light = new THREE.PointLight(0xFFFFFF, 1.5);
    light.position.set(10, 0, 80);
    scene.add(light);

    var light = new THREE.PointLight(0xFFFFFF, 1.5);
    light.position.set(25, 0, -80);
    scene.add(light);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    init_input_management();
}

function key_down_handle(e) {
    window.onkeydown = function(e) {
        switch (e.code) {
            case 'KeyW':
                mesh.position.y += 1.0;
                break;
            case 'KeyS':
                mesh.position.y -= 1.0;
                break;
            case 'KeyA':
                mesh.position.x -= 1.0;
                break;
            case 'KeyD':
                mesh.position.x += 1.0;
                break;
            default:
                break;
        }
    }
}

function mouse_down_handle(e) {

}

function init_input_management() {
    window.onkeydown = key_down_handle;
    window.onmousedown = mouse_down_handle;
}


function animate() {

    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
}
