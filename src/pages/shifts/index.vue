<template>
    <div class="navFrame">
        <div class="month">{{ store.state.month }}</div>
        <div class="grdNav">
            <q-icon name="navigate_before" class="arrow" @click="onPrevDay"></q-icon>
            <div class="dateFrame">
                <div class="dateStyle">{{ store.state.dayName }}</div>
                <div class="dateStyle">{{ store.state.dayNum }}</div>
            </div>
            <q-icon name="navigate_next" class="arrow" @click="onNextDay"></q-icon>
        </div>
    </div>
    <div class="hoursFrame">
        <div v-for="item in localShifts" :key="item">
            <div class="hourCard">
                <q-checkbox v-model="item.selected" @update:model-value="onSelection(item)"></q-checkbox>
                <div class="hour"> {{ item.hour }}:00 hs</div>
                <div class="vacancy">
                    <q-rating size="md" v-model="item.occupation" icon="person" color="primary" readonly />
                </div>
            </div>
        </div>
    </div>
    <ConfirmDialog :prompt="prompt" :message="dialogMessage" :onCancel="onCancelDialog" :onAccept="onAcceptDialog" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ui } from 'fwk-q-ui'
import ConfirmDialog from 'fwk-q-confirmdialog'
import store from './store'
import appStore from 'src/pages/appStore'

console.log('Shifts CONSTRUCTOR')

const localShifts = ref([])
const prompt = ref(false)
const dialogMessage = ref()
const onAcceptDialog = ref()
const onCancelDialog = ref()

onMounted(async () => {
    ui.actions.setTitle('Mis turnos')
    store.actions.setDate(appStore.state.selectedItem.id)
    await store.actions.getShiftsByDate(0)
    processShifts()
})

const processShifts = () => {
    store.state.hourRange.forEach(x => {
        const sh = {
            hour: x.hour,
            selected: false,
            occupation: x.occupation
        }
        const fnd = store.state.currShifts.shifts.find(h => h.id === x.hour)
        if (fnd) {
            sh.selected = true
        }
        localShifts.value.push(sh)
    })
}
const onSelection = (e) => {
    console.log('checkbox value:', e.selected)
    ui.actions.setPreventBack(true)
    return new Promise((resolve) => {
        if (ui.state.preventBack) {
            if (e.selected) {
                if (e.occupation === 5) {
                    ui.actions.notify('Ya se llegó al límite de personas por turno!', 'info')
                } else {
                    prompt.value = true
                    dialogMessage.value = 'Esta seguro que desea reservar este turno?'
                    onAcceptDialog.value = () => {
                        prompt.value = false
                        ui.actions.setPreventBack(false)
                        e.selected = true
                        e.occupation++
                        resolve(true)
                    }
                    onCancelDialog.value = () => {
                        prompt.value = false
                        resolve(false)
                    }
                }
            } else {
                prompt.value = true
                dialogMessage.value = 'Esta seguro que desea cancelar el turno?'
                onAcceptDialog.value = () => {
                    prompt.value = false
                    ui.actions.setPreventBack(false)
                    e.selected = false
                    e.occupation--
                    resolve(true)
                }
                onCancelDialog.value = () => {
                    prompt.value = false
                    resolve(false)
                }
            }
        }
    })
}
const onPrevDay = () => {
    store.actions.getShiftsByDate(-1)
}
const onNextDay = () => {
    store.actions.getShiftsByDate(+1)
}
</script>

<style scoped>
.arrow {
    font-size: 30px;
    /*text-shadow: 1px 1px 1px white;*/
}

.month {
    font-size: 20px;
    text-align: center;
    text-transform: capitalize;
}

.navFrame {
    padding: 20px;
    position: fixed;
    width: 100%;
}

.hour {
    font-size: 18px;
}

.grdNav {
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    align-items: center;
    justify-items: center;
}

.hoursFrame {
    margin: 16px;
    margin-top: 110px;
    height: calc(100vh - 164px);
    overflow-y: auto;
}

.hourCard {
    display: grid;
    align-items: center;
    grid-template-columns: 40px 120px 1fr;
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
</style>
