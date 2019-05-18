<template lang="pug">
    #form.pa-3
        v-layout(v-if="admin", align-center)
            v-subheader Total encuestados: 
            v-chip(color="blue", dark) {{ maxCount }}
        v-layout.pa-1.mb-3(v-if="admin", justify-space-around, wrap)
            v-card.pa-3.my-2(flat, color="blue")
                .title Media Total
                .headline {{ totalMean }}
            v-card.pa-3.my-2(flat, color="cardred")
                .title Mejor puntuación
                p {{ limits[1] }}
            v-card.pa-3.my-2(flat, color="cardyellow")
                .title Peor puntuación
                p {{ limits[0] }}
        div.mt-4.mx-3(v-for="(item, index) in content.form")
            v-text-field(v-if="edit", v-model="item.title", single-line, label="Titulo")
            v-layout(v-else, justify-space-between)
                .title {{ item.title }}
                v-chip(v-if="admin", color="blue lighten-1", small) <b>Media: {{ Math.floor(getSum(item.options) / item.count * 100)/100 }}</b>
            div(v-if="!edit && admin")
                v-layout(align-center)
                    b.mr-2.headline 1
                    v-progress-linear(color="red darken-1", height="15", :value="item.options[0]*20")
                    v-chip(small, color="gray lighten-1") {{ item.options[0] }}
                v-layout(align-center)
                    b.mr-2.headline 2
                    v-progress-linear(color="green darken-1", height="15", :value="item.options[1]*20")
                    v-chip(small, color="gray lighten-1") {{ item.options[1] }}
                v-layout(align-center)
                    b.mr-2.headline 3
                    v-progress-linear(color="blue darken-1", height="15", :value="item.options[2]*20")
                    v-chip(small, color="gray lighten-1") {{ item.options[2] }}
                v-layout(align-center)
                    b.mr-2.headline 4
                    v-progress-linear(color="orange darken-1", height="15", :value="item.options[3]*20")
                    v-chip(small, color="gray lighten-1") {{ item.options[3] }}
                v-layout(align-center)
                    b.mr-2.headline 5
                    v-progress-linear(color="purple darken-1", height="15", :value="item.options[4]*20")
                    v-chip(small, color="gray lighten-1") {{ item.options[4] }}

            v-radio-group(v-if="!edit && !admin", v-model="options[index]", row).ml-3
                v-radio(label="1", value="1")
                v-radio(label="2", value="2")
                v-radio(label="3", value="3")
                v-radio(label="4", value="4")
                v-radio(label="5", value="5")
        v-layout(v-if="edit", justify-center)
            v-btn(v-if="edit", round, color="green", dark, large, @click="add") Nuevo
</template>

<script>

import {getQuery} from '@/tools'

export default {
    data() {
        return {
            options: [],
            beforeOptions: []
        }
    },

    props: [
        "content",
        "admin"
    ],

    computed: {
        edit() {
            return this.$store.state.page.edit
        }
    },

    methods: {
        add() {
            if (typeof this.content.form == 'undefined') {
                this.content.form = []
            }
            this.content.form.push({
                title: "",
                options: [0,0,0,0,0],
                count: 0
            })
        },

        getSum(list) {
            let sum = 0
            for (let i = 0; i < 5; i++) {
                sum += list[i] * (i + 1)
            }

            return sum
        }
    },

    watch: {
        options: {
            handler: function(value) {
                for (let i = 0; i < value.length; i++) {

                    if (typeof this.beforeOptions[i] == 'undefined') {
                        this.beforeOptions[i] = 0
                        this.content.form[i].count++
                    }

                    value[i] = (typeof value[i] == 'undefined') ? 0 : value[i]

                    if (this.beforeOptions[i] != value[i]) {
                        this.content.form[i].options[this.beforeOptions[i] - 1] -= (this.beforeOptions[i] == 0) ? 0 : 1
                        this.content.form[i].options[value[i] - 1] += 1
                    }
                }

                this.$emit('updatepage')
                this.beforeOptions = [...value]
            },

            deep: true
        }
    },

    computed: {
        totalMean() {
            if (typeof this.content.form == 'undefined') return 0
            let sum = 0
            this.content.form.forEach(el => {
                if(el.count != 0) {
                    sum += this.getSum(el.options) / el.count
                }
            })

            return Math.floor(sum/this.content.form.length * 100)/100
        },

        limits() {
            if (typeof this.content.form == 'undefined') return ["No hay preguntas", "No hay preguntas"]
            let min = 5
            let max = 0
            let titles = ["", ""]

            this.content.form.forEach(el => {
                const value = (this.getSum(el.options) / el.count)

                if (value <= min) {
                    min = value
                    titles[0] = el.title
                }

                else if (value >= max) {
                    max = value
                    titles[1] = el.title
                }
            })

            return titles
        },

        maxCount() {
            if (typeof this.content.form == 'undefined') return 0
            let max = 0
            this.content.form.forEach(el => {
                max = (el.count > max) ? el.count : max
            })

            return max
        }
    },



}
</script>

