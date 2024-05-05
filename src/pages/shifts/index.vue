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
                <q-checkbox v-model="item.selected" @update:model-value="onSelection(item)" style="justify-self: left;"></q-checkbox>
                <div class="hour"> {{ item.hour }}:00 hs</div>
                <div class="vacancy">
                    <div>{{ item.occupation }} / 5</div>
                    <img src="svgs/person.svg" class="iconPerson" />
                    <!--<q-rating size="md" v-model="item.occupation" icon="person" color="primary" readonly />-->
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
    ui.actions.setTitle('Disponibilidad')
    store.actions.setDate(appStore.state.selectedItem)
    await store.actions.getShiftsByDate(0)
    processShifts()
})

const processShifts = () => {
    store.state.hourRange.forEach(h => {
        const sh = {
            hour: h,
            selected: false,
            occupation: 0
        }
        const fnd = store.state.shiftsCounterByDate.find(x => x.id === h)
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
                    e.selected = false
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
                        e.selected = false
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
                    e.selected = true
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
    background: white;
    height: calc(100vh - 164px);
    overflow-y: auto;
    max-width: 500px;
    margin: auto;
    margin-top: 110px;
}

.hourCard {
    display: grid;
    align-items: center;
    grid-template-columns: 40px 120px 1fr;
    margin: 5px 10px;
    border-bottom: 1px solid gray;
    margin: 10px 20px;
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
    font-size: 18px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin: 0 10px;
}
</style>
