<template lang="pug">
    div.my-4
        v-layout(justify-center, wrap).px-2
            v-flex.ma-1(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 18%;' : 'width: 100%;'")
                v-card.pa-2.elevation-5(style="height: 100%")
                    p.font-weight-bold(style="text-align: center") Aliados Clave
                    .ma-3(v-if="!edit", style="font-size: .8em") {{ content.keyPartners }}
                    v-textarea(v-else, style="font-size: .8em", v-model="content.keyPartners", single-line, auto-grow)
            div(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 18%' : 'width: 100%'")
                v-flex.ma-1
                    v-card.pa-2.elevation-5(style="height: 100%")
                        p.font-weight-bold(style="text-align: center") Actividades Clave
                        .ma-3(v-if="!edit", style="font-size: .8em") {{ content.keyActivities }}
                        v-textarea(v-else, style="font-size: .8em", v-model="content.keyActivities", single-line, auto-grow)
                v-flex.ma-1
                    v-card.pa-2.elevation-5(style="height: 100%")
                        p.font-weight-bold(style="text-align: center") Recursos Clave
                        .ma-3(v-if="!edit", style="font-size: .8em") {{ content.keyResources }}
                        v-textarea(v-else, style="font-size: .8em", v-model="content.keyResources", single-line, auto-grow)
            v-flex.ma-1(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 18%' : 'width: 100%'")
                v-card.pa-2.elevation-5(style="height: 100%")
                    p.font-weight-bold(style="text-align: center") Propuesta de Valor
                    .ma-3(v-if="!edit", style="font-size: .8em") {{ content.valuePropositions }}
                    v-textarea(v-else, style="font-size: .8em", v-model="content.valuePropositions", single-line, auto-grow)
            div(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 18%' : 'width: 100%'")
                v-flex.ma-1
                    v-card.pa-2.elevation-5(style="height: 100%")
                        p.font-weight-bold(style="text-align: center") Relación Clientes
                        .ma-3(v-if="!edit", style="font-size: .8em") {{ content.customerRelationships }}
                        v-textarea(v-else, style="font-size: .8em", v-model="content.customerRelationships", single-line, auto-grow)
                v-flex.ma-1
                    v-card.pa-2.elevation-5(style="height: 100%")
                        p.font-weight-bold(style="text-align: center") Canales
                        .ma-3(v-if="!edit", style="font-size: .8em") {{ content.channels }}
                        v-textarea(v-else, style="font-size: .8em", v-model="content.channels", single-line, auto-grow)
            v-flex.ma-1(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 18%' : 'width: 100%'")
                v-card.pa-2.elevation-5(style="height: 100%")
                    p.font-weight-bold(style="text-align: center") Segmento de clientes
                    .ma-3(v-if="!edit", style="font-size: .8em") {{ content.customerSegments }}
                    v-textarea(v-else, style="font-size: .8em", v-model="content.customerSegments", single-line, auto-grow)
        v-layout(justify-center, wrap).px-2
            v-flex.ma-1(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 40%' : 'width: 100%'")
                v-card.pa-2.elevation-5
                    p.font-weight-bold(style="text-align: center") Estructura de Costes
                    .ma-3(v-if="!edit", style="font-size: .8em") {{ content.costStructure }}
                    v-textarea(v-else, style="font-size: .8em", v-model="content.costStructure", single-line, auto-grow)
            v-flex.ma-1(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 40%' : 'width: 100%'")
                v-card.pa-2.elevation-5
                    p.font-weight-bold(style="text-align: center") Flujo de ingresos
                    .ma-3(v-if="!edit", style="font-size: .8em") {{ content.revenueStreams }}
                    v-textarea(v-else, style="font-size: .8em", v-model="content.revenueStreams", single-line, auto-grow)
</template>

<script>

import {getQuery} from '@/tools'

export default {

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

