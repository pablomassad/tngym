import { reactive, readonly } from 'vue'
import axios from 'redaxios'
import fb from 'fwk-q-firebase'
import { ENVIRONMENTS } from 'src/environments'

let srv
fb.initFirebase(ENVIRONMENTS.firebase)

const state = reactive({
    user: {
        email: 'pmassad@yahoo.com'
    },
    selectedDate: undefined,
    myBookings: undefined
})
const actions = {
    async init () {
        srv = await axios.create()
    },
    setUser (usr) {
        console.log('store setUser:', usr)
        state.user = usr
    },
    setSelectedDate (date) {
        console.log('store setSelectedDate:', date)
        state.selectedDate = date
    },
    setMyBookings (doc) {
        console.log('store setMyBookings:', doc)
        state.myBookings = doc
    },
    async addShift (hr) {
        console.log('store addShift:', hr)
        if (!state.myBookings.bookings[state.selectedDate]) {
            state.myBookings.bookings[state.selectedDate] = []
        }
        const fnd = state.myBookings.bookings[state.selectedDate].find(x => x === hr)
        if (!fnd) {
            state.myBookings.bookings[state.selectedDate].push(hr)
        }
        const res = await fb.setDocument('users', state.myBookings, state.user.email)
    },
    async removeShift (hr) {
        console.log('store removeShift:', hr)
        const newShifts = state.myBookings.bookings[state.selectedDate].filter(x => x !== hr)
        state.myBookings.bookings[state.selectedDate] = newShifts
        const res = await fb.setDocument('users', state.myBookings, state.user.email)
    },
    async getMyBookings () {
        const doc = await fb.getDocument('users', 'pmassad@yahoo.com')
        if (doc) {
            actions.setMyBookings(doc)
        }
    }

    // async logRing (data) {
    //    let doc = await fb.getDocument('countByDay', data.dia)
    //    if (!doc) doc = { id: data.dia, total: 0 }
    //    doc.total = doc.total + 1
    //    await fb.setDocument('countByDay', doc, doc.id)
    //    await fb.setDocument('logger_tngym', data)
    // },

    // async command (topic, cmd, args) {
    //    console.log('store command:', topic, cmd)
    //    const p0 = `topic=${topic}`
    //    const p1 = `&cmd=${cmd}`
    //    const p2 = `&args=${args}`
    //    srv.get(`https://us-central1-pp-integralmente.cloudfunctions.net/command?${p0}${p1}${p2}`)
    // }
}

export default {
    state: readonly(state),
    actions
}
