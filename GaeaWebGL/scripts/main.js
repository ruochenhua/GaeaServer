/*eslint-disable*/
var camera, scene, renderer;
var geometry, material, mesh;
var look_at = [0,0,0];

var mouse_control_ins = new mouse_control();

function mouse_control() {
    this.last_x = 0;
    this.last_y = 0;
    this.press = false;
}

mouse_control.prototype.mouse_down = function (e) {
    this.last_x = e.clientX;
    this.last_y = e.clientY;

    this.press = true;
}

mouse_control.prototype.mouse_up = function(e) {
    console.log("mouse up " + e.clientX + " " + e.clientY);
    this.press = false;
}

mouse_control.prototype.mouse_move = function(e) {
    if(this.press) {
        var delta_x = e.clientX - this.last_x;
        var delta_y = e.clientY - this.last_y;

        camera.rotation.x += -delta_y * 0.01;
        camera.rotation.y += -delta_x * 0.01;

        this.last_x = e.clientX;
        this.last_y = e.clientY;
    }
}

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


function init_input_management() {
    window.onkeydown = key_down_handle;
    console.log(mouse_control_ins);

    window.onmousedown = mouse_control_ins.mouse_down;
    window.onmousemove = mouse_control_ins.mouse_move;
    window.onmouseup = mouse_control_ins.mouse_up;
}


function animate() {

    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;

    renderer.render(scene, camera);
}
