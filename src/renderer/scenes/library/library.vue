<script lang="ts">
import Vue from 'vue'
import {ipcRenderer} from 'electron'
import {LibraryItemData} from "./library-item";
import LibraryItem from './library-item'
import {v4 as uuidv4} from 'uuid';
import {importFiles} from "../../../main/io";
import {Dimens, Styles} from '../../styles';

let state = {
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
    items: [
        {
            id: "1",
            name: "/Users/curli/Books/Early Period, Volume 1/08. Menexenus.mp3",
            onItemClick: function (id: string) {
                _onItemClick(("1"))
            }
        },
        {
            id: "2",
            name: "/Users/curli/Books/Early Period, Volume 1/09. Ion.mp3",
            onItemClick: function (id: string) {
                _onItemClick(("2"))
            }
        }
    ] as LibraryItemData[],
    selectedItemId: null as string | null,
    autoImportDir: "D/:"
}

function _onImportFilesClick() {
    let res = importFiles(ipcRenderer, "All", [])
    state.items = res.map(function (val): LibraryItemData {
        let id = uuidv4()
        return {
            id: id,
            name: val.substring(val.lastIndexOf('/') + 1),
            onItemClick: _onItemClick(id)
        }
    });
}

function _onItemClick(fileId: string) {
    state.selectedItemId = fileId
}

export default Vue.component("library", {
    components: {LibraryItem},
    data: function () {
        return state
    },
    methods: {
        onImportFilesClick: _onImportFilesClick,
    },
    computed: {
        selectedFilePath: function () {
            let id = this.$data.selectedFileId
            return this.$data.files.filter(file => file.id == id)[0]?.filePath
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
            <button :style="importFilesButtonStyle">
                <p :style="Styles.buttonText">Import file(s)</p>
            </button>
        </div>

        <div v-bind:style="filesContainer">
            <LibraryItem v-for="item in items" v-bind:data="item" v-bind:key="item.id"/>
        </div>
    </div>
</template>
