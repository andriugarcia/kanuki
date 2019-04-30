<template lang="pug">
  #Home
    img.front(src="../assets/images/jumbotron.jpg")
    v-card.mt-3
      v-toolbar(flat, color="blue", dark)
        v-toolbar-title.ps Recomendados
      masonry.pa-3(:cols="{default:5, 1600: 4, 1400:3, 800: 2, 500: 1}", :gutter="10")
        card.mb-2.mr-2(v-for="(subject, index) in subjects",
          :key="index"
          :title="subject._source.Title",
          :description="subject._source.Content.Description",
          :author="subject._source.Author.displayName",
          :authorid="subject._source.Author.id",
          :color="subject._source.Content.Color",
          :photourl="subject._source.Author.photoURL",
          :date="subject._source.createdAt",
          :type="subject._source.Type"
          :id="subject._source.id")
</template>

<script>
import Card from '@/components/card.vue'
import NoSSR from 'vue-no-ssr'

export default {
  data() {
    return {
      data: [],
      
    }
  },

  components: {
    Card,
    'no-ssr': NoSSR
  },

  asyncData({ store }) {
      store.dispatch("search/fetchHomePosts", '')
  },

  computed: {
    user() {
      return this.$store.state.user.user
    },

  
    subjects() {
      // Pasar a vuex
      // console.log("HOME", this.$store.state.search.homePosts)
      return this.$store.state.search.homePosts
                        
    },

  }
}
</script>


<style lang="scss" scoped>
  .front {
    width: 100%;
  }
</style>
