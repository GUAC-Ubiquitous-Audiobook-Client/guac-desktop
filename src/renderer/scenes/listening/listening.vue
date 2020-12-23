<template>
    <div v-bind:style="containerStyle">
        <div :style="topBarContainerStyle">
            <div :style="topBarTitleContainerStyle">
                <div :style="topBarTitleLabelsContainerStyle">
                    <p :style="topBarTitleStyle">Listening</p>
                    <p :style="topBarPlayingTitleStyle">{{ bookName }}</p>
                    <button :style="topBarAddFilesButtonStyle">
                        <p :style="Styles.buttonText">Add file(s)</p>
                    </button>
                </div>
                <div :style="topBarCountdownsContainerStyles">
                    <p :style="topBarDurationCountdownStyle">0h 10m remaining</p>
                    <p :style="topBarDurationStyle">total 10h</p>
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
            <FileItem v-for="item in files.data.files" v-bind:data="item" v-bind:key="item.id"/>
        </div>
        <PlaybackController v-bind:style="playbackContainerStyle" v-bind:filePath="selectedFilePath"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FileItem from './file-item'
import PlaybackController from './playback-controller'
import {Colors, Dimens, Styles} from "../../styles";
import {LibraryRepositoryProvider} from "../../data/provider";

let state = {
    data: LibraryRepositoryProvider.libraryRepository.selectedLibraryItem,
    Styles: Styles,
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
    topBarAddFilesButtonStyle: {
        ...Styles.buttonSecondary,
        marginTop: Dimens.sideMarginHalf
    },
    tableHeaderContainerStyle: {
        ...Styles.bodyText,
        display: "flex",
        paddingTop: Dimens.sideMarginHalf,
        paddingRight: Dimens.sideMargin,
        paddingLeft: `calc(${Dimens.iconSize} + ${Dimens.sideMargin} + ${Dimens.sideMargin} + ${Dimens.sideMargin})`
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
    files: LibraryRepositoryProvider.libraryRepository.selectedLibraryItem,
    selectedFileId: null as string | null
}

function _onItemClick(fileId: string) {
    state.selectedFileId = fileId
}

export default Vue.component("listening", {
    components: {FileItem, PlaybackController},
    data: function () {
        return state
    },
    methods: {},
    computed: {
        selectedFilePath: function () {
            let id = this.$data.selectedFileId
            return this.$data.files.data.files.filter(file => file.id == id)[0]?.filePath
        },
        bookName: function (): string {
            return this.$data.files.data.name
        }
    },
})
</script>
