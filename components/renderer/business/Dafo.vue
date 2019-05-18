<template lang="pug">
    v-tabs(fixed-tabs)
        v-tab(v-for="(n, index) in dafocame", :key="index") {{ n }}
        v-tab-item(v-for="(n, index) in dafocame", :key="index")
            v-layout(v-if="index == 0", justify-center, wrap).pa-3.mt-3
                v-flex.ma-1(:style="($vuetify.breakpoint.mdAndUp) ? 'width: 40%' : 'width: 100%'")
                    v-card.pa-2.elevation-5
                        h3.ps(style="text-align: center") DEBILIDADES
                        .ma-3(v-if="!edit") {{ content.strengths }}
                        v-textarea(v-else, v-model="content.strengths", single-line, auto-grow)
                v-flex.ma-1(:style="($vuetify.breakpoint.mdAndUp) ? 'width: 40%' : 'width: 100%'")
                    v-card.pa-2.elevation-5
                        h3.ps(style="text-align: center") AMENAZAS
                        .ma-3(v-if="!edit") {{ content.weaknesses }}
                        v-textarea(v-else, v-model="content.weaknesses", single-line, auto-grow)
                v-flex.ma-1(:style="($vuetify.breakpoint.mdAndUp) ? 'width: 40%' : 'width: 100%'")
                    v-card.pa-2.elevation-5
                        h3.ps(style="text-align: center") FORTALEZAS
                        .ma-3(v-if="!edit") {{ content.opportunities }}
                        v-textarea(v-else, v-model="content.opportunities", single-line, auto-grow)
                v-flex.ma-1(:style="($vuetify.breakpoint.mdAndUp) ? 'width: 40%' : 'width: 100%'")
                    v-card.pa-2.elevation-5
                        h3.ps(style="text-align: center") OPORTUNIDADES
                        .ma-3(v-if="!edit") {{ content.threats }}
                        v-textarea(v-else, v-model="content.threats", single-line, auto-grow)
            v-layout(v-else, justify-center, wrap).pa-3.mt-3
                v-flex.ma-1(:style="($vuetify.breakpoint.mdAndUp) ? 'width: 40%' : 'width: 100%'")
                    v-card.pa-2.elevation-5
                        h3.ps(style="text-align: center") CORREGIR
                        .ma-3(v-if="!edit") {{ content.correct }}
                        v-textarea(v-else, v-model="content.correct", single-line, auto-grow)
                v-flex.ma-1(:style="($vuetify.breakpoint.mdAndUp) ? 'width: 40%' : 'width: 100%'")
                    v-card.pa-2.elevation-5
                        h3.ps(style="text-align: center") AFRONTAR
                        .ma-3(v-if="!edit") {{ content.face }}
                        v-textarea(v-else, v-model="content.face", single-line, auto-grow)
                v-flex.ma-1(:style="($vuetify.breakpoint.mdAndUp) ? 'width: 40%' : 'width: 100%'")
                    v-card.pa-2.elevation-5
                        h3.ps(style="text-align: center") MANTENER
                        .ma-3(v-if="!edit") {{ content.keep }}
                        v-textarea(v-else, v-model="content.keep", single-line, auto-grow)
                v-flex.ma-1(:style="($vuetify.breakpoint.mdAndUp) ? 'width: 40%' : 'width: 100%'")
                    v-card.pa-2.elevation-5
                        h3.ps(style="text-align: center") EXPLOTAR
                        .ma-3(v-if="!edit") {{ content.exploit }}
                        v-textarea(v-else, v-model="content.exploit", single-line, auto-grow)
</template>

<script>

import {getQuery} from '@/tools'

export default {

    data() {
        return {
            dafocame: ["DAFO", "CAME"]
        }
    },

    props: [
        "content"
    ],

    computed: {
        edit() {
            return this.$store.state.page.edit
        }
    }
}
</script>

