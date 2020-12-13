<script lang="ts">
import Vue, {PropType} from "vue";
import { LibraryRepository, LibraryItem } from "../../data/library-repository";

export default Vue.component("LibraryItemView", {
    name: "LibraryItemView",
    props: {
        libraryItemId: {
            type: String,
            required: true
        }
    },
    data: function () {
        return {}
    },
    computed: {
        itemData: function(): LibraryItem {
            return LibraryRepository.instance.data.libraryItems.filter(item => item.id == this.libraryItemId)[0]
        },
        text: function () {
            return this.itemData.name
        },
        fileCount: function(): string {
            return this.itemData.files.length
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
