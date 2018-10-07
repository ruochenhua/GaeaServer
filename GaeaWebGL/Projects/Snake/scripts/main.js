/*eslint-disable*/
let camera, scene, renderer;
let plane_mesh, food_mesh;
let food_pos = [0, 0];

let snake_geo, snake_mat;
let snake_mesh = [];
let snake_grow = false;
let snake_vel = [0, 0];
let head_pos = [-10, -10];
const speed = 0.05;
init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.set(0, 25, 5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene = new THREE.Scene();

    snake_geo = new THREE.BoxGeometry(0.9, 1, 0.9);
    snake_mat = new THREE.MeshPhongMaterial({
        color: "#27aa41",
        specular: 0x00ff00,
    });

    let snake_mesh_part = new THREE.Mesh(snake_geo, snake_mat);
    snake_mesh_part.castShadow = true;
    snake_mesh_part.receiveShadow = false;
    snake_mesh_part.position.set(-10, 0, -10);
    scene.add(snake_mesh_part);
    snake_mesh.push(snake_mesh_part);

    //change the material for the rest of the snake
    snake_mat = new THREE.MeshPhongMaterial({
        color: "#34acaa",
        specular: "#112311",
    });

    let food_geo = new THREE.SphereGeometry(0.5);
    let food_mat = new THREE.MeshPhongMaterial({
        color: "#a00012",
        specular: 0x0f0f00,
    });

    food_mesh = new THREE.Mesh(food_geo, food_mat);

    food_mesh.position.set(food_pos[0],0,food_pos[1]);
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
             break;R
        case "KeyD":
            snake_vel[0] = speed;
            snake_vel[1] = 0;
            break;
    }
}

function update_snake_pos() {
    head_pos[0] += snake_vel[0];
    head_pos[1] += snake_vel[1];

    let new_pos = [Math.floor(head_pos[0]), Math.floor(head_pos[1])];

    //if new head position is the same as the old one, no need to update the position
    let follow_pos = [snake_mesh[0].position.x, snake_mesh[0].position.z]
    if(new_pos[0] === follow_pos[0] && new_pos[1] === follow_pos[1]) {
        return;
    }

    snake_mesh[0].position.x = new_pos[0];
    snake_mesh[0].position.z = new_pos[1];

    for(let i = 1; i < snake_mesh.length; i++) {
        //basically a swap operation
        let old_pos = [snake_mesh[i].position.x, snake_mesh[i].position.z];
        snake_mesh[i].position.x = follow_pos[0];
        snake_mesh[i].position.z = follow_pos[1];
        follow_pos[0] = old_pos[0];
        follow_pos[1] = old_pos[1];
    }

    if(snake_grow) {
        let snake_mesh_part = new THREE.Mesh(snake_geo, snake_mat);
        snake_mesh_part.castShadow = true;
        snake_mesh_part.receiveShadow = false;
        snake_mesh_part.position.set(follow_pos[0], 0 , follow_pos[1]);
        scene.add(snake_mesh_part);
        snake_mesh.push(snake_mesh_part);
        snake_grow = false;
    }
}


function detect_hit() {
    let snake_head = [snake_mesh[0].position.x, snake_mesh[0].position.z];
    if(snake_head[0] === food_pos[0] && snake_head[1] === food_pos[1]) {
        //grow snake
        snake_grow = true;
        //spaw new food
        while(food_pos[0] === snake_head[0] && food_pos[1] === snake_head[1]) {
            food_pos[0] = Math.round(Math.random() * 30 - 15);
            food_pos[1] = Math.round(Math.random() * 30 - 15);
        }

        food_mesh.position.set(food_pos[0],0,food_pos[1]);
        console.log("spaw new food", food_pos[0], food_pos[1]);
    }
}


function animate() {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    food_mesh.rotation.y += 0.01;

    update_snake_pos();
    detect_hit();
}
