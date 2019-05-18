<template lang="pug">
  #linechart.pa-3
    barchart(v-if="this.content.Labels", :chartData="{labels: this.content.Labels, datasets: [{label: this.content.Label, backgroundColor: this.content.Color, borderColor: this.content.Color, data: this.content.Data}]}")
    div(v-if="edit")
      v-subheader Configuración de la gráfica
      v-text-field.mx-3(v-model="content.Label", label="Título")
      v-text-field.mx-3(v-model="content.Color", label="Color")
      v-data-table(:headers="headers", :items="elements", hide-actions)
        template(v-slot:items="props")
          td 
            v-text-field(v-model="props.item.label", label="Nombre de la columna", single-line)
          td 
            v-text-field(v-model="props.item.value", type="number", label="Valor de la columna", single-line)
          td.text-xs-right
            v-btn(icon, flat, @click="remove(props.item)")
              v-icon close
      v-layout(justify-center)
        v-btn(round, color="blue", large, dark, @click="add").ma-3 Nuevo

</template>

<script>
import barchart from '@/components/barchart.vue'
import {getQuery} from '@/tools'

export default {

  props: ["content"],

  data() {
    return {
      // rerender: 1,
      headers: [
        {
          text: 'Nombres',
          value: 'Labels',
          sortable: false
        },
        {
          text: 'Valores',
          value: 'Data',
          sortable: false
        }
      ],

      elements: []
    }
  },

  watch: {
    'content.Label'() {
      // this.rerender++
    },

    'content.Color'() {
      // this.rerender++
    },

    elements: {
      handler(after, before) {
        this.content.Labels = []
        this.content.Data = []

        after.forEach(el => {
          this.content.Labels.push(el.label)
          this.content.Data.push(el.value)
        })

        // this.rerender++
      },

      deep: true
    }
  },

  computed: {
      edit() {
          return this.$store.state.page.edit
      }
  },

  beforeMount() {
    console.log("TEST")
    if (typeof this.content.Labels == "undefined") {
      this.content.Labels = ["Test 1"]
      this.content.Data = [12]
      return
    }

    for(let i = 0; i < this.content.Data.length; i++) {
      this.elements.push({
        label: this.content.Labels[i],
        value: this.content.Data[i]
      })
    }
  },

  methods: {
    add() {
      this.elements.push({
        label: "",
        value: 0,
      })
    },

    remove(item) {
      const index = this.elements.findIndex((el) => {
        return el.label == item.label && el.value == item.value
      })

      this.elements.splice(index, 1)
    }
  },

  components: {
    barchart
  },

}

</script>
