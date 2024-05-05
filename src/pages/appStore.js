import { reactive, readonly } from 'vue'
import axios from 'redaxios'
import fb from 'fwk-q-firebase'
import { ENVIRONMENTS } from 'src/environments'

let srv
fb.initFirebase(ENVIRONMENTS.firebase)

const state = reactive({
    users: [],
    selectedItem: undefined
})
const actions = {
    async init () {
        srv = await axios.create()
    },
    setselectedItem (date) {
        console.log('store setselectedItem:', date)
        state.selectedItem = date
    },
    async logRing (data) {
        let doc = await fb.getDocument('countByDay', data.dia)
        if (!doc) doc = { id: data.dia, total: 0 }
        doc.total = doc.total + 1
        await fb.setDocument('countByDay', doc, doc.id)
        await fb.setDocument('logger_tngym', data)
    },
    async command (topic, cmd, args) {
        console.log('store command:', topic, cmd)
        const p0 = `topic=${topic}`
        const p1 = `&cmd=${cmd}`
        const p2 = `&args=${args}`
        srv.get(`https://us-central1-pp-integralmente.cloudfunctions.net/command?${p0}${p1}${p2}`)
    }
}

export default {
    state: readonly(state),
    actions
}
