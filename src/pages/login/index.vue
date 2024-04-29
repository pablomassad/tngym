<template>
    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab name="login" label="Ingresar" />
        <q-tab name="register" label="Registrarse" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated class="bg-orange-1 text-dark text-center">
        <q-tab-panel name="login">
            <div class="text-h6">Correo electronico</div>
            <div class="text-h6">Contraseña</div>
            <q-btn color="primary" label="Ingresar" />
        </q-tab-panel>

        <q-tab-panel name="register" class="bg-lime-1 text-dark">
            <div class="text-h6">Nombre de usuario</div>
            <div class="text-h6">Correo electronico</div>
            <div class="text-h6">Contraseña</div>
            <q-btn color="primary" label="Registrarse" />
        </q-tab-panel>
    </q-tab-panels>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('Ingresar')

</script>

<style scoped></style>
