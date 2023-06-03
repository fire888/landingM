import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export const createStudio = () => {
    const CAM_POS = [0, 5, 15]
    const container = document.querySelector('.scene-container');


    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 45, (window.innerWidth - 30) / (window.innerHeight - 30), 0.01, 1000)
    camera.position.set(...CAM_POS)
    scene.add(camera)


    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 100, 100)
    scene.add(light)

    const ambLight = new THREE.AmbientLight(0x333333, .7)
    scene.add(ambLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    window.onresize = function () {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    };

    return {
        scene,
        addToScene(model) {
            scene.add(model)
        },
        render () {
            if (!camera) {
                return
            }

            renderer.render(scene, camera)
        },
        // resize () {
        //     if (!camera) {
        //         return;
        //     }
        //
        // },
    }
}
