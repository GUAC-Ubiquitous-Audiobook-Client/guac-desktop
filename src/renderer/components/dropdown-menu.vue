<template>
    <div v-if="show" :style="containerStyle">

        <div v-for="item in items" v-bind:key="item.label" :style="itemStyle(item.label)" v-on:click="item.action"
             @mouseover="hover = item.label"
             @mouseleave="hover = ''">
            <Icon :icon="item.icon"/>
            <p :style="labelStyle">{{ item.label }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import {Colors, Dimens, Styles} from "../styles";

export interface DropdownItem {
    label: string
    icon: string

    action()
}

export default Vue.component("DropdownMenu", {
    props: {
        items: {
            type: Array as PropType<Array<DropdownItem>>
        },
        show: {
            type: Boolean,
            default: true
        },
        onClickOutside: {
            type: Function
        }
    },
    data() {
        return {
            hover: "",
            containerStyle: {
                width: "max-content",
                position: "absolute",
                backgroundColor: Colors.backgroundContrastSecondary,
                minWidth: "160px",
                borderRadius: Dimens.cornerRadius,
                borderColor: Colors.borderColour,
                boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                border: "1px solid",
                zIndex: 1,
            },
            _itemStyle: {
                padding: "12px 16px",
                textDecoration: "none",
                display: "flex",
                borderRadius: Dimens.cornerRadius,
            },
            labelStyle: {
                ...Styles.bodyText,
                marginLeft: Dimens.sideMarginHalf
            }
        }
    },
    computed: {
        itemStyle: function () {
            const a = {
                ...this.$data._itemStyle,
                backgroundColor: Colors.buttonBackgroundHover
            }
            const b = {
                ...this.$data._itemStyle,
            }
            return (label) => (this.hover === label) ? a : b
        }
    },
    created() {
        document.body.addEventListener('click', this.onClickOutside)
    },
    destroyed() {
        document.body.removeEventListener('click', this.onClickOutside)
    },
})

</script>
