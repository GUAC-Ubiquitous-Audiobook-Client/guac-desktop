<script lang="ts">
import Vue from 'vue'
import { Routes } from './scenes/main'
import { Colors, Dimens } from './styles'

let state = {
    Routes: Routes,
    style: {
        height: '100%',
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: Colors.backgroundContrast,
        paddingRight: Dimens.sideMargin,
        paddingTop: Dimens.sideMargin
    },
    aboutStyle: {
        position: "fixed",
        bottom: 0
    },
    ahh: "hmm"
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
    this.$router.push(Routes.listening)
}

function _onLibraryClick() {
    this.$router.push(Routes.library)
}

function _onKeybindsClick() {
    this.$router.push(Routes.keybinds)
}

function _onAboutClick() {
    this.$router.push(Routes.about)
}

</script>

<template>
    <div :style="style">
        <ThemeListItem :selected="selectedItem(Routes.listening)" label="Listening" icon="sound-wave" v-bind:click="onListeningClick"/>
        <ThemeListItem :selected="selectedItem(Routes.library)" label="Library" icon="library" v-bind:click="onLibraryClick"/>
        <ThemeListItem :selected="selectedItem(Routes.keybinds)" label="Keybinds" icon="keyboard" v-bind:click="onKeybindsClick"/>
        <ThemeListItem :selected="selectedItem(Routes.about)" label="About" icon="logo-icon" v-bind:style="aboutStyle" v-bind:click="onAboutClick"/>
    </div>
</template>
