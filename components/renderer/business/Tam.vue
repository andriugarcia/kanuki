<template lang="pug">
    #Tam.pa-3
        div(v-if="edit")
            h2.ps TAM - Demanda total del producto
            v-text-field(label="TAM", type="number", v-model="content.tam")
            h2.ps SAM - Basado en tu modelo de negocio
            v-text-field(label="SAM", type="number", v-model="content.sam")
            h2.ps SOM - La porción de mercado que se puede alcanzar
            v-text-field(label="SOM", type="number", v-model="content.som")
        v-layout(v-else, justify-space-around)
            v-layout(align-center, column)
                div(style="border-top: 100px solid #ff6384; width: 360px; border-right: 60px solid transparent; border-left: 60px solid transparent")
                    h1.ps(style="margin-top: -70px; width: 100%; text-align: center") TAM
                    v-layout(justify-center, style="margin-top: 40px")
                        h2.ps 80%
                div(style="border-top: 100px solid #f1d027; width: 240px; border-right: 60px solid transparent; border-left: 60px solid transparent")
                    h1.ps(style="margin-top: -70px; width: 100%; text-align: center") SAM
                    v-layout(justify-center, style="margin-top: 40px")
                        h2.ps 80%
                div(style="border-top: 100px solid #4f9cd1; width: 100px; border-right: 60px solid transparent; border-left: 60px solid transparent")
                    v-layout(justify-center, style="margin-top: -100px")
                        h1.ps SOM
            v-layout(column, justify-space-around)
                h2 1200 - Usuarios interesados
                h2 1200 - Usuarios interesados
                h2 1200 - Usuarios interesados
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

