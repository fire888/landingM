import * as THREE from 'three'
import { createStudio } from '../Entities/Studio'
import { loaderAssets } from '../Entities/LoaderAssets'
import { createMan } from '../Entities/Man'


export async function initPipeline (root) {
    const studio = createStudio()
    root.studio = studio
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0xff0000})
    )
    studio.addToScene(box)

    const loader = loaderAssets()
    const assets = await loader.loadAssets()
    const man = createMan(assets.man)
    root.man = man
    studio.addToScene(man.mesh)


    const clock = new THREE.Clock()
    const animate = () => {
        requestAnimationFrame(animate)
        const delta = clock.getDelta()
        root.man && root.man.update(delta)
        studio.render()
    }
    animate()

    return root
}
