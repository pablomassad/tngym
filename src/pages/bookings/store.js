import { reactive, readonly } from 'vue'
import fb from 'fwk-q-firebase'
import { ui } from 'fwk-q-ui'

let srv

const state = reactive({
    myBookings: {
        id: 'pmassad@yahoo.com',
        name: 'Pablo Massad',
        bookings: [
            {
                id: 240506,
                shifts: [8]
            },
            {
                id: 240511,
                shifts: [8, 9, 18]
            },
            {
                id: 240512,
                shifts: [9, 10]
            }
        ]
    }
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
