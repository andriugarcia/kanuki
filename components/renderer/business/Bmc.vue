<template lang="pug">
    div.my-4
        v-layout(justify-center, wrap).px-2
            v-flex.ma-1(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 18%;' : 'width: 100%;'")
                v-card.pa-2.elevation-5(style="height: 100%")
                    p.font-weight-bold(style="text-align: center") Aliados Clave
                    p.ma-1(v-if="!edit", style="font-size: .75em; white-space: pre-line; text-align: center;") {{ content.keyPartners }}
                    v-textarea(v-else, style="font-size: .8em", v-model="content.keyPartners", single-line, auto-grow)
            div(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 18%' : 'width: 100%'")
                v-flex.ma-1
                    v-card.pa-2.elevation-5(style="height: 100%")
                        p.font-weight-bold(style="text-align: center") Actividades Clave
                        p.ma-1(v-if="!edit", style="font-size: .75em; white-space: pre-line; text-align: center;") {{ content.keyActivities }}
                        v-textarea(v-else, style="font-size: .8em", v-model="content.keyActivities", single-line, auto-grow)
                v-flex.ma-1
                    v-card.pa-2.elevation-5(style="height: 100%")
                        p.font-weight-bold(style="text-align: center") Recursos Clave
                        p.ma-1(v-if="!edit", style="font-size: .75em; white-space: pre-line; text-align: center;") {{ content.keyResources }}
                        v-textarea(v-else, style="font-size: .8em", v-model="content.keyResources", single-line, auto-grow)
            v-flex.ma-1(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 18%' : 'width: 100%'")
                v-card.pa-2.elevation-5(style="height: 100%")
                    p.font-weight-bold(style="text-align: center") Propuesta de Valor
                    p.ma-1(v-if="!edit", style="font-size: .75em; white-space: pre-line; text-align: center;") {{ content.valuePropositions }}
                    v-textarea(v-else, style="font-size: .8em", v-model="content.valuePropositions", single-line, auto-grow)
            div(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 18%' : 'width: 100%'")
                v-flex.ma-1
                    v-card.pa-2.elevation-5(style="height: 100%")
                        p.font-weight-bold(style="text-align: center") Relación Clientes
                        p.ma-1(v-if="!edit", style="font-size: .75em; white-space: pre-line; text-align: center;") {{ content.customerRelationships }}
                        v-textarea(v-else, style="font-size: .8em", v-model="content.customerRelationships", single-line, auto-grow)
                v-flex.ma-1
                    v-card.pa-2.elevation-5(style="height: 100%")
                        p.font-weight-bold(style="text-align: center") Canales
                        p.ma-1(v-if="!edit", style="font-size: .75em; white-space: pre-line; text-align: center;") {{ content.channels }}
                        v-textarea(v-else, style="font-size: .8em", v-model="content.channels", single-line, auto-grow)
            v-flex.ma-1(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 18%' : 'width: 100%'")
                v-card.pa-2.elevation-5(style="height: 100%")
                    p.font-weight-bold(style="text-align: center") Segmento de clientes
                    p.ma-1(v-if="!edit", style="font-size: .75em; white-space: pre-line; text-align: center;") {{ content.customerSegments }}
                    v-textarea(v-else, style="font-size: .8em", v-model="content.customerSegments", single-line, auto-grow)
        v-layout(justify-center, wrap).px-2
            v-flex.ma-1(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 40%' : 'width: 100%'")
                v-card.pa-2.elevation-5
                    p.font-weight-bold(style="text-align: center") Estructura de Costes
                    p.ma-1(v-if="!edit", style="font-size: .75em; white-space: pre-line; text-align: center;") {{ content.costStructure }}
                    v-textarea(v-else, style="font-size: .8em", v-model="content.costStructure", single-line, auto-grow)
            v-flex.ma-1(:style="($vuetify.breakpoint.lgAndUp) ? 'width: 40%' : 'width: 100%'")
                v-card.pa-2.elevation-5
                    p.font-weight-bold(style="text-align: center") Flujo de ingresos
                    p.ma-1(v-if="!edit", style="font-size: .75em; white-space: pre-line; text-align: center;") {{ content.revenueStreams }}
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

