import * as THREE from 'three'

export const createMan = asset => {
    console.log(asset)
    const mixer = new THREE.AnimationMixer(asset.scene)

    const actions = {}
    const arrActions = []
    for (let i = 0; i < asset.animations.length; ++i) {
        const actionData = {
            clip: mixer.clipAction(asset.animations[i]),
            duration: asset.animations[i].duration * 1000,
            name: asset.animations[i].name,
        }
        actions[asset.animations[i].name] = actionData
        arrActions.push(actionData)
    }


    const iterate = i => {
        if (!arrActions[i]) {
            i = 0
        }

        const currentAction = arrActions[i]

        let prevAction
        if (!arrActions[i - 1]) {
            prevAction = arrActions[arrActions.length - 1]
        } else {
            prevAction = arrActions[i - 1]
        }

        console.log(currentAction.name, currentAction.duration, i)
        prevAction.clip.fadeOut(.3)
        setTimeout(() => { prevAction.clip.stop()}, 300)
        currentAction.clip.play()


        setTimeout(() => {
            iterate(i + 1)
        }, currentAction.duration - 300)
    }

    iterate(0)


    return {
        mesh: asset.scene,
        update: (delta = .014) => {
            mixer.update(delta)
        },
    }
}
