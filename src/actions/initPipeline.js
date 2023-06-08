import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { createStudio } from '../Entities/Studio'
import { loaderAssets } from '../Entities/LoaderAssets'
import { createMan } from '../Entities/Man'


export async function initPipeline (root) {
    const studio = createStudio()

    const clock = new THREE.Clock()
    const animate = () => {
        requestAnimationFrame(animate)
        const delta = clock.getDelta()
        TWEEN.update()
        root.man && root.man.update(delta)
        root.studio && studio.render()
    }
    animate()


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
    man.mesh.position.z = -1
    studio.addToScene(man.mesh)

    const button = document.createElement('button')
    button.innerText = 'NEXT'
    button.style.position = 'absolute'
    button.style.top = '0'
    button.style.left = '0'
    button.style.zIndex = '100'
    button.style.padding = '20px'
    button.style.display = 'none'
    document.body.appendChild(button)
    root.button = button
    button.show = () => {
        return new Promise(res => {
            button.style.display = 'block'
            const f = () => {
                button.style.display = 'none'
                button.removeEventListener('click', f)
                res()
            }
            button.addEventListener('click', f)
        })
    }

    return root
}
