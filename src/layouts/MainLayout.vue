<template>
    <Layout>
        <template #drawer>
            <div :style="{margin: auto, textAlign: 'center', padding: '10px'}">
                <q-avatar size="72px">
                    <img :src="loginStore.state.user.loresUrl">
                </q-avatar>
                <div class="q-mb-lg">{{ loginStore.state.user.name }}</div>
                <p class="footer">SETEC v{{ main.state.environment.versionName }}</p>
            </div>
        </template>
    </Layout>
</template>

<script setup>
import Layout from './fwk-q-layout'

console.warn('MAINLAYOUT CONSTRUCTOR..........')
</script>
