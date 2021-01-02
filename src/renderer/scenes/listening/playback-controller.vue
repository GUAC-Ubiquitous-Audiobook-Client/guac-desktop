<template>
    <div v-bind:style="containerStyle">
        <div :style="dividerStyle"/>
        <div :style="contentContainerStyle">
            <div :style="primaryActionsContainerStyle">
                <img :style="imageStyle" :src="imageSrc"/>

                <div :style="primaryActionsButtonsContainerStyle">
                    <div :style="skipActionContainerStyle" v-on:click="onNextFileClick">
                        <Icon :icon="Icons.SKIP_PREVIOUS"/>
                    </div>
                    <div :style="playActionContainerStyle" v-on:click="onPlayClick">
                        <Icon :icon="playIcon" :color="Colors.backgroundContent"/>
                    </div>
                    <div :style="skipActionContainerStyle" v-on:click="onPreviousFileClick">
                        <Icon :icon="Icons.SKIP_NEXT"/>
                    </div>

                </div>
            </div>
            <div :style="fileNameContainerStyle">
                <p :style="fileNameStyle">{{ fileName }}</p>
                <p :style="fileTotalDurationStyle">{{ durationTotal }}</p>
            </div>
            <div :style="rightSideContentContainerStyle">
                <div :style="detailActionsContainerStyle">
                    <div :style="forwardActionContainerStyle" v-on:click="onBackwardClick">
                        <Icon :icon="Icons.BACKWARDS_10" size="32px"/>
                    </div>
                    <div :style="forwardActionContainerStyle" v-on:click="onForwardClick">
                        <Icon :icon="Icons.FORWARD_10" size="32px"/>
                    </div>
                    <ButtonScroller :icon="Icons.SPEED" :label="playbackSpeed"
                                    :scrollDownAction="onPlaybackSpeedDownClick"
                                    :scrollUpAction="onPlaybackSpeedUpClick"/>
                    <ButtonScroller :icon="Icons.VOLUME" :label="volume" :scrollDownAction="onPlaybackVolumeDown"
                                    :scrollUpAction="onPlaybackVolumeUp"/>
                </div>
                <div :style="durationDetailsContainerStyle">
                    <p :style="durationRemainingLabelStyle">{{ durationRemaining }}</p>
                    <div :style="durationRemainingProgressContainerStyle">
                        <p :style="durationElapsedLabelStyle">{{ durationElapsed }}</p>
                        <div class="slidecontainer" :style="durationRemainingProgressBarOuterStyle">
                            <input
                                :style="durationRemainingProgressBarStyle"
                                ref="input"
                                v-model="durationProgressValue"
                                type="range"
                                min="0"
                                max="100"
                                class="slider"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import {ipcRenderer} from "electron";
import {KeybindAction} from "../../../main/keybinds";
import {LibraryRepositoryProvider} from "../../data/provider";
import {FileItem} from "../../data/data";
import {Colors, Dimens, Styles} from "../../styles";
import {Icons} from "../../components/icon.vue";
import {DateUtils} from "../../date";

const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

let state = {
    Icons: Icons,
    Colors: Colors,
    containerStyle: {
        backgroundColor: Colors.backgroundContent,
    },
    dividerStyle: {
        ...Styles.divider
    },
    contentContainerStyle: {
        padding: Dimens.sideMargin,
        display: "flex"
    },
    primaryActionsContainerStyle: {
        width: "min-content",
    },
    primaryActionsButtonsContainerStyle: {
        width: "30%",
        display: "flex",
        gap: "8px",
        marginTop: Dimens.sideMarginHalf
    },
    playActionContainerStyle: {
        borderRadius: `${Dimens.cornerRadius}`,
        cursor: "pointer",
        backgroundColor: Colors.accent,
        padding: "4px"
    },
    skipActionContainerStyle: {
        border: `1px solid ${Colors.accent}`,
        borderRadius: `${Dimens.cornerRadius}`,
        cursor: "pointer",
        padding: "4px"
    },
    imageStyle: {
        width: "100%",
        height: "auto",
        border: `1px solid ${Colors.backgroundContentBorder}`,
        borderRadius: `${Dimens.cornerRadius}`,
    },
    fileNameContainerStyle: {
        width: "20%"
    },
    fileNameStyle: {
        ...Styles.bodyText,
        marginLeft: Dimens.sideMarginHalf
    },
    fileTotalDurationStyle: {
        ...Styles.bodyText,
        marginTop: "8px",
        marginLeft: Dimens.sideMarginHalf
    },
    detailActionsContainerStyle: {
        display: "flex",
        gap: "16px",
        justifyContent: "flex-end"
    },
    rightSideContentContainerStyle: {
        alignContent: "self",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    forwardActionContainerStyle: {
        border: `1px solid ${Colors.accent}`,
        borderRadius: `${Dimens.cornerRadius}`,
        cursor: "pointer",
        padding: "4px"
    },
    speedActionContainerStyle: {
        display: "flex",
        border: `1px solid ${Colors.accent}`,
        borderRadius: `${Dimens.cornerRadius}`,
        cursor: "pointer",
        padding: "4px",
        ...Styles.bodyText
    },
    durationDetailsContainerStyle: {},
    durationRemainingProgressContainerStyle: {
        display: "flex",
        alignItems: "center"
    },
    durationRemainingProgressBarOuterStyle: {
        width: "100%",
        // border: `1px solid ${Colors.accentLight}`,
        // backgroundColor: Colors.buttonBackgroundHover,
        borderRadius: `${Dimens.cornerRadius}`,
        marginLeft: Dimens.sideMarginHalf,
        display: "flex"
    },
    durationRemainingProgressBarStyle: {
        width: "100%"
    },
    durationRemainingLabelStyle: {
        ...Styles.subtitleText,
        textAlign: "right",
    },
    durationElapsedLabelStyle: {
        ...Styles.bodyText,
        marginLeft: Dimens.sideMarginDouble,
        whiteSpace: "nowrap"
    },
    _playbackSpeed: 1,
    _volume: 0.5,
    _trackDuration: 0,
    _trackCurrentSecond: 0,
    playing: false,
    imageSrc: "",
}

let player: HTMLAudioElement = new Audio()

export default Vue.component("PlaybackController", {
    data: function () {
        return state
    },
    props: {
        file: {
            type: Object as PropType<FileItem>,
            required: true
        }
    },
    computed: {
        duration: function () {
            return `${this.$data._trackCurrentSecond} / ${this.$data._trackDuration} `
        },
        playbackSpeed: function () {
            player.playbackRate = this.$data._playbackSpeed
            return `${this.$data._playbackSpeed.toFixed(2)}x`
        },
        volume: function () {
            player.volume = this.$data._volume
            return `${Math.abs((this.$data._volume * 100).toFixed(0))}%`
        },
        fileName: function (): string {
            LibraryRepositoryProvider.libraryRepository.getThumbnailForFile(this.file.path).then((res) => {
                this.imageSrc = 'data:image/jpeg;base64,' + res.toString('base64');
            })
            _onTrackSelected(this.file)
            return LibraryRepositoryProvider.libraryRepository.getFileName(this.file)
        },
        durationTotal: function (): string {
            try {
                const d = dayjs.duration(this.$data._trackDuration * 1000)
                return DateUtils.formatDuration(d)
            } catch (e: unknown) {
                return ""
            }
        },
        durationElapsed: function (): string {
            const d = dayjs.duration(this.$data._trackCurrentSecond * 1000)
            return DateUtils.formatDuration(d)
        },
        durationRemaining: function (): string {
            const d = dayjs.duration((this.$data._trackDuration - this.$data._trackCurrentSecond) * 1000)
            return DateUtils.formatDuration(d) + " remaining"
        },
        playIcon: function (): string {
            if (this.$data.playing) {
                return Icons.PAUSE
            } else {
                return Icons.PLAY
            }
        },
        durationProgressValue: {
            get: function () {
                return this.$data._trackCurrentSecond * 100 / this.$data._trackDuration
            },
            set: function (newValue) {
                player.currentTime = player.duration / 100 * newValue
            }
        }
    },
    methods: {
        onPlayClick: _onPlayClick,
        onBackwardClick: _onBackwardClick,
        onForwardClick: _onForwardClick,
        onPlaybackSpeedUpClick: _onPlaybackSpeedUpClick,
        onPlaybackSpeedDownClick: _onPlaybackSpeedDownClick,
        onPlaybackVolumeDown: _onPlaybackVolumeDown,
        onPlaybackVolumeUp: _onPlaybackVolumeUp,
        onNextFileClick: function () {

        },
        onPreviousFileClick: function () {

        }
    },
    created() {
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

function _onTrackSelected(file: FileItem) {
    player.src = 'file://' + file.path
    player.load()
    player.oncanplaythrough = (event) => {
        state._trackDuration = player.duration
    }
    player.ontimeupdate = (event) => {
        state._trackCurrentSecond = player.currentTime
        _saveTrackPlayedLength(player.currentTime)
    }
}

function _saveTrackPlayedLength(length: number) {
    LibraryRepositoryProvider.libraryRepository.setFileLengthPlayedForCurrentLibraryItem(length)
}

function _onPlayClick() {
    if (player.paused) {
        state.playing = true
        player.play()
    } else {
        state.playing = false
        player.pause()
    }
}

function _onBackwardClick() {
    player.currentTime -= 10
}

function _onForwardClick() {
    player.currentTime += 10
}

function _onPlaybackSpeedUpClick() {
    if (state._playbackSpeed < 9.99) {
        state._playbackSpeed += 0.01
    } else {
        state._playbackSpeed = 10
    }
}

function _onPlaybackSpeedDownClick() {
    if (state._playbackSpeed > 0.01) {
        state._playbackSpeed -= 0.01
    } else {
        state._playbackSpeed = 0
    }
}

function _onPlaybackVolumeDown() {
    if (state._volume > 0.01) {
        state._volume -= 0.01
    } else {
        state._volume = 0
    }
}

function _onPlaybackVolumeUp() {
    if (state._volume < 0.99) {
        state._volume += 0.01
    } else {
        state._volume = 1
    }
}

</script>
