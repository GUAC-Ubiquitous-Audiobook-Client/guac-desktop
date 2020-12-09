<script lang="ts">
import Vue from 'vue'
import {ipcRenderer} from 'electron'
import {FileItemData} from "./file-item";
import FileItem from './file-item'
import PlaybackController from './playback-controller'
import {v4 as uuidv4} from 'uuid';
import {importFiles} from "../../../main/io";

let state = {
    style: {
        height: '100%',
        flexDirection: 'column',
        display: 'flex',
        color: '#ffffff'
    },
    filesContainer: {},
    playbackContainerStyle: {
        marginTop: 'auto',
        position: 'fixed',
        bottom: 0
    },
    files: [
        {
            id: "1",
            fileName: "a",
            filePath: "/Users/curli/Books/Early Period, Volume 1/08. Menexenus.mp3",
            filePathEncoded: "/Users/curli/Books/Early%20Period,%20Volume%201/08.%20Menexenus.mp3",
            onItemClick: function (id: string) {
                _onItemClick(("1"))
            }
        },
        {
            id: "2",
            fileName: "b",
            filePath: "/Users/curli/Books/Early Period, Volume 1/09. Ion.mp3",
            filePathEncoded: "/Users/curli/Books/Early%20Period,%20Volume%201/08.%20Menexenus.mp3",
            onItemClick: function (id: string) {
                _onItemClick(("2"))
            }
        }
    ] as FileItemData[],
    selectedFileId: null as string | null
}

function _onImportFilesClick() {
    let res = importFiles(ipcRenderer, "All", [])
    state.files = res.map(function (val): FileItemData {
        let id = uuidv4()
        return {
            id: id,
            filePath: val,
            fileName: val.substring(val.lastIndexOf('/') + 1),
            filePathEncoded: encodeURI(val),
            onItemClick: _onItemClick(id)
        }
    });
}

function _onOpenKeybindsClick() {
    this.$router.push('/keybinds')
}

function _onItemClick(fileId: string) {
    state.selectedFileId = fileId
}

export default Vue.component("listening", {
    components: {FileItem, PlaybackController},
    data: function () {
        return state
    },
    methods: {
        onImportFilesClick: _onImportFilesClick,
        onOpenKeybindsClick: _onOpenKeybindsClick
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
    <div v-bind:style="style">
        <button v-on:click="onOpenKeybindsClick">open keybinds</button>
        <button v-on:click="onImportFilesClick">get files</button>
        <div v-bind:style="filesContainer">
            <FileItem v-for="item in files" v-bind:data="item" v-bind:key="item.id"/>
        </div>
        <PlaybackController v-bind:style="playbackContainerStyle" v-bind:filePath="selectedFilePath"/>
    </div>
</template>
