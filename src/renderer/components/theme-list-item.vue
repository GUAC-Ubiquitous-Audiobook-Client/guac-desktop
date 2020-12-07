<script lang="ts">

import Vue from "vue";
import { Colors, Dimens, Styles } from "../styles";

export default Vue.component("ThemeListItem", {
    data: function () {
        return {
            hover: false,
            _containerStyle: {
                display: "flex",
                paddingLeft: Dimens.sideMargin,
                paddingRight: Dimens.sideMargin,
                paddingTop: Dimens.sideMarginHalf,
                paddingBottom: Dimens.sideMarginHalf,
                borderRadius: `0px ${Dimens.cornerRadius} ${Dimens.cornerRadius} 0px`,
                cursor: "pointer"
            },
            labelStyle: {
                ...Styles.buttonText,
                marginLeft: Dimens.sideMargin,
            }
        }
    },
    props: {
        label: {
            type: String
        },
        icon: {
            type: String
        },
        click: {
            type: Function
        },
        selected: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        containerStyle: function () {
            if (this.selected)
                return {
                    ...this.$data._containerStyle,
                    backgroundColor: Colors.buttonBackgroundSelected,
                }
            if (this.hover)
                return {
                    ...this.$data._containerStyle,
                    backgroundColor: Colors.buttonBackgroundHover,
                    opacity: "0.85"
                }
            else
                return {
                    ...this.$data._containerStyle,
                    backgroundColor: "transparent",
                    opacity: "0.85"
                }
        }
    },
})

</script>

<template>
    <div :style="containerStyle"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    v-on:click="click">
        <Icon :icon="icon"/>
        <p :style="labelStyle">{{ label }}</p>
    </div>
</template>
