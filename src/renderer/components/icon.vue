<script lang="ts">

import Vue from "vue";

export default Vue.component("Icon", {
    data: function () {
        return {}
    },
    props: {
        icon: {
            type: String
        },
        height: {
            type: String,
            default: "24"
        },
        width: {
            type: String,
            default: "24"
        },
        color: {
            type: String,
            default: "#fff"
        }
    },

})

</script>

<template>
    <div style="display: flex">
        <svg v-if="icon === 'logo-icon'"
             :width="width"
             :height="height"
             viewBox="0 0 247 287">
            <g id="Logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group" transform="translate(3.000000, 3.000000)">
                    <path
                        d="M153.5,0 C203.48177,0 244,40.5182301 244,90.5 C244,100.810599 242.275771,110.718484 239.099923,119.951041 C244.206787,133.492004 247,148.169807 247,163.5 C247,231.707167 191.707167,287 123.5,287 C55.2928334,287 0,231.707167 0,163.5 C0,113.699814 29.4761497,70.7841521 71.9335962,51.2478664 C86.5518897,20.9238204 117.582435,0 153.5,0 Z"
                        id="Combined-Shape-Copy-2" stroke="#292D19" stroke-width="6" fill="#AEAB34"></path>
                    <circle id="Oval-Copy-4" stroke="#6F2D00" stroke-width="4" fill="#9D4000" cx="123.5" cy="163.5"
                            r="64.5"></circle>
                </g>
            </g>
        </svg>
        <svg v-if="icon === 'headset'"
             :height="height" viewBox="0 0 24 24" :width="width">
            <path
                :fill="color"
                d="M11.4 1.02C6.62 1.33 3 5.52 3 10.31V17c0 1.66 1.34 3 3 3h1c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H5v-1.71C5 6.45 7.96 3.11 11.79 3 15.76 2.89 19 6.06 19 10v2h-2c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h1c1.66 0 3-1.34 3-3v-7c0-5.17-4.36-9.32-9.6-8.98z"/>
        </svg>
        <svg v-if="icon === 'sound-wave'" :height="height" viewBox="0 0 24 24" :width="width">
            <path
                :fill="color"
                d="M8 18c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1v10c0 .55.45 1 1 1zm4 4c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1s-1 .45-1 1v18c0 .55.45 1 1 1zm-8-8c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 .55.45 1 1 1zm12 4c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1v10c0 .55.45 1 1 1zm3-7v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/>
        </svg>
        <svg v-if="icon === 'keyboard'" :height="height" viewBox="0 0 24 24" :width="width">
            <path
                :fill="color"
                d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm8 7H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1zm1-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/>
        </svg>
        <svg v-if="icon === 'library'" :height="height" viewBox="0 0 24 24" :width="width">
            <path :fill="color"
                  d="M12 11.55c-1.82-1.7-4.12-2.89-6.68-3.35C4.11 7.99 3 8.95 3 10.18v6.24c0 1.68.72 2.56 1.71 2.69 2.5.32 4.77 1.35 6.63 2.87.35.29.92.32 1.27.04 1.87-1.53 4.16-2.58 6.68-2.9.94-.13 1.71-1.06 1.71-2.02v-6.92c0-1.23-1.11-2.19-2.32-1.98-2.56.46-4.86 1.65-6.68 3.35zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
        </svg>
        <svg v-if="icon === 'context-vertical'" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 0 24 24"
             :width="width">
            <path
                :fill="color"
                d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
        <svg v-if="icon === 'cross'" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 0 24 24"
             :width="width">
            <path
                :fill="color"
                d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/>
        </svg>
    </div>
</template>
