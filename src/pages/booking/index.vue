<template>
    <div>
        <q-page @scroll="handleScroll">
            <div v-if="loadingPrev">cargando días anteriores...</div>
            <div v-for="item in store.state.days" :key="item.id">
                <div>dia: {{ item.day }}</div>
                <!-- contenido del item -->
            </div>
            <div v-if="loadingNext">cargando proximos días...</div>
        </q-page>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import store from './store'

const loadingPrev = ref(false)
const loadingNext = ref(false)

const handleScroll = (event) => {
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

</script>

<style scoped lang="sass">
</style>
