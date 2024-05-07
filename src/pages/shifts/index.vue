<template>
    <div class="frame">
        <div class="bar">
            <div class="logo"></div>
            <div class="text-h6 title">{{ ui.state.title }}</div>
            <div class="logo" @click="close">
                <q-icon name="close" size="sm" color="gray"></q-icon>
            </div>
        </div>
        <div class="navFrame">
            <div class="month">{{ store.state.month }}</div>
            <div class="grdNav">
                <q-icon name="navigate_before" class="arrow" @click="onNavDay(-1)"></q-icon>
                <div class="dateFrame">
                    <div class="dateStyle">{{ store.state.dayName }}</div>
                    <div class="dateStyle">{{ store.state.dayNum }}</div>
                </div>
                <q-icon name="navigate_next" class="arrow" @click="onNavDay(1)"></q-icon>
            </div>
        </div>
        <div class="hoursFrame">
            <div v-for="item in localShifts" :key="item">
                <div class="hourCard">
                    <q-checkbox v-model="item.selected" @update:model-value="onSelection(item)" style="justify-self: left;"></q-checkbox>
                    <div class="hour"> {{ item.hour }}:00 hs</div>
                    <div class="vacancy">
                        <div>{{ item.total }} / 5</div>
                        <img src="svgs/person.svg" class="iconPerson" />
                        <!--<q-rating size="md" v-model="item.total" icon="person" color="primary" readonly />-->
                    </div>
                </div>
            </div>
        </div>
        <q-btn glossy label="confirmar" @click="save" color="primary" class="btnSave" :disable="!dirty"></q-btn>
    </div>

    <ConfirmDialog :prompt="prompt" :message="dialogMessage" :onCancel="onCancelDialog" :onAccept="onAcceptDialog" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ui } from 'fwk-q-ui'
import ConfirmDialog from 'fwk-q-confirmdialog'
import store from './store'
import appStore from 'src/pages/appStore'
import { useRouter } from 'vue-router'

const router = useRouter()

console.log('Shifts CONSTRUCTOR')

const dirty = ref(false)
const localShifts = ref([])
const prompt = ref(false)
const dialogMessage = ref()
const onAcceptDialog = ref()
const onCancelDialog = ref()
const transactions = []

onMounted(async () => {
    ui.actions.setTitle('Disponibilidad')
    await store.actions.getShiftsByDate(0)
    processShifts()
})

const processShifts = () => {
    localShifts.value = []
    const userShifts = appStore.state.myBookings.bookings[appStore.state.selectedDate]
    store.state.hourRange.forEach(h => {
        const sh = {
            hour: h,
            selected: false,
            total: 0
        }
        if (store.state.countersByDate.shiftCounter) {
            const cnt = store.state.countersByDate.shiftCounter[sh.hour]
            if (cnt) {
                sh.total = cnt
            }
        }
        const shiftFnd = userShifts?.find(x => x === sh.hour)
        if (shiftFnd) {
            sh.selected = true
        }
        localShifts.value.push(sh)
    })
}
const onSelection = (e) => {
    console.log('checkbox value:', e.selected)
    ui.actions.setPreventBack(true)
    if (e.selected) {
        if (e.total === 5) {
            ui.actions.notify('Ya se llegó al límite de personas por turno!', 'info')
            e.selected = false
        } else {
            e.selected = true
            e.total++
            saveTransaction(e)
        }
    } else {
        e.selected = false
        e.total--
        saveTransaction(e)
    }
}
const saveTransaction = (e) => {
    dirty.value = true
    console.log('transaction:', e)
    transactions.push(e)
}
const onNavDay = async (inc) => {
    evalStatus(async () => {
        await store.actions.getShiftsByDate(inc)
        processShifts()
    })
}
const close = () => {
    evalStatus(() => {
        router.go(-1)
    })
}
const evalStatus = (cb) => {
    if (dirty.value) {
        prompt.value = true
        dialogMessage.value = 'Hay cambios pendientes. Si acepta los cambios se perderán!'
        onAcceptDialog.value = () => {
            prompt.value = false
            dirty.value = false
            cb()
        }
        onCancelDialog.value = () => {
            prompt.value = false
        }
    } else { cb() }
}
const save = async () => {
    console.log('transactions', transactions)
    await store.actions.save(transactions)
    dirty.value = false
}
</script>

<style scoped lang="scss">
.frame {
    background-color: #e6e6eb;
    height: 100vh;
}

.logo {
    width: 50px;
    justify-self: center;
    text-align: center;
}

.headerFrame {
    background: rgb(255, 255, 255);
    font-size: 2rem;
    padding: 0 10px;
}

.title {
    text-align: center;
    color: #5d5c5c
}

.bar {
    height: 48px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    color: #676565;
    border-bottom: 1px solid lightgray;
    /*background-color: white;*/
    /*color: rgb(32, 109, 171);*/
    /*box-shadow: 1px 0 4px rgb(200, 200, 200);*/
}

.arrow {
    font-size: 30px;
}

.month {
    font-size: 20px;
    text-align: center;
    text-transform: capitalize;
}

.navFrame {
    padding: 10px;
    position: fixed;
    width: 100%;
    max-width: 400px;
    left: 0;
    margin: auto;
    right: 0;
    color: #0066a4;
}

.hour {
    font-size: 16px;
}

.grdNav {
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    align-items: center;
    justify-items: center;
}

.hoursFrame {
    background: white;
    height: calc(100vh - 220px);
    overflow-y: auto;
    max-width: 400px;
    margin: auto;
    margin-top: 90px;
    border-radius: 5px;
}

@media screen and (min-height: 800px) {
    .hoursFrame {
        height: 572px;
    }
}

.hourCard {
    display: grid;
    align-items: center;
    grid-template-columns: 40px 120px 1fr;
    border-bottom: 1px solid #dedede;
    margin: 0px 20px;
}

.dateStyle {
    font-size: 20px;
    text-transform: capitalize;
    padding: 0 5px;
    font-weight: bold;
}

.dateFrame {
    display: flex;
    justify-content: center;
}

.itemStyle {
    font-weight: bold;
}

.bookingCard {
    display: grid;
    grid-template-columns: 80px 1fr 35px;
    box-shadow: inset 1px 1px 3px gray;
    background: white;
    border-radius: 8px;
    margin: 16px;
    padding: 8px;
    max-width: 400px;
}

.shiftList {
    width: 90px;
}

.hours {
    text-align: right;
}

.addShift {
    position: fixed;
    bottom: 10px;
    right: 10px;
}

.vacancy {
    font-size: 16px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin: 0 10px;
}

.btnSave {
    position: fixed;
    bottom: 30px;
    left: 0;
    right: 0;
    width: 80%;
    max-width: 400px;
    margin: auto;
}
</style>
