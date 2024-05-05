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
    hourRange: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    shiftsCounterByDate: [
        {
            id: 8,
            total: 3
        },
        {
            id: 9,
            total: 2
        },
        {
            id: 10,
            total: 1
        },
        {
            id: 18,
            total: 5
        }
    ],
    strDate: '',
    month: '',
    dayName: '',
    dayNum: ''
})
const actions = {
    setDate (d) {
        state.strDate = d.toString()
    },
    async getShiftsByDate (inc) {
        console.log('store getShiftsByDate:', inc)
        let fecha = parse(state.strDate, 'yyMMdd', new Date())
        fecha = addDays(fecha, inc)
        actions.setDate(format(fecha, 'yyMMdd'))
        state.month = format(fecha, 'MMMM', { locale: es })
        state.dayName = format(fecha, 'EEEE', { locale: es })
        state.dayNum = format(fecha, 'd')
    }
}

export default {
    state: readonly(state),
    actions
}
