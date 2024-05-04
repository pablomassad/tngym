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
        { hour: 8, occupation: 0 },
        { hour: 9, occupation: 2 },
        { hour: 10, occupation: 1 },
        { hour: 11, occupation: 0 },
        { hour: 12, occupation: 5 },
        { hour: 13, occupation: 0 },
        { hour: 14, occupation: 0 },
        { hour: 15, occupation: 0 },
        { hour: 16, occupation: 0 },
        { hour: 17, occupation: 0 },
        { hour: 18, occupation: 1 },
        { hour: 19, occupation: 3 },
        { hour: 20, occupation: 2 },
        { hour: 21, occupation: 4 },
        { hour: 22, occupation: 0 }
    ],
    currShifts: {
        id: 240505,
        shifts: [
            {
                id: 8,
                users: [
                    {
                        id: 'pmassad@yahoo.com',
                        name: 'Pablo'
                    }
                ]
            },
            {
                id: 12,
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
