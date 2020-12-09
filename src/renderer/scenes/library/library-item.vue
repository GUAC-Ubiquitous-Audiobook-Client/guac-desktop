<script lang="ts">
import Vue, {PropType} from "vue";

export interface LibraryItemData {
    id: string
    name: string
    onItemClick: (string) => void
}

export default Vue.component("LibraryItem", {
    name: "LibraryItem",
    props: {
        data: {
            type: Object as PropType<LibraryItemData>,
            required: true
        }
    },
    data: function () {
        return {
            playedPercentage: 1,
            style: {}
        }
    },
    computed: {
        text: function () {
            return `${this.data.name}`
        }
    },
    methods: {
        onClick: function (e) {
            this.data.onItemClick(this.data.id)
        }
    }
})

</script>

<template>
    <div v-bind:style="style">
        <p>{{ text }}</p>
        <p>{{ fileCount }} files</p>
        <p>{{ playedPercentage }}% played</p>
    </div>
</template>
