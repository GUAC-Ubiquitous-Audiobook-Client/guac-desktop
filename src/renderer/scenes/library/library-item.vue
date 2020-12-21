<script lang="ts">
import Vue from "vue";
import {LibraryRepository, LibraryItem} from "../../data/library-repository";
import {Colors, Dimens} from "../../styles";
import {DropdownMenu, DropdownItem} from "../../components/dropdown-menu"

export default Vue.component("LibraryItemView", {
    name: "LibraryItemView",
    props: {
        libraryItemId: {
            type: String,
            required: true
        }
    },
    data: function () {
        return {
            containerStyle: {
                cursor: "pointer",
                position: "relative",
                borderRadius: Dimens.cornerRadius,
                backgroundColor: Colors.backgroundContent,
                border: `1px solid ${Colors.backgroundContentBorder}`
            },
            overlayStyle: {
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                backgroundColor: Colors.buttonBackgroundHover,
                borderRadius: Dimens.cornerRadius
            },
            imageSrc: "",
            imageStyle: {
                width: '100%',
                objectFit: "contain",
                objectPosition: "top",
                borderRadius: Dimens.cornerRadius
            },
            hover: false,
            contentContainerStyle: {
                display: "flex",
                margin: Dimens.sideMarginHalf
            },
            labelsContainerStyle: {},
            nameStyle: {},
            fileCountStyle: {
                color: Colors.textSecondaryColor
            },
            playedPercentageStyle: {
                color: Colors.textSecondaryColor
            },
            contextMenuIconStyle: {
                marginLeft: "auto",
                cursor: "pointer"
            },
            showDropdown: true,
            dropdownItems: [
                {
                    label: "delete",
                    icon: "cross",
                    action() {
                        console.log("clicked")
                    }
                }
            ] as Array<DropdownItem>
        }
    },
    computed: {
        itemData: function (): LibraryItem {
            return LibraryRepository.instance.data.libraryItems.filter(item => item.id == this.libraryItemId)[0]
        },
        text: function () {
            return this.itemData.name
        },
        fileCount: function (): string {
            return this.itemData.files.length
        },
        playedPercentage: function (): string {
            return "20"
        },
    },
    methods: {
        onClick: function (e) {
            console.log("hey")
        },
        onContextMenuClick: function (e) {
            console.log("click")
            e.stopPropagation()
            this.$data.showDropdown = !this.$data.showDropdown
        }
    },
    created() {
        LibraryRepository.instance.getThumbnailForFile(this.itemData.files[0].path).then((res) => {
            this.imageSrc = 'data:image/jpeg;base64,' + res.toString('base64');
        })
    }
})

</script>

<template>
    <div :style="containerStyle"
         v-on:click="onClick"
         @mouseover="hover = true"
         @mouseleave="hover = false">
        <img v-bind:style="imageStyle" :src="imageSrc"/>
        <div :style="contentContainerStyle">
            <div :style="labelsContainerStyle">
                <p :style="nameStyle">{{ text }}</p>
                <p :style="fileCountStyle">{{ fileCount }} files</p>
                <p :style="playedPercentageStyle">{{ playedPercentage }}% played</p>
            </div>

            <!--            <div :style="contextMenuIconStyle">-->
            <!--                <div style="background-color: red" v-on:click="onContextMenuClick">-->

            <!--                    <Icon icon="context-vertical"/>-->
            <!--                </div>-->
            <!--                <DropdownMenu v-if="showDropdown" :items="dropdownItems"/>-->
            <!--            </div>-->

        </div>
        <div v-if="hover" :style="overlayStyle"></div>
    </div>
</template>
