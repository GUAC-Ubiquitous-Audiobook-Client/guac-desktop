<script lang="ts">
import Vue from "vue";
import {ipcRenderer} from "electron";
import {KeybindAction} from "../../../main/keybinds";

let state = {
    style: {},
    _playbackSpeed: 1,
    _volume: 1,
    _trackDuration: 0,
    _trackCurrentSecond: 0
}

let player: HTMLAudioElement

export default Vue.component("PlaybackController", {
    name: "PlaybackController",
    data: function () {
        return state
    },
    props: {
        filePath: {
            type: String
        }
    },
    computed: {
        duration: function () {
            return `${this.$data._trackCurrentSecond} / ${this.$data._trackDuration} `
        },
        playbackSpeed: function () {
            return `${this.$data._playbackSpeed.toFixed(2)}x`
        },
        volume: function () {
            return `${(this.$data._volume * 100).toFixed(0)}%`
        }
    },
    methods: {
        onPlayClick: _onPlayClick,
        onPauseClick: _onPauseClick,
        onBackwardClick: _onBackwardClick,
        onForwardClick: _onForwardClick,
        onPlaybackSpeedUpClick: _onPlaybackSpeedUpClick,
        onPlaybackSpeedDownClick: _onPlaybackSpeedDownClick,
        onPlaybackVolumeDown: _onPlaybackVolumeDown,
        onPlaybackVolumeUp: _onPlaybackVolumeUp
    },
    watch: {
        filePath: function (val) {
            _onTrackSelected(val)
        }
    },
    created() {
        player = new Audio()
        registerKeybindObservers()
    },
})

function registerKeybindObservers() {
    Object.values(KeybindAction).forEach((action) => {
        ipcRenderer.on(action, () => {
            switch (action as KeybindAction) {
                case KeybindAction.PLAY:
                    _onPlayClick()
                    break;
                case KeybindAction.PAUSE:
                    _onPauseClick()
                    break;
                case KeybindAction.FORWARD:
                    _onForwardClick()
                    break;
                case KeybindAction.BACKWARD:
                    _onBackwardClick()
                    break;
                case KeybindAction.SPEED_UP:
                    _onPlaybackSpeedUpClick()
                    break;
                case KeybindAction.SPEED_DOWN:
                    _onPlaybackSpeedDownClick()
                    break;
                case KeybindAction.VOLUME_UP:
                    _onPlaybackVolumeUp()
                    break;
                case KeybindAction.VOLUME_DOWN:
                    _onPlaybackVolumeDown()
                    break;
            }
        })
    })
}

function _onTrackSelected(_filePath: string) {
    player.src = 'file://' + _filePath
    player.load()
    player.oncanplaythrough = (event) => {
        console.log(player)
        state._trackDuration = player.duration
        player.volume = 0.1
    }
    player.ontimeupdate = (event) => {
        console.log(event)
        state._trackCurrentSecond = player.currentTime
    }
    player.onratechange = (event) => {
        state._playbackSpeed = player.playbackRate
    };
    player.onvolumechange = (event) => {
        state._volume = player.volume
    }
}

function _onPlayClick() {
    player.play()
}

function _onPauseClick() {
    player.pause()
}

function _onBackwardClick() {
    player.currentTime -= 10
}

function _onForwardClick() {
    player.currentTime += 10
}

function _onPlaybackSpeedUpClick() {
    player.playbackRate = player.playbackRate + 0.1
}

function _onPlaybackSpeedDownClick() {
    player.playbackRate = player.playbackRate - 0.1
}

function _onPlaybackVolumeDown() {
    player.volume += -0.1
}

function _onPlaybackVolumeUp() {
    player.volume += 0.1
}

</script>

<template>
    <div v-bind:style="style">
        <button v-on:click="onPlayClick">play</button>
        <button v-on:click="onPauseClick">pause</button>
        <button v-on:click="onBackwardClick">backward 10s</button>
        <button v-on:click="onForwardClick">forward 10s</button>
        <button v-on:click="onPlaybackSpeedDownClick">speed -0.1</button>
        <button v-on:click="onPlaybackSpeedUpClick">speed +0.1</button>
        <button v-on:click="onPlaybackVolumeDown">Volume -10%</button>
        <button v-on:click="onPlaybackVolumeUp">Volume +10%</button>
        <p style="font-family: Padauk">Duration: {{ duration }}</p>
        <p>Volume: {{ volume }}</p>
        <p>speed: {{ playbackSpeed }}</p>
        <p>file path: {{ filePath }}</p>
    </div>
</template>
