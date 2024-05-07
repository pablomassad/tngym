import { reactive, readonly } from 'vue'
import axios from 'redaxios'
import fb from 'fwk-q-firebase'
import { ENVIRONMENTS } from 'src/environments'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import parse from 'date-fns/parse'

let srv
fb.initFirebase(ENVIRONMENTS.firebase)

const state = reactive({
    user: JSON.parse(localStorage.getItem('TN_user')),
    selectedDate: undefined,
    myBookings: undefined,
    months: {}
})
const actions = {
    async init () {
        srv = await axios.create()
    },
    setUser (data) {
        console.log('store setUser:', data)
        state.user = data
        localStorage.setItem('TN_user', JSON.stringify(data))
    },
    setSelectedDate (date) {
        console.log('store setSelectedDate:', date)
        state.selectedDate = date
    },
    setMyBookings (doc) {
        console.log('store setMyBookings:', doc)
        state.months = {}
        Object.keys(doc.bookings).forEach((d, i) => {
            const fecha = parse(d, 'yyMMdd', new Date())
            const mes = format(fecha, 'MMMM', { locale: es })
            const fndMonth = Object.values(state.months).find(val => val === mes)
            if (!fndMonth) {
                state.months[i] = mes
            }
        })
        console.log('months:', state.months)
        state.myBookings = doc
    },
    async logout () {
        console.log('store logout')
        actions.setUser(null)
        await fb.logout()
        window.location.reload()
    },
    async addShift (hr) {
        console.log('store addShift:', hr)
        if (!state.myBookings.bookings[state.selectedDate]) {
            state.myBookings.bookings[state.selectedDate] = []
        }
        const fnd = state.myBookings.bookings[state.selectedDate].find(x => x === hr)
        if (!fnd) {
            orderedInsert(state.myBookings.bookings[state.selectedDate], hr)
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
        const doc = await fb.getDocument('users', state.user.email)
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

function orderedInsert (array, str) {
    let i = 0
    const numero = Number(str)
    while (i < array.length && Number(array[i]) < numero) {
        i++
    }
    array.splice(i, 0, numero.toString())
    return array
}
