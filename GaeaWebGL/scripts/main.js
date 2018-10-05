/*eslint-disable*/
let camera, scene, renderer;
let geometry, material, mesh;
let cam_front = new THREE.Vector3(0, 0, -1);
let cam_right = new THREE.Vector3(-1, 0, 0);

const mouse_control_ins = new mouse_control();

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

        let front = new THREE.Vector3(0, 0, -1);
        cam_front = front.applyQuaternion(camera.quaternion);
        let right = new THREE.Vector3(-1, 0, 0);
        cam_right = right.applyQuaternion(camera.quaternion);

        this.last_x = e.clientX;
        this.last_y = e.clientY;
    }
}

function key_down_handle(e) {
    switch (e.code) {
        case 'KeyW':
            camera.position.add(cam_front);
            break;
        case 'KeyS':
            camera.position.sub(cam_front);
            break;
        case 'KeyA':
            camera.position.add(cam_right);
            break;
        case 'KeyD':
            camera.position.sub(cam_right);
            break;
        default:
            break;
    }
}

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.z = 10;
    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(2, 4, 2);
    var color = new THREE.Color("#7833aa");
    material = new THREE.MeshPhongMaterial({
        color: color.getHex(),
        specular: 0x00ff00,
        shinyness: 20
    });

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


    let grid_pos = new THREE.Vector3(0,0,0);
    let grid_decs = new GridDesc(101,101,2,grid_pos);
    let grid = grid_decs.CreateGrid();

    for(let i = 0; i < grid.length; ++i) {
        scene.add(grid[i]);
    }

    init_input_management();
}

function init_input_management() {
    window.addEventListener("keydown", key_down_handle);
    window.addEventListener("mousedown", mouse_control_ins.mouse_down);
    window.addEventListener("mousemove", mouse_control_ins.mouse_move);
    window.addEventListener("mouseup", mouse_control_ins.mouse_up);
}


function animate() {

    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;

    renderer.render(scene, camera);
}
