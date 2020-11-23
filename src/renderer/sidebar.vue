<script lang="ts">
import Vue from 'vue'
import ThemeListItem from "./components/theme-list-item.vue"

let state = {
    style: {
        height: '100%',
        flexDirection: 'column',
        display: 'flex',
    },
    aboutStyle: {
        position: "fixed",
        bottom: 0
    },
    listeningStyle: {},
    hover: false
}

export default Vue.component("Sidebar", {
    name: "Sidebar",
    data: function () {
        return state
    },
    components: {
        ThemeListItem
    },
    computed: {
        dah: function () {
            if (this.$data.hover)
                return {
                    backgroundColor: "red"
                }
            else
                return {
                    backgroundColor: "blue"
                }
        }
    },
    methods: {
        onListeningClick: _onListeningClick,
        onLibraryClick: _onLibraryClick,
        onKeybindsClick: _onKeybindsClick,
        onAboutClick: _onAboutClick
    }
})

function _onListeningClick() {
    this.$router.push('/listening')
}

function _onLibraryClick() {
    this.$router.push('/library')
}

function _onKeybindsClick() {
    this.$router.push('/keybinds')
}

function _onAboutClick() {
    this.$router.push('/about')
}


</script>

<template>
    <div v-bind:style="style">
        <p>GUAC</p>
        <ThemeListItem label="Listening" v-bind:click="onListeningClick"/>
        <ThemeListItem label="Library" v-bind:click="onLibraryClick"/>
        <ThemeListItem label="Keybinds" v-bind:click="onKeybindsClick"/>
        <ThemeListItem label="About" v-bind:style="aboutStyle" v-bind:click="onAboutClick"/>
    </div>
</template>
