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
        <div v-for="item in store.state.hourRange" :key="item">
            <div class="hourCard">
                <q-checkbox v-model="item.selected"></q-checkbox>
                <div class="hour"> {{ item.hour }}:00 hs</div>
                <div class="vacancy">
                    <q-rating size="md" v-model="item.occupation" icon="stars" color="primary" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { ui } from 'fwk-q-ui'
import store from './store'
import appStore from 'src/pages/appStore'
import router from 'src/router'

console.log('Shifts Contructor.........')

onMounted(() => {
    ui.actions.setTitle('Mis turnos')
    store.actions.setDate(appStore.state.selectedItem.id)
    store.actions.getShiftsByDate(0)
})

const onPrevDay = () => {
    store.actions.getShiftsByDate(-1)
}
const onNextDay = () => {
    store.actions.getShiftsByDate(+1)
}
const evalCheck = (hr) => {

}
const save = (item) => {
    store.actions.saveShift(item)
    router.push('/shifts')
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
