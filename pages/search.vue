<template lang="pug">
    #search
        v-card
            v-toolbar(color="blue")
                v-toolbar-title {{ subjects.length }} Resultados de {{ $route.params.search }}
                v-spacer
                v-menu(offset-y, left, :close-on-content-click="false")
                    v-btn(flat, slot="activator") Filtrar
                    v-list
                        v-subheader Filtrar
                        v-form
                            v-checkbox(v-model="filter", label="Título", value="Title^4")
                            v-checkbox(v-model="filter", label="Descripción", value="Description")
                            v-checkbox(v-model="filter", label="Tags", value="Tags^2")
                        v-subheader Ordenar
                        v-form
                            v-radio-group(v-model="order")
                                v-radio(label="Relevancia", value="Visits")

                        
            .pa-4
                // v-switch(label="Mostrar solo resultados en tu idioma")
                masonry(:cols="{default:5, 1600: 4, 1400:3, 800: 2, 500: 1}", :gutter="10")
                    card.mb-2.mr-2(v-for="subject in subjects", :key="subject._source.id"
                        :title="subject._source.Title",
                        :description="subject._source.Content.Description",
                        :author="subject._source.Author.displayName",
                        :authorid="subject._source.Author.id",
                        :color="subject._source.Content.Color",
                        :photourl="subject._source.Author.photoURL",
                        :date="subject._source.createdAt",
                        :id="subject._source.id")
                v-btn(outline, block, color="success", @click="more") Ver más
</template>

<script>
import Card from '@/components/card.vue'

export default {
  data() {
    return {
      data: [],
      filter: ["Title^4", "Description", "Tags^2"],
      order: "Visits",
      size: 20
    }
  },

  methods: {
      more() {
        this.size += 20

        this.$store.dispatch('search/fetchSearch', {
            value: this.$route.params.search,
            filter: this.filter,
            size: this.size
        })
      }
  },

  components: {
    Card
  },

  watch: {
      filter() {
        this.$store.dispatch('search/fetchSearch', {
          value: this.$route.params.search,
          filter: this.filter,
          size: this.size
         })
      },

      order() {
        this.$store.dispatch('search/fetchSearch', {
          value: this.$route.params.search,
          filter: this.filter,
          size: this.size
        })
      }
  },

  asyncData({ store, params }) {
      return store.dispatch('search/fetchSearch', {
          value: params.search,
          filter: ["Title^4", "Description", "Tags^2", "id^4"],
          size: 4
      })
  },

  computed: {
    subjects() {
        return this.$store.state.search.search
    },


  }

}
</script>
