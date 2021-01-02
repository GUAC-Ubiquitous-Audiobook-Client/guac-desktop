<template>
    <div v-bind:style="containerStyle">
        <div :style="topBarContainerStyle">
            <div :style="topBarTitleContainerStyle">
                <div :style="topBarTitleLabelsContainerStyle">
                    <p :style="topBarTitleStyle">Listening</p>
                    <p :style="topBarPlayingTitleStyle">{{ bookName }}</p>
                    <div :style="topBarActionsContainerStyle">
                        <button :style="topBarAddFilesButtonStyle" v-on:click="onAddFileClick">
                            <p :style="Styles.buttonText">Add file(s)</p>
                        </button>
                        <div :style="topBarContextButtonContainerStyle" v-on:click="onContextMenuClick">
                            <Icon :icon="Icons.CONTEXT_VERTICAL"/>
                            <DropdownMenu v-if="showDropdown" :items="dropdownItems" :onClickOutside="hideContextMenu"/>
                        </div>
                    </div>
                </div>
                <div :style="topBarCountdownsContainerStyles">
                    <p :style="topBarDurationCountdownStyle">{{ durationRemaining }}</p>
                    <p :style="topBarDurationStyle">{{ durationTotal }}</p>
                </div>
            </div>
            <div :style="topBarDividerStyle"/>
        </div>

        <div :style="tableHeaderContainerStyle">
            <div :style="tableHeaderLabelsContainerStyle">
                <p :style="tableHeaderNameStyle">File name</p>
                <p :style="tableHeaderDurationStyle">Duration</p>
                <p :style="tableHeaderDateAddedStyle">Added</p>
                <p :style="tableHeaderPlayedPercentageStyle">Played</p>
            </div>
        </div>
        <div :style="tableHeaderDividerStyle"/>

        <div v-bind:style="filesContainerStyle">
            <FileItem v-for="item in files" v-bind:data="item" v-bind:key="item.id" :style="fileItemStyle(item)"/>
        </div>
        <PlaybackController v-if="selectedFile != null" v-bind:style="playbackContainerStyle" :file="selectedFile"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FileItem from './file-item'
import PlaybackController from './playback-controller'
import {Colors, Dimens, Styles} from "../../styles";
import {LibraryRepositoryProvider} from "../../data/provider";
import {DateUtils} from "../../date";
import dayjs from "dayjs";
import {importFiles} from "../../../main/io";
import {ipcRenderer} from "electron";
import {Icons} from "../../components/icon.vue";
import {DropdownItem} from "../../components/dropdown-menu.vue";
import {Routes} from "../main";

const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

let state = {
    Styles: Styles,
    Icons: Icons,
    containerStyle: {
        height: '100%',
        flexDirection: 'column',
        display: 'flex',
    },
    topBarTitleStyle: {
        ...Styles.titleText
    },
    topBarContainerStyle: {
        backgroundColor: Colors.backgroundContrast
    },
    topBarTitleContainerStyle: {
        marginLeft: Dimens.sideMargin,
        marginTop: Dimens.sideMargin,
        marginRight: Dimens.sideMargin,
        display: "flex",
        alignItems: "baseline"
    },
    topBarTitleLabelsContainerStyle: {
        marginRight: Dimens.sideMargin
    },
    topBarCountdownsContainerStyles: {
        marginLeft: "auto",
        textAlignment: "end",
        alignSelf: "flex-end",
        textAlign: "end",
        whiteSpace: "nowrap",
    },
    topBarDividerStyle: {
        ...Styles.divider,
        marginTop: Dimens.sideMargin,
    },
    topBarPlayingTitleStyle: {
        ...Styles.subtitleText
    },
    topBarDurationCountdownStyle: {
        ...Styles.subtitleText,
    },
    topBarDurationStyle: {
        color: Colors.textSecondaryColor,
        fontSize: "20px"
    },
    topBarActionsContainerStyle: {
        marginTop: Dimens.sideMarginHalf,
        display: "flex"
    },
    topBarAddFilesButtonStyle: {
        ...Styles.buttonSecondary,
    },
    topBarContextButtonContainerStyle: {
        height: "max-content",
        border: `1px solid ${Colors.accent}`,
        borderRadius: `${Dimens.cornerRadius}`,
        cursor: "pointer",
        padding: "4px",
        marginLeft: Dimens.sideMarginHalf
    },
    tableHeaderContainerStyle: {
        ...Styles.bodyText,
        display: "flex",
        paddingTop: Dimens.sideMarginHalf,
        paddingRight: Dimens.sideMargin,
        paddingLeft: `calc(${Dimens.sideMargin} + ${Dimens.sideMargin})`
    },
    tableHeaderLabelsContainerStyle: {
        display: "flex",
        width: "100%",
    },
    tableHeaderNameStyle: {
        marginLeft: Dimens.sideMargin,
        width: "40%",
        color: Colors.textSecondaryColor
    },
    tableHeaderDurationStyle: {
        marginLeft: Dimens.sideMarginHalf,
        width: "20%",
        color: Colors.textSecondaryColor
    },
    tableHeaderDateAddedStyle: {
        marginLeft: Dimens.sideMarginHalf,
        width: "20%",
        color: Colors.textSecondaryColor
    },
    tableHeaderPlayedPercentageStyle: {
        marginLeft: Dimens.sideMarginHalf,
        width: "20%",
        color: Colors.textSecondaryColor
    },
    tableHeaderDividerStyle: {
        ...Styles.divider,
        marginTop: Dimens.sideMarginHalf
    },
    filesContainerStyle: {
        overflowY: "auto",
    },
    playbackContainerStyle: {
        marginTop: 'auto',
        bottom: 0
    },
    showDropdown: false,
    filesData: LibraryRepositoryProvider.libraryRepository.libraryItems,
    selectedFileId: null as string | null,
}

function _onItemClick(fileId: string) {
    state.selectedFileId = fileId
}

export default Vue.component("listening", {
    components: {FileItem, PlaybackController},
    data: function () {
        return state
    },
    computed: {
        durationTotal: function (): string {
            const dur = this.$data.filesData.getSelectedItem()?.files.reduce((a, b) => a + b.clipLength, 0)
            return `total ${DateUtils.formatDuration(dayjs.duration(dur * 1000))}`
        },
        durationRemaining: function (): string {
            const dur = this.$data.filesData.getSelectedItem()?.files.reduce((a, b) => a + b.clipLength, 0)
            const played = this.$data.filesData.getSelectedItem()?.files.reduce((a, b) => a + b.clipLengthPlayed, 0)
            return `${DateUtils.formatDuration(dayjs.duration((dur - played) * 1000))} remaining`
        },
        files: function () {
            if (this.$data.filesData.getSelectedItem() !== undefined) {
                return this.$data.filesData.getSelectedItem().files
            } else {
                return []
            }
        },
        bookName: function (): string {
            if (this.$data.filesData.getSelectedItem() !== undefined) {
                return this.$data.filesData.getSelectedItem().name
            } else {
                return ""
            }
        },
        selectedFile: function (): string {
            return this.$data.filesData.getSelectedFileForItem()
        },
        fileItemStyle: function () {
            const a = {
                border: `1px solid ${Colors.accentLight}`
            }
            const b = {
                border: `1px solid transparent`
            }
            return (file) => (this.selectedFile != null && this.selectedFile.id === file.id) ? a : b
        },
        dropdownItems: function (): Array<DropdownItem> {
            const instanceThis = this
            return [
                {
                    label: "Remove from library",
                    icon: Icons.CROSS,
                    action() {
                        LibraryRepositoryProvider.libraryRepository.deleteCurrentSelectedLibraryItem()
                        instanceThis.$router.push(Routes.LIBRARY)
                    }
                },
            ] as Array<DropdownItem>
        }
    },
    methods: {
        onAddFileClick: function () {
            let res = importFiles(ipcRenderer, "All", [])
            LibraryRepositoryProvider.libraryRepository.addFilesToLibraryItem(res)
        },
        onContextMenuClick: function () {
            this.$data.showDropdown = !this.$data.showDropdown
        },
        hideContextMenu() {
            //TODO hide context menu when clicking anywhere on the page
            console.log(this.$data.showDropdown)
        },
        deleteAction() {
            LibraryRepositoryProvider.libraryRepository.deleteCurrentSelectedLibraryItem()
            this.$router.push(Routes.LIBRARY)
        }
    },
})
</script>
