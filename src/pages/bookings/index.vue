<template>
    <div>
        <q-page @scroll="handleScroll">
            <div v-if="loadingPrev">cargando días anteriores...</div>
            <div v-if="appStore.state.myBookings">
                <div class="itemsFrame">
                    <div v-for="(d, idx) in Object.keys(appStore.state.myBookings.bookings)" :key="idx">
                        <div v-if="appStore.state.months[idx]">
                            <div class="monthName"> {{ appStore.state.months[idx] }} </div>
                        </div>
                        <div class="bookingCard">
                            <div class="itemStyle"> {{ formatDay(d) }}</div>
                            <div>
                                <div v-for="hr in appStore.state.myBookings.bookings[d]" :key="hr" class="shiftList">
                                    <div class="hours">{{ hr }}:00 hs</div>
                                </div>
                            </div>
                            <q-icon color="primary" name="edit" size="sm" @click="goShift(d)" class="editShift" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="loadingNext">cargando proximos días...</div>
        </q-page>
        <q-btn round @click="goShift()" glossy color="primary" size="lg" icon="add" class="addShift"></q-btn>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ui } from 'fwk-q-ui'
import appStore from 'src/pages/appStore'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import parse from 'date-fns/parse'

const router = useRouter()

console.log('Bookings Contructor.........')

const loadingPrev = ref(false)
const loadingNext = ref(false)

onMounted(async () => {
    console.log('onMounted booking')
    ui.actions.setTitle('Mis reservas')
    appStore.actions.getMyBookings()
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
    const fecha = parse(date, 'yyMMdd', new Date())
    const dayName = format(fecha, 'EEEE', { locale: es })
    const dayNum = format(fecha, 'd')
    const result = dayName + ' ' + dayNum
    return result
}
const goShift = (d) => {
    if (!d) {
        d = format(new Date(), 'yyMMdd')
    }
    appStore.actions.setSelectedDate(d)
    router.push('/shifts')
}
</script>

<style scoped>
.itemStyle {
    font-weight: bold;
}

.bookingCard {
    display: grid;
    grid-template-columns: 90px 1fr 30px;
    margin: 4px 4px -1px 10px;
    padding: 8px;
    max-width: 400px;
    border-bottom: 1px solid lightgray;
}

.monthName {
    font-size: 18px;
    padding: 20px 20px 0px;
    background: #e6e6eb;
    text-transform: capitalize;
}

.itemsFrame {
    background-color: white;
    max-width: 400px;
    margin: auto;
}

.shiftList {
    width: 90px;
}

.hours {
    text-align: right;
}

.addShift {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

.editShift {
    justify-self: center;
}
</style>
