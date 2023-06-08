import birdSrc from '../assets/Mts Animation Set V3.glb'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export const loaderAssets = () => {
    return {
        loadAssets: () => {
            return new Promise(res => {
                const loader = new GLTFLoader()
                loader.load(birdSrc, model => {
                    res({ man: model })
                })
            })
        }
    }
}
