<template>
    <div :style="containerStyle"
         v-on:click="onClick"
         @mouseover="hover = true"
         @mouseleave="hover = false">
        <img :style="imageStyle" :src="imageSrc"/>
        <div :style="contentContainerStyle">
            <div :style="labelsContainerStyle">
                <p :style="nameStyle">{{ text }}</p>
                <p :style="fileCountStyle">{{ fileCount }} files</p>
                <p :style="playedPercentageStyle">{{ playedPercentage }}</p>
            </div>
        </div>
        <div v-if="hover" :style="overlayStyle"></div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Colors, Dimens, Styles} from "../../styles";
import {LibraryRepositoryProvider} from "../../data/library/provider";
import {Routes} from "../main";
import {LibraryItem} from "../../data/library/library-data";

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
            nameStyle: {
                ...Styles.bodyText,
            },
            fileCountStyle: {
                ...Styles.bodyText,
                color: Colors.textSecondaryColor
            },
            playedPercentageStyle: {
                ...Styles.bodyText,
                color: Colors.textSecondaryColor
            }
        }
    },
    computed: {
        itemData: function (): LibraryItem {
            return LibraryRepositoryProvider.libraryRepository.libraryItems.data
                .filter(item => item.id == this.libraryItemId)[0]
        },
        text: function () {
            return this.itemData.name
        },
        fileCount: function (): string {
            return this.itemData.files.length
        },
        playedPercentage: function (): string {
            const dur = this.itemData.files.reduce((a, b) => a + b.clipLength, 0)
            const played = this.itemData.files.reduce((a, b) => a + b.clipLengthPlayed, 0)
            const perc = ((played / dur || 0) * 100).toFixed(0)
            return `${perc}% played`
        },
    },
    methods: {
        onClick: function (e) {
            LibraryRepositoryProvider.libraryRepository.selectLibraryItem(this.itemData.id)
            this.$router.push(Routes.LISTENING)
        },
    },
    created() {
        LibraryRepositoryProvider.libraryRepository.getThumbnailForFile(this.itemData.files[0].path).then((res) => {
            this.imageSrc = 'data:image/jpeg;base64,' + res.toString('base64');
        })
    }
})

</script>
