<script lang="ts">
import Vue from 'vue'
import {Routes} from './scenes/main'
import {Colors, Dimens, Styles} from './styles'
import {Icons} from "./components/icon.vue";

let state = {
    Routes: Routes,
    Icons: Icons,
    containerStyle: {
        display: "flex"
    },
    itemsContainerStyle: {
        height: '100%',
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: Colors.backgroundContrast,
        paddingRight: Dimens.sideMargin,
    },
    aboutStyle: {
        marginTop: "auto"
    },
    listeningStyle: {
        marginTop: Dimens.sideMargin
    },
    dividerStyle: {
        backgroundColor: Colors.backgroundContentBorder,
        width: "1px",
        height: "100%"
    }
}
export default Vue.component("Sidebar", {
    name: "Sidebar",
    data: function () {
        return state
    },
    methods: {
        onListeningClick: _onListeningClick,
        onLibraryClick: _onLibraryClick,
        onKeybindsClick: _onKeybindsClick,
        onAboutClick: _onAboutClick
    },
    computed: {
        selectedItem() {
            return path => path === this.$route.path
        }
    }
})

function _onListeningClick() {
    this.$router.push(Routes.LISTENING)
}

function _onLibraryClick() {
    this.$router.push(Routes.LIBRARY)
}

function _onKeybindsClick() {
    this.$router.push(Routes.KEYBINDS)
}

function _onAboutClick() {
    this.$router.push(Routes.ABOUT)
}

</script>

<template>
    <div :style="containerStyle">

        <div :style="itemsContainerStyle">
            <ThemeListItem :selected="selectedItem(Routes.LISTENING)" label="Listening"
                           :icon="Icons.SOUND_WAVE" :style="listeningStyle" v-bind:click="onListeningClick"/>
            <ThemeListItem :selected="selectedItem(Routes.LIBRARY)" label="Library" :icon="Icons.LIBRARY"
                           v-bind:click="onLibraryClick"/>
            <ThemeListItem :selected="selectedItem(Routes.KEYBINDS)" label="Keybinds" :icon="Icons.KEYBOARD"
                           v-bind:click="onKeybindsClick"/>
            <ThemeListItem :selected="selectedItem(Routes.ABOUT)" label="About" :icon="Icons.LOGO_ICON" :style="aboutStyle"
                           v-bind:click="onAboutClick"/>
        </div>
        <div :style="dividerStyle"/>
    </div>
</template>
