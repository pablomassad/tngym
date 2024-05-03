<template>
    <div>
        <q-page @scroll="handleScroll">
            <div v-if="loadingPrev">cargando días anteriores...</div>
            <div v-for="item in store.state.bookings" :key="item.id" class="bookingCard">
                <div class="itemStyle"> {{ item.day }}</div>
                <div>
                    <div v-for="shift in item.shifts" :key="shift.id" class="shiftList">
                        <div class="hours">{{ shift.id }}:00 hs</div>
                    </div>
                </div>
                <q-icon color="primary" name="edit" size="sm" s />
            </div>
            <div v-if="loadingNext">cargando proximos días...</div>
        </q-page>
        <q-btn round @click="goShift" color="primary" size="md" icon="add" class="addShift"></q-btn>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ui } from 'fwk-q-ui'
import store from './store'
import router from 'src/router'

console.log('Bookings Contructor.........')

const loadingPrev = ref(false)
const loadingNext = ref(false)

onMounted(() => {
    ui.actions.setTitle('Mis reservas')
})

const handleScroll = (event) => {
    console.log('handleScroll event:', event.target)
    if (event.target.scrollTop === 0 && !loadingPrev.value) {
        loadingPrev.value = true
        loadPrev().then(() => {
            loadingPrev.value = false
        })
    } else if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight && !loadingNext.value) {
        loadingNext.value = true
        loadNext().then(() => {
            loadingNext.value = false
        })
    }
}
const loadPrev = () => {
    // Implementa la lógica para cargar más contenido al hacer scroll hacia arriba
}
const loadNext = () => {
    // Implementa la lógica para cargar más contenido al hacer scroll hacia abajo
}
const goShift = (item) => {
    store.actions.setSelectedItem(item)
    router.push('/shifts')
}

</script>

<style scoped>
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
