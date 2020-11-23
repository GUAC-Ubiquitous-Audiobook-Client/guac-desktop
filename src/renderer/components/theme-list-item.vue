<script lang="ts">

import Vue from "vue";

let state = {
    hover: false
}

export default Vue.component("ThemeListItem", {
    data: function () {
        return state
    },
    props: {
        label: {
            type: String
        },
        click: {
            type: Function
        }
    },
    computed: {
        style: function () {
            if (this.$data.hover)
                return {
                    backgroundColor: "red"
                }
            else
                return {
                    backgroundColor: "cyan"
                }
        }
    },
})

</script>

<template>
    <div>
        <button
            @mouseover="hover = true"
            @mouseleave="hover = false"
            v-on:click="click"
            v-bind:style="style">
            label: {{ label }}
        </button>
    </div>
</template>
