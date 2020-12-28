<template>
    <div :style="containerStyle">
        <div :style="topBarContainerStyle">
            <div :style="topBarTitleContainerStyle">
                <p :style="titleStyle">Library</p>
                <p v-if="false" :style="importingLocationLabelStyle">
                    Automatically importing from {{ autoImportDir }}
                </p>
                <button v-if="false" :style="changeAutoImportButtonStyle">
                    <p :style="Styles.buttonText">Change</p>
                </button>
            </div>
            <button :style="importFilesButtonStyle" v-on:click="onImportFilesClick">
                <p :style="Styles.buttonPrimaryText">Import file(s)</p>
            </button>
            <div :style="topBarDividerStyle"/>
        </div>

        <div v-bind:style="booksContainerStyle">
            <LibraryItemView v-for="(item, index) in items" :style="bookItemStyle(index)" v-bind:libraryItemId="item"
                             v-bind:key="item"/>
            <!-- empty tags to add margin at the end of the grid view -->
            <p :style="gridBottomSpaceStyle">​</p>
            <p :style="gridBottomSpaceStyle">​</p>
            <p :style="gridBottomSpaceStyle">​</p>
        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {ipcRenderer} from 'electron'
import LibraryItemView from './library-item'
import {importFiles} from "../../../main/io";
import {Colors, Dimens, Styles} from '../../styles';
import {LibraryRepositoryProvider} from "../../data/provider";

let state = {
    Styles: Styles,
    containerStyle: {
        height: '100%',
        flexDirection: 'column',
        display: 'flex',
    },
    playbackContainerStyle: {
        marginTop: 'auto',
        position: 'fixed',
        bottom: 0
    },
    titleStyle: {
        ...Styles.titleText
    },
    topBarContainerStyle: {
        backgroundColor: Colors.backgroundContrast,
    },
    topBarTitleContainerStyle: {
        marginLeft: Dimens.sideMargin,
        marginTop: Dimens.sideMargin,
        marginRight: Dimens.sideMargin,
        display: "flex",
        alignItems: "baseline"
    },
    topBarDividerStyle: {
        ...Styles.divider,
        marginTop: Dimens.sideMargin
    },
    importingLocationLabelStyle: {
        marginLeft: "auto"
    },
    importFilesButtonStyle: {
        ...Styles.buttonPrimary,
        marginLeft: Dimens.sideMargin
    },
    changeAutoImportButtonStyle: {
        ...Styles.buttonSecondary
    },
    booksContainerStyle: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: Dimens.sideMargin,
        paddingLeft: Dimens.sideMargin,
        paddingRight: Dimens.sideMargin,
        overflowY: "auto",
    },
    gridBottomSpaceStyle: {
        marginBottom: Dimens.sideMargin
    },
    data: LibraryRepositoryProvider.libraryRepository.libraryItems,
}

export default Vue.component("library", {
    components: {LibraryItemView},
    data: function () {
        return state
    },
    methods: {
        onImportFilesClick() {
            let res = importFiles(ipcRenderer, "All", [])
            LibraryRepositoryProvider.libraryRepository.addLibraryItem(res)
        },
        bookItemStyle(index) {
            if (index < 3) {
                return {
                    marginTop: Dimens.sideMargin
                }
            } else {
                return {}
            }
        }
    },
    computed: {
        selectedFilePath: function () {
            let id = this.$data.selectedFileId
            return this.$data.files.filter(file => file.id == id)[0]?.filePath
        },
        items: function () {
            return this.$data.data.data.map(function (val): string {
                return val.id
            })
        }
    },
})

</script>
