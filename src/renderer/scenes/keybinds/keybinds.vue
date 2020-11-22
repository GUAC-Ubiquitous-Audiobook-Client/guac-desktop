<script lang="ts">
import Vue from 'vue'
import {KeybindAction, registerKeybind} from "../../../main/keybinds";
import {ipcRenderer} from "electron";

let state = {
    style: {
        height: '100%',
        flexDirection: 'column',
        display: 'flex',
        color: '#ffffff'
    },
    selectedAction: "",
    actions: Object.values(KeybindAction),
    keybind: "",
}

export default Vue.component("home", {
    data: function () {
        return state
    },
    methods: {
        saveKeybind: _saveKeybind
    },
    computed: {}
})

function _saveKeybind() {
    registerKeybind(ipcRenderer, this.keybind, this.selectedAction)
}

</script>

<template>
    <div v-bind:style="style">
        <p>set keybinds</p>
        <select v-model="selectedAction">
            <option v-for="action in actions" :value="action">{{ action }}</option>
        </select>
        <p>
            Selected Text = {{ selectedAction }}<br>
        </p>
        <input v-model="keybind" placeholder="type character"/>
        <button v-on:click="saveKeybind">save keybind</button>
    </div>
</template>
