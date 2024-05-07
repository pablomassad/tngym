const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync

// eslint-disable-next-line no-extend-native
String.prototype.lpad = function (padString, length) {
    let str = this
    while (str.length < length) str = padString + str
    return str.valueOf()
}

buildApk()
deployApk()

function updateVersion () {
    const bufVer = fs.readFileSync(path.join(__dirname, '/android-RingQR/app/src/main/java/com/pp/ringqr/RingQRApp.kt'))
    let strVer = bufVer.toString()

    let newVersionName$
    const regVer = /(([0-9]{1}.[0-9]{1,2}).([0-9]{2}))/gm
    strVer = strVer.replace(regVer, ($0, $1, $2, $3) => {
        // console.log('$0', $0) // 1.01.02
        // console.log('$1', $1) // 1.01.02
        // console.log('$2', $2) // 1.01
        // console.log('$3', $3) // 02
        const newBuildNum = Number($3) + 1
        const buildNum$ = newBuildNum.toString().lpad('0', 2)
        console.log('incrementa build num:', buildNum$)
        newVersionName$ = $2 + '.' + buildNum$

        const match = newVersionName$
        return match
    })
    fs.writeFileSync(path.join(__dirname, '/android-RingQR/app/src/main/java/com/pp/ringqr/RingQRApp.kt'), strVer, err => {
        if (err === null) {
            console.log('Actualizacion RingQRApp.kt => OK')
        } else {
            console.log('Error actualizando RingQRApp.kt: ', err)
        }
    })

    console.log('')
    console.log('')
    console.log('#########################')
    console.log('New Version ' + newVersionName$)
    console.log('#########################')
    console.log('')
}

function buildApk () {
    /// /////////////////////////////////////////////////////////////////////////////
    // GENERA nueva APK
    /// /////////////////////////////////////////////////////////////////////////////
    console.log('Genera nueva apk')
    console.log('...............................')

    execSync('quasar build', {
        stdio: 'inherit'
    })

    execSync('npx cap sync', {
        stdio: 'inherit'
    })

    process.chdir('android')

    // execSync('./gradlew assembleRelease', {
    //    stdio: 'inherit'
    // })
    execSync('./gradlew assembleDebug', {
        stdio: 'inherit'
    })
    process.chdir('..')
}
function deployApk (name) {
    console.log('')
    console.log('')
    console.log('######################')
    console.log('DEPLOY TO MyDrive')
    console.log('######################')

    /// /////////////////////////////////////////////////////////////////////////////
    // COPIA APK al destino
    /// /////////////////////////////////////////////////////////////////////////////
    const dest = '/Users/pablin/My Drive/PP/P&P Soft/TNGym/tnGym.apk'
    console.log('Copiando apk a: ', dest)
    fs.copyFileSync(
        './android/app/build/outputs/apk/debug/app-debug.apk',
        dest
    )

    console.log('##############')
    console.log('FIN SCRIPT APK')
    console.log('##############')
}
