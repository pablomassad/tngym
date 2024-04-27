<template>
    <div class="backIntegralmente">
        <div class="frame">
            <q-select :options="appStore.state.staff" behavior="menu" label="Seleccione profesional" v-model="selProf" option-label="name" option-value="topic" @update:model-value="onSelProf"></q-select>
            <qrcode-vue v-if="selProf" ref="qrRef" :value="QRValue" class="picQR" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import appStore from 'src/pages/appStore'
import QrcodeVue from 'qrcode.vue'

const selProf = ref('')
const QRValue = ref()
const qrRef = ref()

onMounted(async () => {
    await appStore.actions.init()
})

const onSelProf = (e) => {
    console.log(e.id)
    selProf.value = e
    QRValue.value = JSON.stringify({ id: e.topic })
}

</script>

<style scoped lang="scss">
.frame {
    padding: 10px;
    width: 100%;
    max-width: 500px;
    margin: auto;
}

.picQR {
    width: 200px !important;
    height: 200px !important;
    margin: 20px;
    justify-content: center;
    display: grid;
    justify-self: center;
    margin: auto;
    margin-top: 50px;
}
</style>
