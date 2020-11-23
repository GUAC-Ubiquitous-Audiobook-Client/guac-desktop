<script lang="ts">
import Sidebar from './sidebar.vue'

let state = {
    style: {
        display: "flex"
    }
}

export default {
    data: function () {
        return state
    },
    components: {
        Sidebar
    }
}

</script>

<template>
    <div v-bind:style="style">
        <Sidebar/>
        <router-view/>
    </div>
</template>
