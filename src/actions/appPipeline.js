const pause = t => new Promise(res => setTimeout(res, t))

const n = [
    '001_Fall, ' +
    '002_WalkIn, ' +
    '003_Walk_in_idle, ' +
    '003_Walk_in_idle_v2, ' +
    '003_Walk_in_idle_v3, ' +
    '004_Hand_Up, ' +
    '004_Hand_Up_idle, ' +
    '006_Stay_idle, ' +
    '007_Stay_idle_v2, ' +
    '008_Stay_idle_v3,'
]

// init
//   [-0.015186584490100186,2.580993849983665,8.140887590732211], [0.04273148731237106,3.163969765451038,-0.7911782765276592],
// empty
//    [1.4401782974230488,5.314372258200655,9.714156406157338], [0.6045532975733027,9.189646971709161,1.6886350628056923],
// stay
//    [-0.2376877029548008,5.623482173940577,4.021686891149502], [-1.3236988470875473,4.657521333780884,-1.1369165775098078],
// hand
//    [-1.3750365825094555,5.457025015496119,3.87603121306749], [-2.284380746991662,4.538553140535256,-1.9200587627319645],


// from left
//    [-5.8626284527412915,6.5527329292289815,5.63331226981754], [-7.798294796726759,4.3377417835775915,-0.25254966717983396],
// left
//    [-1.1596853010210098,4.912612112433626,7.2771044315870785], [1.894318189089734,3.0147230485472,-0.9202180496684969],


export async function appPipeline(root) {
    console.log(root)
    const {
        man,
        button,
        studio,
    } = root

    async function iterate () {
        studio.moveCameraTo([-0.015186584490100186,2.580993849983665,8.140887590732211], [0.04273148731237106,3.163969765451038,-0.7911782765276592], 45, 1)
        man.playAnimation('001_Fall', .3, true)
        await button.show()

        studio.moveCameraTo([1.4401782974230488,5.314372258200655,9.714156406157338], [0.6045532975733027,9.189646971709161,1.6886350628056923], 45, 100)
        await pause(100)

        studio.moveCameraTo( [-0.2376877029548008,5.623482173940577,4.021686891149502], [-1.3236988470875473,4.657521333780884,-1.1369165775098078], 45, 400)
        man.playAnimation('002_WalkIn', .3, false)
        await  pause(man.getCurrentActionDuration() - 300)

        man.playAnimation('003_Walk_in_idle', .3, true)
        await button.show()

        studio.moveCameraTo( [-1.3750365825094555,5.457025015496119,3.87603121306749], [-2.284380746991662,4.538553140535256,-1.9200587627319645], 45, 400)

        man.playAnimation('004_Hand_Up', .3, false)
        await  pause(man.getCurrentActionDuration() - 300)

        man.playAnimation('004_Hand_Up_idle', 1, true)
        await button.show()

        studio.moveCameraTo( [-5.8626284527412915,6.5527329292289815,5.63331226981754], [-7.798294796726759,4.3377417835775915,-0.25254966717983396], 45, 1)
        studio.moveCameraTo(  [-1.1596853010210098,4.912612112433626,7.2771044315870785], [1.894318189089734,3.0147230485472,-0.9202180496684969], 45, 1000)

        man.playAnimation('006_Stay_idle', 1, true)
        await button.show()
        iterate().then()
    }

    iterate().then()



}
