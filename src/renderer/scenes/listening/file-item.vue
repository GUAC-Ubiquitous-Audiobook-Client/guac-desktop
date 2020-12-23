<template>
    <div v-bind:style="containerStyle">
        <div :style="contextContainerStyle" v-on:click="onContextMenuClick">
            <Icon :style="contextIconStyle" :icon="Icons.CONTEXT_VERTICAL"/>
            <DropdownMenu v-if="showDropdown" :items="dropdownItems" />
        </div>
        <Icon :style="playIconStyle" :icon="Icons.PLAY"/>
        <div :style="labelsContainerStyle">
            <p :style="nameStyle">{{ fileName }}</p>
            <p :style="durationStyle">{{ duration }}</p>
            <p :style="dateAddedStyle">{{ dateAdded }}</p>
            <p :style="playedPercentageStyle">{{ playedPercentage }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import {Dimens, Styles} from "../../styles";
import {LibraryRepositoryProvider} from "../../data/provider";
import {FileItem} from "../../data/data";
import {Icons} from "../../components/icon.vue";
import {DropdownItem} from "../../components/dropdown-menu.vue";

export default Vue.component("FileItem", {
    name: "FileItem",
    props: {
        data: {
            type: Object as PropType<FileItem>,
            required: true
        }
    },
    data: function () {
        return {
            Icons: Icons,
            containerStyle: {
                ...Styles.bodyText,
                display: "flex",
                paddingLeft: Dimens.sideMargin,
                paddingTop: Dimens.sideMarginHalf,
                paddingRight: Dimens.sideMargin,
                paddingBottom: Dimens.sideMarginHalf
            },
            contextContainerStyle: {
                cursor: "pointer",
                position: "relative"
            },
            contextIconStyle: {
            },
            playIconStyle: {
                marginLeft: Dimens.sideMargin,
                cursor: "pointer"
            },
            labelsContainerStyle: {
                display: "flex",
                width: "100%",
            },
            nameStyle: {
                marginLeft: Dimens.sideMargin,
                width: "40%"
            },
            durationStyle: {
                marginLeft: Dimens.sideMarginHalf,
                width: "20%"
            },
            dateAddedStyle: {
                marginLeft: Dimens.sideMarginHalf,
                width: "20%"
            },
            playedPercentageStyle: {
                marginLeft: Dimens.sideMarginHalf,
                width: "20%"
            },
            dropdownItems: [
                {
                    label: "Remove file",
                    icon: Icons.CROSS,
                    action() {
                        console.log("clicked")
                    }
                },
                {
                    label: "Mark as played",
                    icon: Icons.CHECK,
                    action() {
                        console.log("clicked")
                    }
                }
            ] as Array<DropdownItem>,
            showDropdown: false,
            contextMenuIconStyle: {
                marginLeft: "auto",
                cursor: "pointer"
            },
        }
    },
    computed: {
        fileName: function () {
            return LibraryRepositoryProvider.libraryRepository.getFileName(this.data)
        },
        duration: function (): string {
            return "1h 20m"
        },
        dateAdded: function (): string {
            return "dd-mm-yyyy"
        },
        playedPercentage: function (): string {
            return "100% played"
        }
    },
    methods: {
        onClick: function (e) {
            this.data.onItemClick(this.data.id)
        },
        onContextMenuClick: function (e) {
            this.$data.showDropdown = !this.$data.showDropdown
        }
    },
})

</script>
