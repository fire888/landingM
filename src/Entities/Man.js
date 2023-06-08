import * as THREE from 'three'

export const createMan = asset => {
    console.log(asset)
    const mixer = new THREE.AnimationMixer(asset.scene)

    //let s

    const actions = {}
    const arrActions = []
    for (let i = 0; i < asset.animations.length; ++i) {
        const actionData = {
            clip: mixer.clipAction(asset.animations[i]),
            duration: asset.animations[i].duration * 1000,
            name: asset.animations[i].name,
        }
        //s += asset.animations[i].name + ', '
        actions[asset.animations[i].name] = actionData
        arrActions.push(actionData)
    }
    //console.log(s)

    let currentAction = null
    let timeout = null

    //console.log(actions)



    // const iterate = i => {
    //     if (!arrActions[i]) {
    //         i = 0
    //     }
    //
    //     const currentAction = arrActions[i]
    //
    //     let prevAction
    //     if (!arrActions[i - 1]) {
    //         prevAction = arrActions[arrActions.length - 1]
    //     } else {
    //         prevAction = arrActions[i - 1]
    //     }
    //
    //     console.log(currentAction.name, currentAction.duration, i)
    //     prevAction.clip.fadeOut(.3)
    //     setTimeout(() => { prevAction.clip.stop()}, 300)
    //     currentAction.clip.play()
    //
    //
    //     setTimeout(() => {
    //         iterate(i + 1)
    //     }, currentAction.duration - 300)
    // }
    //
    // iterate(0)


    return {
        mesh: asset.scene,
        playAnimation: (animationKey, durationFade = .3, isRepeat = true, onComplete = () => {}) => {
            clearTimeout(timeout)

            let prevAction = currentAction
            if (prevAction) {
                prevAction.clip.fadeOut(durationFade)
                setTimeout(() => { prevAction.clip.stop() }, durationFade * 1000)
            }

            currentAction = actions[animationKey]
            currentAction.clip.play()
            if (isRepeat) {
                currentAction.clip.loop = THREE.LoopRepeat
            } else {
                currentAction.clip.loop = THREE.LoopOnce
            }
            currentAction.clip.clampWhenFinished = true
            timeout = setTimeout(onComplete, currentAction.duration)
        },
        getCurrentActionDuration: () => currentAction.duration,
        update: (delta = .014) => {
            mixer.update(delta)
        },
    }
}
