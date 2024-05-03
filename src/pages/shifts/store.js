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
    hourRange: [
        { hour: 8, selected: false, occupation: 0 },
        { hour: 9, selected: false, occupation: 0 },
        { hour: 10, selected: false, occupation: 0 },
        { hour: 11, selected: false, occupation: 0 },
        { hour: 12, selected: false, occupation: 0 },
        { hour: 13, selected: false, occupation: 0 },
        { hour: 14, selected: false, occupation: 0 },
        { hour: 15, selected: false, occupation: 0 },
        { hour: 16, selected: false, occupation: 0 },
        { hour: 17, selected: false, occupation: 0 },
        { hour: 18, selected: false, occupation: 0 },
        { hour: 19, selected: false, occupation: 0 },
        { hour: 20, selected: false, occupation: 0 },
        { hour: 21, selected: false, occupation: 0 },
        { hour: 22, selected: false, occupation: 0 }
    ],
    shift: {
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
    strDate: '',
    month: '',
    dayName: '',
    dayNum: ''
})
const actions = {
    setDate (d) {
        state.strDate = d.toString()
    },
    getShiftsByDate (inc) {
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
