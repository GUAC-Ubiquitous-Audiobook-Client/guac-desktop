<script lang="ts">
import Vue from 'vue'
import {ipcRenderer} from 'electron'
import LibraryItemView from './library-item'
import {v4 as uuidv4} from 'uuid';
import {importFiles} from "../../../main/io";
import {Dimens, Styles} from '../../styles';
import {LibraryRepository, FileItem} from '../../data/library-repository';

let state = {
    data: LibraryRepository.instance.data,
    Styles: Styles,
    containerStyle: {
        height: '100%',
        flexDirection: 'column',
        display: 'flex',
        color: '#ffffff'
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
        marginBottom: Dimens.sideMargin
    },
    topBarTitleContainerStyle: {
        marginLeft: Dimens.sideMargin,
        marginTop: Dimens.sideMargin,
        marginRight: Dimens.sideMargin,
        display: "flex",
        alignItems: "baseline"
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
    filesContainer: {},
    autoImportDir: "D/:"
}

function _onImportFilesClick() {
    let res = importFiles(ipcRenderer, "All", [])
    LibraryRepository.instance.addLibraryItem(res)
}

export default Vue.component("library", {
    components: {LibraryItemView},
    data: function () {
        console.log(state.data) //this reference makes state.data reactive
        return state
    },
    methods: {
        onImportFilesClick: _onImportFilesClick,
    },
    computed: {
        selectedFilePath: function () {
            let id = this.$data.selectedFileId
            return this.$data.files.filter(file => file.id == id)[0]?.filePath
        },
        items: function () {
            return this.$data.data.libraryItems.map(function (val): string {
                return val.id
            })
        }
    },
    created() {
    }
})

</script>

<template>
    <div :style="containerStyle">
        <div :style="topBarContainerStyle">
            <div :style="topBarTitleContainerStyle">
                <p :style="titleStyle">Library</p>
                <p :style="importingLocationLabelStyle">Automatically importing from {{ autoImportDir }}</p>
                <button :style="changeAutoImportButtonStyle">
                    <p :style="Styles.buttonText">Change</p>
                </button>
            </div>
            <button :style="importFilesButtonStyle" v-on:click="onImportFilesClick">
                <p :style="Styles.buttonText">Import file(s)</p>
            </button>
        </div>

        <div v-bind:style="filesContainer">
            <LibraryItemView v-for="item in items" v-bind:libraryItemId="item" v-bind:key="item"/>
        </div>
    </div>
</template>
