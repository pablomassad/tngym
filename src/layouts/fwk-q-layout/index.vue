<template>
    <q-layout view="lHh Lpr lFf" class="frameLayout">
        <q-header elevated class="tbxFrame">
            <q-toolbar>
                <q-toolbar-title :class="`title ${main.state.mockmode ? 'mockModeOn' : ''}`">
                    <slot name="title">
                        <div class="bar">
                            <img src="images/tn.png" class="logo" />
                            <div class="text-h6 title">{{ ui.state.title }}</div>
                            <div></div>
                        </div>
                    </slot>
                </q-toolbar-title>
                <slot>
                    <!--<div style="font-size:medium">v{{ main.state.environment.versionName }}</div>-->
                </slot>
                <q-icon name="more_vert" style="margin-right: -10px;" @click="rightDrawerOpen = !rightDrawerOpen">
                    <q-menu transition-show="flip-right" transition-hide="flip-left">
                        <q-item-section v-close-popup>
                            <toggle-dark-mode v-if="!disableDark" :mode="darkmode" label="Modo Oscuro" @change="toggleMode"></toggle-dark-mode>
                            <slot name="drawer">
                            </slot>
                        </q-item-section>
                    </q-menu>
                </q-icon>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view v-slot="{Component}">
                <keep-alive>
                    <component :is="Component" :key="$route.path" />
                </keep-alive>
            </router-view>

            <!--<RouterView v-slot="{Component}">
                <Transition @enter="onEnter" @leave="onLeave" name="routes" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </RouterView>-->
        </q-page-container>

        <ProgBarLoader v-if="ui.state.loaderOps.type === 'progressBar'" />
        <ConfirmDialog :prompt="prompt" :message="dialogMessage" :onCancel="onCancelDialog" :onAccept="onAcceptDialog" />
    </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { main } from 'fwk-q-main'
import { ui } from 'fwk-q-ui'
import { Notify, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import ProgBarLoader from 'fwk-q-progressbar'
import ConfirmDialog from 'fwk-q-confirmdialog'
import ToggleDarkMode from './ToggleDarkMode.vue'

const $q = useQuasar()
const props = defineProps({
    disableDark: {
        type: Boolean,
        default: false
    },
    isRoot: {
        type: Boolean,
        default: false
    }
})

const router = useRouter()
const prompt = ref(false)
const dialogMessage = ref()
const onAcceptDialog = ref()
const onCancelDialog = ref()
const rightDrawerOpen = ref(false)
const darkmode = ref()

const isInitPage = computed(() => router.currentRoute.value.path.indexOf(main.state.info.tool) !== -1)

onMounted(() => {
    main.actions.setValidatePendings(async (to, from, next) => {
        const flag = await confirmBack()
        if (flag) next()
        else router.go(1)
    })
    main.actions.setNotifyInfo((res) => {
        const m = res?.info?.msg || res?.info?.message
        if (m) {
            console.log('Notify INFO:', m)
            switch (res.info.type) {
                case 'error':
                    Notify.create({
                        message: m,
                        color: 'red-6',
                        multiLine: true,
                        progress: true,
                        textColor: 'white',
                        icon: 'error',
                        timeout: 30000,
                        actions: [
                            { label: 'OK', color: 'white', handler: () => { /* ... */ } }
                        ]
                    })
                    break
                case 'success':
                    Notify.create({
                        message: m,
                        color: 'green-6',
                        multiLine: true,
                        progress: true,
                        textColor: 'white',
                        icon: 'error'
                    })
                    break
                case 'warning':
                    Notify.create({
                        message: m,
                        color: 'yellow-8',
                        multiLine: true,
                        progress: true,
                        textColor: 'white',
                        icon: 'error'
                    })
                    break
                case 'info':
                    Notify.create({
                        message: m,
                        color: 'blue-6',
                        multiLine: true,
                        progress: true,
                        textColor: 'white',
                        icon: 'error'
                    })
                    break

                default:
                    Notify.create({
                        message: m,
                        color: 'black',
                        multiLine: true,
                        progress: true,
                        textColor: 'white',
                        icon: 'error'
                    })
                    break
            }
            res = (res.info.data) ? res.info.data : undefined
        }
        return res
    })
    main.actions.setNotifyCatch((error) => {
        console.log('Notify ERROR:', error)
        Notify.create({
            message: error.message,
            color: 'red-6',
            progress: true,
            multiLine: true,
            textColor: 'white',
            icon: 'error',
            timeout: 30000,
            actions: [
                { label: 'OK', color: 'white', handler: () => { /* ... */ } }
            ]
        })
    })
    const isActive = $q.localStorage.getItem('darkMode')
    const flag = (isActive == null ? false : isActive)
    toggleMode(flag)
})
const toggleMode = (val) => {
    $q.dark.set(val)
    darkmode.value = val
    $q.localStorage.set('darkMode', val)
}
const onBack = async () => {
    if (isInitPage.value) {
        main.actions.exitApplication()
    } else {
        console.log('ui.state.preventBack:', ui.state.preventBack.toString())
        const res = await confirmBack()
        if (res) router.go(-1)
    }
}
const confirmBack = () => {
    return new Promise((resolve) => {
        if (ui.state.preventBack) {
            prompt.value = true
            dialogMessage.value = ui.state.dialogMessage
            onAcceptDialog.value = () => {
                prompt.value = false
                ui.actions.setPreventBack(false)
                resolve(true)
            }
            onCancelDialog.value = () => {
                prompt.value = false
                resolve(false)
            }
            onCancelDialog.value = () => {
                prompt.value = false
                resolve(false)
            }
        } else { resolve(true) }
    })
}
const showInfo = () => {
    const msg = `${main.state.info.legajo} / v${main.state.environment.versionName} / ${main.state.environment.environment}`
    Notify.create({
        message: msg,
        color: 'blue-6',
        multiLine: true,
        progress: true,
        textColor: 'white',
        icon: 'info'
    })
}
const setMockMode = () => {
    main.actions.setMockMode()
    Notify.create({
        message: `mockMode ${main.state.mockmode ? 'activado' : 'desactivado'}`,
        color: 'green-6',
        multiLine: true,
        progress: true,
        textColor: 'white',
        icon: 'error'
    })
}
</script>

<style lang="scss" scoped>
.logo {
    width: 36px;
}

.env {
    font-size: 10px;
    text-align: center;
    padding: 5px;
}

.title {
    text-align: center;
    font-weight: bold;
}

.bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.mockModeOn {
    color: #aaa;
}

.tbxFrame {
    background: rgb(0 120 218); // -webkit-linear-gradient(#2675b5, #004f7d) !important;
    font-size: 2rem;
    padding: 0 10px;
}

.body--light {
    .frameLayout {
        //background: -webkit-radial-gradient(#fff, #737373 115%) !important;
        background: #e6e6eb;
    }
}

.body--dark {
    .frameLayout {
        //background: -webkit-radial-gradient(#fff, #737373 115%) !important;
        background: #0a0a0a;
    }
}

/*.slide-enter-active,
.slide-leave-active {
    transition: opacity 1s, transform 1s;
}

.slide-enter-from {
    opacity: 1;
    transform: translateX(30%);
}

.slide-leave-to {
    opacity: 0;
    transform: translateX(-30%);
}*/
</style>
