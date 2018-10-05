/*eslint-disable*/
let camera, scene, renderer;
let box_mesh, plane_mesh;
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

        camera.rotateOnWorldAxis(cam_right, delta_y * 0.01);
        camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -delta_x * 0.01);

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

    let box_geo = new THREE.BoxGeometry(2, 4, 2);
    let box_mat = new THREE.MeshPhongMaterial({
        color: "#27aa41",
        specular: 0x00ff00,
    });

    box_mesh = new THREE.Mesh(box_geo, box_mat);
    box_mesh.castShadow = true;
    box_mesh.receiveShadow = false;
    scene.add(box_mesh);

    //plane
    let plane_geo = new THREE.BoxGeometry(100, 1, 100);
    let plane_mat = new THREE.MeshStandardMaterial({
        color: "#d8cd0f",
    });
    plane_mesh = new THREE.Mesh(plane_geo, plane_mat);
    plane_mesh.position.set(0, -3, 0);
    plane_mesh.receiveShadow = true;
   // plane_mesh.rotation.set(0, 90, 0);
    scene.add(plane_mesh);

    let p_light = new THREE.PointLight("#aa435d", 1, 100);
    p_light.position.set(10, 20, 10);
    p_light.castShadow = true;
    scene.add(p_light);

    let d_light = new THREE.DirectionalLight("#345671", 1, 100);
    d_light.position.set(-1, 1, -1);
    d_light.castShadow = true;
    scene.add(d_light);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;


    document.body.appendChild(renderer.domElement);


    let grid_pos = new THREE.Vector3(0,0,0);
    let grid_decs = new GridDesc(11,11,2,grid_pos);
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

    box_mesh.rotation.x += 0.01;

    renderer.render(scene, camera);
}
