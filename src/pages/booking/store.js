import { reactive, readonly } from 'vue'
import fb from 'fwk-q-firebase'
import { ui } from 'fwk-q-ui'

let srv

const state = reactive({
    days: [
        {
            day: 'lunes 1'
        },
        {
            day: 'martes 2'
        },

        {
            day: 'miercoles 3'
        },
        {
            day: 'jueves 4'
        }
    ]
})
const actions = {
    async getPrev (day) {
        console.log('store getPrev:', day)
    },
    async getNext (day) {
        console.log('store getNext:', day)
    }
}

export default {
    state: readonly(state),
    actions
}
