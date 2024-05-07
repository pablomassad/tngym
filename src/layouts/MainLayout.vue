<template>
    <Layout>
        <template #drawer>
            <div :style="{margin: auto, textAlign: 'center', padding: '10px'}">
                <q-avatar size="72px">
                    <img :src="appStore.state.user.photoURL">
                </q-avatar>
                <div class="q-mb-lg">{{ appStore.state.user.displayName }}</div>
                <div @click="appStore.actions.logout" class="logout">
                    <q-icon name="logout" size="sm" color="primary" />
                    <div class="logoutText">SALIR</div>
                </div>
                <p class="footer">TN Gym v{{ main.state.environment.versionName }}</p>
            </div>
        </template>
    </Layout>
</template>

<script setup>
import Layout from './fwk-q-layout'
import { main } from 'fwk-q-main'
import appStore from 'src/pages/appStore'

console.warn('MAINLAYOUT CONSTRUCTOR..........')
</script>

<style scoped>
.logout {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.logoutText {
    font-size: 18px;
    color: rgb(81, 81, 81);
}
</style>
