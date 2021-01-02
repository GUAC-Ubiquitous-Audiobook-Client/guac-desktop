<template>
    <div v-bind:style="containerStyle">
        <div :style="topBarContainerStyle">
            <div :style="topBarTitleContainerStyle">
                <p :style="Styles.titleText">Keybinds</p>
            </div>
            <button :style="addKeybindButtonStyle" v-on:click="onImportFilesClick">
                <p :style="Styles.buttonPrimaryText">Add keybind</p>
            </button>
            <p :style="topBarNoteLabelStyle">
                Note: Keybinds will override the key combination you select and it won't be usable in other programs
            </p>
            <div :style="topBarDividerStyle"/>
        </div>

        <p>set keybinds</p>
        <select v-model="selectedAction">
            <option v-for="action in actions" :value="action">{{ action }}</option>
        </select>
        <p>Selected Text = {{ selectedAction }}<br></p>
        <input v-model="keybind" placeholder="type character"/>
        <button v-on:click="saveKeybind">save keybind</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {KeybindAction, registerKeybind} from "../../../main/keybinds";
import {ipcRenderer} from "electron";
import {Colors, Dimens, Styles} from "../../styles";

let state = {
    Styles: Styles,
    containerStyle: {
        height: '100%',
        flexDirection: 'column',
        display: 'flex',
        color: '#ffffff'
    },
    topBarContainerStyle: {
        backgroundColor: Colors.backgroundContrast,
    },
    topBarTitleContainerStyle: {
        marginLeft: Dimens.sideMargin,
        marginTop: Dimens.sideMargin,
        marginRight: Dimens.sideMargin,
        display: "flex",
        alignItems: "baseline"
    },
    topBarNoteLabelStyle: {
        ...Styles.bodyText,
        color: Colors.accentLight,
        marginLeft: Dimens.sideMargin,
        marginTop: Dimens.sideMarginHalf,
    },
    topBarDividerStyle: {
        ...Styles.divider,
        marginTop: Dimens.sideMargin
    },
    addKeybindButtonStyle: {
        ...Styles.buttonPrimary,
        marginTop: Dimens.sideMarginHalf,
        marginLeft: Dimens.sideMargin
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
