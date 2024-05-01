<template>
    <div class="loginBack">
        <div class="mainFrame  ">
            <div class="logoFrame">
                <img src="images/google.png" class="logo" />
            </div>
            <div class="loginFrame">
                <div class="panel">
                    <q-tabs v-model="tab" class="text-grey" active-color="primary" indicator-color="primary" align="justify">
                        <q-tab name="login" label="Ingresar" />
                        <q-tab name="register" label="Registrarse" />
                    </q-tabs>

                    <q-tab-panels v-model="tab" animated style="margin-bottom: -10px;text-align: center;">
                        <q-tab-panel name="login" class="loginPanel">
                            <q-input filled color="black" v-model="email" label="Correo electrónico">
                                <template v-slot:append>
                                    <q-avatar>
                                        <q-icon name="mail" size="sm" color="gray"></q-icon>
                                    </q-avatar>
                                </template>
                            </q-input>
                            <q-input filled type="password" v-model="password" label="Contraseña" color="black">
                                <template v-slot:append>
                                    <q-avatar>
                                        <q-icon name="lock" size="sm" color="gray" />
                                    </q-avatar>
                                </template>
                            </q-input>
                            <div class="forgotPwd">
                                Olvidaste tu contraseña?
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="register" class="registerPanel">
                            <q-input filled color="black" v-model="name" label="Nombre">
                                <template v-slot:append>
                                    <q-avatar>
                                        <q-icon name="person" size="sm" color="gray"></q-icon>
                                    </q-avatar>
                                </template>
                            </q-input>
                            <q-input filled color="black" v-model="email" label="Correo electrónico">
                                <template v-slot:append>
                                    <q-avatar>
                                        <q-icon name="mail" size="sm" color="gray"></q-icon>
                                    </q-avatar>
                                </template>
                            </q-input>
                            <q-input filled type="password" v-model="password" label="Contraseña" color="black">
                                <template v-slot:append>
                                    <q-avatar>
                                        <q-icon name="lock" size="sm" color="gray" />
                                    </q-avatar>
                                </template>
                            </q-input>
                        </q-tab-panel>
                    </q-tab-panels>
                </div>
            </div>
            <div class="btnFrame">
                <div class="btnContainer">
                    <div class="btnLogin" @click="submit(tab)">
                        <q-icon name="person"></q-icon>
                    </div>
                </div>
            </div>
            <div class="googleFrame" v-if="tab === 'login'" @click="submit('google')">
                <img src="images/google.png" class="googleIcon" />
                <div class="googleText">Google</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import store from './store'

const tab = ref('login')
const name = ref()
const email = ref()
const password = ref()

const submit = (val) => {
    store.actions.login(val, email.value, password.value, name.value)
}

</script>

<style scoped>
.logoFrame {
    width: 100%;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loginBack {
    height: 100vh;
    background: linear-gradient(rgb(13, 82, 178) 20%, white 50%);
}

.loginFrame {
    padding: 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px gray;
    background-color: white;
    margin: auto 5%;
    max-width: 500px;
}

.btnFrame {
    display: flex;
    justify-content: center;
    margin-top: -55px;
}

.btnContainer {
    display: flex;
    justify-content: center;
    width: 100px;
    height: 100px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 2px 8px gray;
    border-radius: 50%;
}

.btnLogin {
    z-index: 1;
    height: 70px;
    width: 70px;
    text-align: center;
    margin-top: 13px;
    font-size: 40px;
    border-radius: 50%;
    color: white;
    background-color: rgb(91 148 233);
    box-shadow: black 0px 2px 5px;
}

.btnLogin:active {
    box-shadow: none;
    margin-top: 15px;
}

.forgotPwd {
    color: rgb(29, 91, 172);
    font-size: 18px;

}

.panel {
    max-width: 500px;
    margin: auto
}

.loginPanel {
    display: grid;
    row-gap: 10px;
    height: 200px;
    box-shadow: inset 2px 2px 4px gray;
    margin-bottom: 50px;
    border-radius: 5px;
    background-color: lightgray;
}

.registerPanel {
    display: grid;
    row-gap: 10px;
    height: 250px;
    box-shadow: inset 2px 2px 4px gray;
    margin-bottom: 50px;
    border-radius: 5px;
    background-color: lightgray;
}

.googleFrame {
    border-radius: 5px;
    width: 150px;
    background-color: lightgray;
    box-shadow: 2px 2px 5px black;
    display: flex;
    justify-content: left;
    padding: 10px;
    position: absolute;
    bottom: 70px;
    left: 0;
    right: 0;
    margin: auto;
}

.googleFrame:active {
    box-shadow: none;
    bottom: 72px;
}

.googleIcon {
    height: 30px;
    padding: 0 10px;
}

.googleText {
    font-size: 20px;
    color: #333;
    text-shadow: 1px 1px 1px white;
}
</style>
