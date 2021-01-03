<template>
    <div v-bind:style="containerStyle">
        <div :style="topBarContainerStyle">
            <div :style="topBarTitleContainerStyle">
                <p :style="Styles.titleText">Keybinds</p>
            </div>
            <button :style="addKeybindButtonStyle" v-on:click="onAddKeybindsClick">
                <p :style="Styles.buttonPrimaryText">Add keybind</p>
            </button>
            <p :style="topBarNoteLabelStyle">
                Note: Keybinds will override the key combination you select and it won't be usable in other programs
            </p>
            <div :style="topBarDividerStyle"/>
        </div>

        <div>
            <KeybindsItemView v-for="(item, index) in items" v-bind:keybindItemId="item" v-bind:key="item"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {KeybindAction, registerKeybind} from "../../../main/keybinds";
import {ipcRenderer} from "electron";
import KeybindsItemView from './keybinds-item'
import {Colors, Dimens, Styles} from "../../styles";
import {KeybindsRepositoryProvider} from "../../data/keybinds/provider";

let state = {
    Styles: Styles,
    data: KeybindsRepositoryProvider.keybindsRepository.keybindsData,
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
    keybind: "",
}

export default Vue.component("home", {
    components: {KeybindsItemView},
    data: function () {
        return state
    },
    methods: {
        onAddKeybindsClick: function () {
            KeybindsRepositoryProvider.keybindsRepository.addKeybind()
        }
    },
    computed: {
        items: function () {
            return this.$data.data.data.map(function (val): string {
                return val.id
            })
        }
    }
})

</script>
