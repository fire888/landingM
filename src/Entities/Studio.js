import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js"
//import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export const createStudio = () => {
    const CAM_POS = [0, 3, 10]
    const container = document.querySelector('.scene-container');


    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000)
    camera.position.set(...CAM_POS)
    scene.add(camera)

    const camTarget = new THREE.Vector3(0, 3, 0)
    camera.lookAt(camTarget)


    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(0x222222)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 100, 100)
    scene.add(light)

    const lightA = new THREE.AmbientLight( 0x404040 )
    scene.add( lightA );

    //const controls = new OrbitControls(camera, renderer.domElement)
    //controls.update()

    window.onresize = function () {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    };

    document.addEventListener("keydown", (event) => {
        //console.log(`[${ camera.position.toArray()}], [${ controls.target.toArray()}],`)
        // do something
    });
    let tween

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
        moveCameraTo (
            camPos = [0, 0, 0],
            targetPos = [0, 0, 0],
            fov = 45,
            duration = 1000,
            type = TWEEN.Easing.Quadratic.InOut
        ) {
            if (tween) {
                tween.stop()
            }
            const data = {
                camPos: camera.position.toArray(),
                targetPos: camTarget.toArray(),
                fov: camera.fov,
            }

            tween = new TWEEN.Tween(data)
                .to({
                    camPos,
                    targetPos,
                    fov,
                }, duration)
                .easing(type)
                .onUpdate(() => {
                        //console.log(data)
                        camera.position.fromArray(data.camPos)
                        camTarget.fromArray(data.targetPos)
                        camera.lookAt(camTarget)
                        camera.fov = data.fov
                })
                .start()
        }
    }
}
