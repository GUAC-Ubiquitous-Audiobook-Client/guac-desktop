<template>
    <div :style="containerStyle" v-on:scroll="handleScroll" ref="container">
        <div :style="contentContainerStyle">
            <Icon :icon="icon" size="32px"/>
            <p :style="labelStyle">{{ label }}</p>
            <div v-if="false" :style="upContainerStyle" @mouseover="topHover = true" @mouseleave="topHover = false"
                 v-on:click="onTopClick">
                <Icon :style="iconStyle" :icon="Icons.CHEVRON_TOP"/>
            </div>
            <div v-if="false" :style="downContainerStyle" @mouseover="bottomHover = true"
                 @mouseleave="bottomHover = false"
                 v-on:click="onBottomClick">
                <Icon :style="iconStyle" :icon="Icons.CHEVRON_BOTTOM"/>
            </div>
        </div>
        <div :style="scrollContainerStyle"/>
    </div>
</template>

<script lang="ts">

import Vue from "vue";
import {Colors, Dimens, Styles} from "../styles";
import {Icons} from "./icon.vue";

const scrollSize = 10000000
export default Vue.component("ButtonScroller", {
    data: function () {
        return {
            scrollPosition: scrollSize / 2,
            Icons: Icons,
            topHover: false,
            bottomHover: false,
            containerStyle: {
                display: "flex",
                border: `1px solid ${Colors.accent}`,
                borderRadius: `${Dimens.cornerRadius}`,
                width: "100px",
                cursor: "row-resize",
                padding: "4px",
                position: "relative",
                overflowY: "scroll",
                overflowX: "hidden",
            },
            contentContainerStyle: {
                alignItems: "center",
                display: "flex",
                position: "fixed",
                width: "inherit"
            },
            scrollContainerStyle: {
                width: "100%",
                height: `${scrollSize}px`,
                position: "absolute",
            },
            labelStyle: {
                ...Styles.bodyText,
                marginLeft: "8px",
                marginRight: "8px",
                width: "100%",
                textAlign: "center"
            },
            _upContainerStyle: {
                width: "100%",
                height: "50%",
                borderRadius: `${Dimens.cornerRadius}`,
                position: "absolute",
                backgroundImage: `linear-gradient(180deg, ${Colors.backgroundContent}, transparent)`,
                opacity: "0",
                left: 0,
                right: 0,
                top: 0
            },
            _downContainerStyle: {
                width: "100%",
                height: "50%",
                borderRadius: `${Dimens.cornerRadius}`,
                backgroundImage: `linear-gradient(0deg, ${Colors.backgroundContent}, transparent)`,
                position: "absolute",
                opacity: "0",
                left: 0,
                right: 0,
                bottom: 0,
            },
            iconStyle: {
                justifyContent: "center"
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
        scrollUpAction: {
            type: Function
        },
        scrollDownAction: {
            type: Function
        }
    },
    computed: {
        upContainerStyle: function () {
            if (this.topHover) {
                return {
                    ...this.$data._upContainerStyle,
                    opacity: "1"
                }
            } else {
                return {
                    ...this.$data._upContainerStyle,
                }
            }
        },
        downContainerStyle: function () {
            if (this.bottomHover) {
                return {
                    ...this.$data._downContainerStyle,
                    opacity: "1"
                }
            } else {
                return {
                    ...this.$data._downContainerStyle,
                }
            }
        },
    },
    methods: {
        onTopClick: function () {

        },
        onBottomClick: function () {

        },
        handleScroll: function () {
            if (this.scrollPosition < this.$refs.container.scrollTop) {
                // scroll down
                this.scrollDownAction()
            } else if (this.scrollPosition > this.$refs.container.scrollTop) {
                // scroll up
                this.scrollUpAction()
            }
            this.scrollPosition = this.$refs.container.scrollTop
        },
    },
    mounted() {
        this.$refs.container.scrollTop = scrollSize / 2;
    }
})

</script>
