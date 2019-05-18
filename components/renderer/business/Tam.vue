<template lang="pug">
    #Tam.pa-3
        div(v-if="edit")
            h2.ps TAM - Demanda total del producto
            v-layout
                v-text-field.mt-2(label="Cantidad", type="number", v-model="content.tam", style="width: 10px").mr-2
                v-text-field.mt-2(label="Información", v-model="content.tamDescription")
            h2.ps SAM - Basado en tu modelo de negocio
            v-layout
                v-text-field.mt-2(label="Cantidad", type="number", v-model="content.sam", style="width: 10px").mr-2
                v-text-field.mt-2(label="Información", v-model="content.samDescription")
            h2.ps SOM - La porción de mercado que se puede alcanzar
            v-layout
                v-text-field.mt-2(label="Cantidad", type="number", v-model="content.som", style="width: 10px").mr-2
                v-text-field.mt-2(label="Información", v-model="content.somDescription")
        v-layout(v-else, justify-center, wrap)
            v-layout.mb-3(align-center, column)
                div(style="border-top: 100px solid #ff6384; width: 360px; border-right: 60px solid transparent; border-left: 60px solid transparent")
                    h1.ps(style="margin-top: -70px; width: 100%; text-align: center") TAM
                    v-layout(justify-center, style="margin-top: 40px")
                        h2.ps {{ Math.floor((content.tam - content.sam) / content.tam * 1000)/10}}%
                div(style="border-top: 100px solid #f1d027; width: 240px; border-right: 60px solid transparent; border-left: 60px solid transparent")
                    h1.ps(style="margin-top: -70px; width: 100%; text-align: center") SAM
                    v-layout(justify-center, style="margin-top: 40px")
                        h2.ps {{ Math.floor((content.sam - content.som) / content.sam * 1000)/10}}%
                div(style="border-top: 100px solid #4f9cd1; width: 100px; border-right: 60px solid transparent; border-left: 60px solid transparent")
                    v-layout(justify-center, style="margin-top: -100px")
                        h1.ps SOM
            v-layout.ml-3(column, justify-space-around)
                h2.font-weight-light <b>TAM</b> {{ content.tam }} - {{ content.tamDescription }}
                h2.font-weight-light <b>SAM</b> {{ content.sam }} - {{ content.samDescription }}
                h2.font-weight-light <b>SOM</b> {{ content.som }} - {{ content.somDescription }}
</template>

<script>
export default {
    props: ["content"],

    computed: {
        edit() {
            return this.$store.state.page.edit
        }
    }
}
</script>

