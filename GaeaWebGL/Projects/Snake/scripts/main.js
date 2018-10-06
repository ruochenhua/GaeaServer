/*eslint-disable*/
let camera, scene, renderer;
let plane_mesh, food_mesh;
let snake_mesh = [];
let snake_vel = [0, 0];
let head_pos = [0, 0];
const speed = 0.05;
init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.set(0, 5, 5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene = new THREE.Scene();

    let box_geo = new THREE.BoxGeometry(1, 1, 1);
    let box_mat = new THREE.MeshPhongMaterial({
        color: "#27aa41",
        specular: 0x00ff00,
    });

    let box_mesh = new THREE.Mesh(box_geo, box_mat);
    box_mesh.castShadow = true;
    box_mesh.receiveShadow = false;
    scene.add(box_mesh);
    snake_mesh.push(box_mesh);

    let food_geo = new THREE.SphereGeometry(0.5);
    let food_mat = new THREE.MeshPhongMaterial({
        color: "#a00012",
        specular: 0x0f0f00,
    });

    food_mesh = new THREE.Mesh(food_geo, food_mat);
    food_mesh.position.set(0,0,0);
    food_mesh.castShadow = true;
    food_mesh.receiveShadow = false;
    scene.add(food_mesh);
    //plane
    let plane_geo = new THREE.BoxGeometry(30, 0.1, 30);
    let plane_mat = new THREE.MeshStandardMaterial({
        color: "#d8cd0f",
    });
    plane_mesh = new THREE.Mesh(plane_geo, plane_mat);
    plane_mesh.position.set(0, -3, 0);
    plane_mesh.receiveShadow = true;

    scene.add(plane_mesh);
    let a_light = new THREE.AmbientLight("#919198", 1);
    scene.add(a_light);
/*
    let d_light = new THREE.DirectionalLight("#716b20", 1, 100);
    d_light.position.set(-5, 10, -5);
    d_light.castShadow = true;
    scene.add(d_light);
    */

    let p_light = new THREE.PointLight("#aa435d", 5, 100);
    p_light.position.set(10, 20, 10);
    p_light.castShadow = true;
    p_light.shadow.mapSize.width = 2048;
    p_light.shadow.mapSize.height = 2048;
    scene.add(p_light);


    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;


    document.body.appendChild(renderer.domElement);

    window.addEventListener("keydown", key_down_handle);
}

function key_down_handle(e) {
    switch (e.code) {
        case "KeyW":
            snake_vel[0] = 0;
            snake_vel[1] = -speed;
            break;
        case "KeyS":
            snake_vel[0] = 0;
            snake_vel[1] = speed;
            break;
        case "KeyA":
            snake_vel[0] = -speed;
            snake_vel[1] = 0;
             break;
        case "KeyD":
            snake_vel[0] = speed;
            snake_vel[1] = 0;
            break;
    }
}

function update_snake_pos() {
    head_pos[0] += snake_vel[0];
    head_pos[1] += snake_vel[1];
    snake_mesh[0].position.x = Math.floor(head_pos[0]);
    snake_mesh[0].position.z = Math.floor(head_pos[1]);
}


function animate() {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    food_mesh.rotation.y += 0.01;

    update_snake_pos();
}
