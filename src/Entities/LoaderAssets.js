import birdSrc from '../assets/Mts Animation Set 12 06.glb'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
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
