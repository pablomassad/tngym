<template>
    <div>
        <q-page @scroll="handleScroll">
            <div v-if="loadingPrev">cargando días anteriores...</div>
            <div v-for="item in store.state.myBookings.bookings" :key="item.id" class="bookingCard">
                <div class="itemStyle"> {{ formatDay(item.id) }}</div>
                <div>
                    <div v-for="hr in item.shifts" :key="hr" class="shiftList">
                        <div class="hours">{{ hr }}:00 hs</div>
                    </div>
                </div>
                <q-icon color="primary" name="edit" size="sm" @click="goShift(item.id)" />
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
import appStore from 'src/pages/appStore'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import parse from 'date-fns/parse'
import addDays from 'date-fns/addDays'

const router = useRouter()

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
const formatDay = (date) => {
    const fecha = parse(date.toString(), 'yyMMdd', new Date())
    // const month = format(fecha, 'MMMM', { locale: es })
    const dayName = format(fecha, 'EEEE', { locale: es })
    const dayNum = format(fecha, 'd')
    const result = dayName + ' ' + dayNum
    return result
}
const goShift = (item) => {
    appStore.actions.setselectedItem(item)
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
