<script lang="ts">
import Vue from 'vue'

let state = {
    style: {
        height: '100%',
        flexDirection: 'column',
        display: 'flex',
    },
}


export default Vue.component("listening", {
    data: function () {
        return state
    },

})

</script>

<template>
    <div v-bind:style="style">
        <p>Listening page</p>
    </div>
</template>
