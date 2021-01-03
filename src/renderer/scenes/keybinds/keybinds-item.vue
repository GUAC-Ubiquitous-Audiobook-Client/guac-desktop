<template>
    <div :style="containerStyle"
         v-on:click="onClick">
        <div :style="labelsContainerStyle">
            <p :style="actionLabelStyle">Action</p>
            <p :style="shortcutLabelStyle">Shortcut</p>
        </div>
        <div style="display: flex">
            <select :style="actionSelectStyle" v-model="selectedAction" placeholder="select action">
                <option value="" disabled selected>Select action</option>
                <option v-for="action in actionsLabels" :value="action">{{ action }}</option>
            </select>
            <input :style="shortcutInputStyle" v-model="keybind" placeholder="type keys"/>
            <div v-on:click="onDeleteClick" :style="binIconStyle">
                <Icon :icon="Icons.BIN" :color="Colors.dangerRed"/>
            </div>
        </div>
        <div :style="bottomDividerStyle"/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Colors, Dimens, Styles} from "../../styles";
import {KeybindsRepositoryProvider} from "../../data/keybinds/provider";
import {KeybindAction, registerKeybind} from "../../../main/keybinds";
import {ipcRenderer} from "electron";
import {KeybindItem} from "../../data/keybinds/keybinds-data";
import {Icons} from "../../components/icon.vue";

const LABEL_PLAY = "Play / Pause"
const LABEL_FORWARD = "Forward 10s"
const LABEL_BACKWARD = "Backwards 10s"
const LABEL_SPEED_UP = "Increase speed"
const LABEL_SPEED_DOWN = "Decrease speed"
const LABEL_VOLUME_UP = "Increase volume"
const LABEL_VOLUME_DOWN = "Decrease volume"

export default Vue.component("KeybindsItemView", {
    name: "KeybindsItemView",
    props: {
        keybindItemId: {
            type: String,
            required: true
        }
    },
    data: function () {
        return {
            Icons: Icons,
            Colors: Colors,
            containerStyle: {
                cursor: "pointer",
                position: "relative",
                marginLeft: Dimens.sideMargin,
                marginRight: Dimens.sideMargin,
                paddingTop: Dimens.sideMargin
            },
            labelsContainerStyle: {
                display: "flex",
                marginBottom: "8px"
            },
            actionLabelStyle: {
                ...Styles.bodyText,
                width: '30%',
                color: Colors.accentLight,
            },
            shortcutLabelStyle: {
                ...Styles.bodyText,
                color: Colors.accentLight,
            },
            actionSelectStyle: {
                width: "25%",
                marginRight: "5%",
                height: "50px",
                ...Styles.bodyText,
                backgroundColor: Colors.backgroundContent,
                border: `1px solid ${Colors.accentLight}`,
                borderRadius: `${Dimens.cornerRadius}`,
                paddingLeft: Dimens.sideMarginHalf,
                appearance: "none !important",
            },
            bottomDividerStyle: {
                ...Styles.divider,
                marginTop: Dimens.sideMargin
            },
            shortcutInputStyle: {
                ...Styles.bodyText,
                backgroundColor: Colors.backgroundContent,
                border: `1px solid ${Colors.accentLight}`,
                borderRadius: `${Dimens.cornerRadius}`,
                paddingLeft: Dimens.sideMarginHalf,
                paddingRight: Dimens.sideMarginHalf,
                flexGrow: "2",
                marginRight: Dimens.sideMargin
            },
            binIconStyle: {
                alignSelf: "center",
            },
        }
    },
    computed: {
        itemData: function (): KeybindItem {
            return KeybindsRepositoryProvider.keybindsRepository.keybindsData.data
                .filter(item => item.id == this.keybindItemId)[0]
        },
        selectedAction: {
            get: function () {
                return this.itemData.action
            },
            set: function (newValue) {
                console.log(newValue)
            }
        },
        keybind: {
            get: function () {
                return this.itemData.shortcut
            },
            set: function (newValue) {
                const key = (function () {
                    switch (newValue) {
                        case LABEL_PLAY:
                            return KeybindAction.PLAY
                        case LABEL_FORWARD:
                            return KeybindAction.FORWARD
                        case LABEL_BACKWARD:
                            return KeybindAction.BACKWARD
                        case LABEL_SPEED_UP:
                            return KeybindAction.SPEED_UP
                        case LABEL_SPEED_DOWN:
                            return KeybindAction.SPEED_DOWN
                        case LABEL_VOLUME_UP:
                            return KeybindAction.VOLUME_UP
                        case LABEL_VOLUME_DOWN:
                            return KeybindAction.VOLUME_DOWN
                    }
                })()

            }
        },
        actionsLabels: function () {
            return Object.values(KeybindAction).map(function (val): string {
                switch (val) {
                    case KeybindAction.PLAY:
                        return LABEL_PLAY
                    case KeybindAction.FORWARD:
                        return LABEL_FORWARD
                    case KeybindAction.BACKWARD:
                        return LABEL_BACKWARD
                    case KeybindAction.SPEED_UP:
                        return LABEL_SPEED_UP
                    case KeybindAction.SPEED_DOWN:
                        return LABEL_SPEED_DOWN
                    case KeybindAction.VOLUME_UP:
                        return LABEL_VOLUME_UP
                    case KeybindAction.VOLUME_DOWN:
                        return LABEL_VOLUME_DOWN
                }
            })
        }
    },
    methods: {
        onClick: function (e) {
            // registerKeybind(ipcRenderer, this.keybind, this.selectedAction)
        },
        onDeleteClick: function (e) {
            console.log("huh?")
            KeybindsRepositoryProvider.keybindsRepository.deleteKeybind(this.itemData.id)
        }
    },
    created() {
        window.onkeydown = function (event) {
            console.log(event.key)
        };
    }
})

</script>
