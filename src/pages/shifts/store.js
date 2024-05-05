import { reactive, readonly } from 'vue'
import fb from 'fwk-q-firebase'
import { ui } from 'fwk-q-ui'
import appStore from '../appStore'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import parse from 'date-fns/parse'
import addDays from 'date-fns/addDays'

let srv

const state = reactive({
    hourRange: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'],
    countersByDate: undefined,
    month: '',
    dayName: '',
    dayNum: ''
})
const actions = {
    setCountersByDate (doc) {
        console.log('store setCountersByDate:', doc)
        if (!doc) {
            doc = {
                shiftCounter: {},
                totalShifts: 0
            }
        }
        state.countersByDate = doc
    },
    async getShiftsByDate (inc) {
        console.log('store getShiftsByDate:', inc)
        let fecha = parse(appStore.state.selectedDate, 'yyMMdd', new Date())
        fecha = addDays(fecha, inc)
        appStore.actions.setSelectedDate(format(fecha, 'yyMMdd'))
        state.month = format(fecha, 'MMMM', { locale: es })
        state.dayName = format(fecha, 'EEEE', { locale: es })
        state.dayNum = format(fecha, 'd')

        const data = await fb.getDocument('counters', appStore.state.selectedDate)
        actions.setCountersByDate(data)
    },
    async save (transactions) {
        for (const tr of transactions) {
            console.log('tr:', tr)
            if (tr.selected) {
                state.countersByDate.shiftCounter[tr.hour] = tr.total
                state.countersByDate.totalShifts++
                appStore.actions.addShift(tr.hour)
            } else {
                state.countersByDate.shiftCounter[tr.hour] = tr.total
                state.countersByDate.totalShifts--
                appStore.actions.removeShift(tr.hour)
            }
        }
        const res = await fb.setDocument('counters', state.countersByDate, appStore.state.selectedDate)
    }
}

export default {
    state: readonly(state),
    actions
}
