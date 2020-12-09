<script lang="ts">
import Vue, {PropType} from "vue";

export interface FileItemData {
    id: string
    fileName: string
    filePath: string
    filePathEncoded: string
    onItemClick: (string) => void
    fileImage: string | null
}

export default Vue.component("FileItem", {
    name: "FileItem",
    props: {
        data: {
            type: Object as PropType<FileItemData>,
            required: true
        }
    },
    data: function () {
        return {
            style: {}
        }
    },
    computed: {
        text: function () {
            return `${this.data.fileName} - ${this.data.filePath}`
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
        <button v-on:click="onClick">select</button>
    </div>
</template>
