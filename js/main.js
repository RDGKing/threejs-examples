import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, controls, scene, renderer;

init();
//render(); // remove when using animation loop

function init() { // Inicializa

    scene = new THREE.Scene(); // Instancia el ojeto scenee
    scene.background = new THREE.Color(0x87d2fa);
    scene.fog = new THREE.FogExp2(0x05780d, 0.002);

    console.log(scene);

    /* El antialias refina los elementos 3D */
    renderer = new THREE.WebGLRenderer({ antialias: true });
    /* Coloca el tamaño del pixel con respecto al pixel de la pantalla */
    renderer.setPixelRatio(window.devicePixelRatio);
    /* Tamaño de animacion - El mismo de la pantalla*/
    renderer.setSize(window.innerWidth, window.innerHeight);
    /* Funcion que hara la "animacion" */
    renderer.setAnimationLoop(animate);
    /* Pone el render en el html */
    document.body.appendChild(renderer.domElement);
    /* Coloca una camara de forma predeterminada, Angulo 60 grados - Tamaño de camara - Minimo acercamiento - Maximo acercamiento */
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(200, 400, 900);

    // controls
    /* El control de la camara */
    controls = new OrbitControls(camera, renderer.domElement);
    /* Poder usar teclas para el movimiento */
    controls.listenToKeyEvents(window); // optional

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.015;

    /* Si es false se desplaza por toda la camara */
    controls.screenSpacePanning = false;


    /* Distancias minimas y maximas a las que voy a trabajar */
    controls.minDistance = 100;
    controls.maxDistance = 500;

    /* Girar como una esfera */
    controls.maxPolarAngle = Math.PI / 2;

    // world

    /* Crear cono */
    const geometry = new THREE.ConeGeometry(10, 80, 6, 1);
    /* Texturicad de el cono - Material reflejante */
    const material = new THREE.MeshPhongMaterial({ color: 0xde6f33, flatShading: true });

    for (let i = 0; i < 200; i++) {

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 1600 - 800;
        mesh.position.y = 0;
        mesh.position.z = Math.random() * 1600 - 800;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        scene.add(mesh);

    }

    // lights
    /* Luces que inciden sobre el objeto - Hay dos fuentes */
    const dirLight1 = new THREE.DirectionalLight(0xd2de2c, 3);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x002288, 3);
    dirLight2.position.set(- 1, - 1, - 1);
    scene.add(dirLight2);

    /* Luz ambiental */

    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

/* Funcion que hara la "animacion" */
function animate() {
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    render();
}

function render() {

    renderer.render(scene, camera);

}
