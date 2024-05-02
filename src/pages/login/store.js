import { reactive, readonly } from 'vue'
import axios from 'redaxios'
import fb from 'fwk-q-firebase'
import { ui } from 'fwk-q-ui'

let srv

const state = reactive({
})
const actions = {
    async login (val, email, pass, name) {
        let result
        switch (val) {
            case 'login':
                result = await fb.loginFirebase(email, pass)
                break
            case 'register':
                result = await fb.register(name, email, pass)
                break
            case 'google':
                result = await fb.loginGoogle()
                break
        }
        console.log('result login:', result)
        return result
    },
    forgotPass (email) {
        fb.forgotPassword(email)
    }
}

export default {
    state: readonly(state),
    actions
}
