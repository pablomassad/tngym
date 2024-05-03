import { reactive, readonly } from 'vue'
import fb from 'fwk-q-firebase'
import { ui } from 'fwk-q-ui'

let srv

const state = reactive({
    bookings: [
        {
            id: 240505,
            shifts: [
                {
                    id: '8',
                    users: [
                        {
                            id: 'pmassad@yahoo.com',
                            name: 'Pablo'
                        }
                    ]
                },
                {
                    id: '12',
                    users: [
                        {
                            id: 'pazmassad@gmail.com',
                            name: 'Maria Paz Massad'
                        },
                        {
                            id: 'patriciagonzalezvillar@gmail.com',
                            name: 'Patricia'
                        }
                    ]
                }
            ]
        },
        {
            id: 240506,
            shifts: [
                {
                    id: '10',
                    users: [
                        {
                            id: 'pmassad@yahoo.com',
                            name: 'Pablo'
                        }
                    ]
                }
            ]
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
