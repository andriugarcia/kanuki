<template lang="pug">
    v-layout(justify-center, wrap).pa-3.mt-3
        v-flex.ma-1(:style="($vuetify.breakpoint.mdAndUp) ? 'width: 40%' : 'width: 100%'")
            v-card.pa-2.elevation-5
                .title(style="text-align: center") DEBILIDADES
                .ma-3(v-if="!edit") {{ content.strengths }}
                v-textarea(v-else, v-model="content.strengths", single-line, auto-grow)
        v-flex.ma-1(:style="($vuetify.breakpoint.mdAndUp) ? 'width: 40%' : 'width: 100%'")
            v-card.pa-2.elevation-5
                .title(style="text-align: center") AMENAZAS
                .ma-3(v-if="!edit") {{ content.weaknesses }}
                v-textarea(v-else, v-model="content.weaknesses", single-line, auto-grow)
        v-flex.ma-1(:style="($vuetify.breakpoint.mdAndUp) ? 'width: 40%' : 'width: 100%'")
            v-card.pa-2.elevation-5
                .title(style="text-align: center") FORTALEZAS
                .ma-3(v-if="!edit") {{ content.opportunities }}
                v-textarea(v-else, v-model="content.opportunities", single-line, auto-grow)
        v-flex.ma-1(:style="($vuetify.breakpoint.mdAndUp) ? 'width: 40%' : 'width: 100%'")
            v-card.pa-2.elevation-5
                .title(style="text-align: center") OPORTUNIDADES
                .ma-3(v-if="!edit") {{ content.threats }}
                v-textarea(v-else, v-model="content.threats", single-line, auto-grow)
</template>

<script>

import {getQuery} from '@/tools'

export default {
    data() {
        return {
            edit: false
        }
    },

    props: [
        "content"
    ],

    mounted() {
        if (getQuery('edit') == 'true') {
            this.edit = true
        }
    }
}
</script>

