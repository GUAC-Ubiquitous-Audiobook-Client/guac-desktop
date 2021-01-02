<template>
    <div v-bind:style="containerStyle">
        <div v-if="false" :style="contextContainerStyle" v-on:click="onContextMenuClick">
            <Icon :style="contextIconStyle" :icon="Icons.CONTEXT_VERTICAL"/>
            <DropdownMenu v-if="showDropdown" :items="dropdownItems"/>
        </div>
        <div :style="playIconContainerStyle" v-on:click="onPlayClick">
            <Icon :icon="Icons.PLAY"/>
        </div>
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
import {DateUtils} from "../../date";

const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

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
            _containerStyle: {
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
            contextIconStyle: {},
            playIconContainerStyle: {
                // marginLeft: Dimens.sideMargin,
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
            dropdownPopoverShow: true
        }
    },
    computed: {
        fileName: function () {
            return LibraryRepositoryProvider.libraryRepository.getFileName(this.data)
        },
        duration: function (): string {
            return DateUtils.formatDuration(dayjs.duration(this.data.clipLength * 1000))
        },
        dateAdded: function (): string {
            return dayjs(this.data.dateAddedTimestamp).format("DD-MM-YYYY")
        },
        _playedPercentage: function (): string {
            return ((this.data.clipLengthPlayed / this.data.clipLength || 0) * 100).toFixed(0)
        },
        playedPercentage: function (): string {
            return this._playedPercentage + "% played"
        },
        containerStyle: function () {
            if (this._playedPercentage == 100) {
                return {
                    ...this.$data._containerStyle,
                    opacity: 0.4
                }
            } else {
                return {
                    ...this.$data._containerStyle
                }
            }
        }
    },
    methods: {
        onPlayClick: function (e) {
            LibraryRepositoryProvider.libraryRepository.selectFileForCurrentLibraryItem(this.data.id)
        },
        onContextMenuClick: function (e) {
            this.$data.showDropdown = !this.$data.showDropdown
        },
    },
})

</script>
