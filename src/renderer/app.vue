<script lang="ts">
import Sidebar from './sidebar.vue'
import Icon from './components/icon.vue'
import ThemeListItem from './components/theme-list-item.vue'
import DropdownMenu from './components/dropdown-menu.vue'
import { Colors } from './styles'

let state = {
    style: {
        display: "flex",
        height: "inherit",
        backgroundColor: Colors.background
    }
}

export default {
    data: function () {
        return state
    },
    components: {
        Sidebar,
        Icon,
        ThemeListItem,
        DropdownMenu
    },
}

</script>

<template>
    <div v-bind:style="style">
        <Sidebar/>
        <router-view style="width: 100%"/>
    </div>
</template>
