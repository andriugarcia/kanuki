<template lang="pug">
  #searchbar
    v-card.mr-5(v-if="$vuetify.breakpoint.mdAndUp", style="height: 56px; border-radius: 40px; background-color: white;")
      v-layout(align-center, style="padding-top: 2px;")
        v-menu(full-width, offset-y)
          v-text-field.ps(slot="activator", v-model="searchText", style="transform: scale(0.875); width: 400px", flat, solo, @keydown.enter.prevent="goToSearch", hide-details, prepend-inner-icon="search", :label="$t('search')", color="primary")
          v-list(v-if="queryResults.length || publications.length || saved.length || contributions.length")
            v-subheader.ps(v-if="publications.length") Publicaciones
            v-list-tile(v-for="publication in publications", :key="publication.id", @click="goToSubject(publication)")
              v-list-tile-title {{ publication.Title }}
              v-list-tile-sub-title {{ publication.AuthorName }}
            v-subheader.ps(v-if="saved.length") Guardados
            v-list-tile(v-for="save in saved", :key="save.id", @click="goToSubject(save)")
              v-list-tile-title {{ save.Title }}
              v-list-tile-sub-title {{ save.AuthorName }}
            v-subheader.ps(v-if="contributions.length") Contribuciones
            v-list-tile(v-for="contribution in contributions", :key="contribution.id", @click="goToSubject(contribution)")
              v-list-tile-title {{ contribution.Title }}
              v-list-tile-sub-title {{ contribution.AuthorName }}
            v-subheader.ps(v-if="queryResults.length") Busqueda Rápida
            //- div.grey--text(v-if="!queryResults.length").pa-3 No se ha encontrado ninguna materia
            v-list-tile(v-for="(query, index) in queryResults", :key="index", @click="goToElasticSubject(query._source)")
              v-list-tile-title {{ query._source.Title }}
              v-list-tile-sub-title {{ query._source.Author.displayName }}
        v-menu(v-if="user.id", v-model="menu", left, open-on-hover)
          v-btn(slot="activator", flat, small, fab)
            v-avatar(size="32px")
              img(v-if="user.id", :src="user.photoURL", style="border-radius: 50%;")
          notifications(v-if="user", :user="user")
    v-card(v-else, style="z-index: 50; position: fixed; bottom: 0px; width: 100%",)
      #handler(style="position: fixed; width: 100%; top: 0; bottom: 0; background-color: transparent", @click="disableSearchBar")
      v-list(v-if="queryResults.length || publications.length || saved.length || contributions.length")
          v-subheader.ps(v-if="publications.length") Publicaciones
          v-list-tile(v-for="(publication, index) in publications", :key="index", @click="goToSubject(publication)")
            v-list-tile-title {{ publication.Title }}
            v-list-tile-sub-title {{ publication.AuthorName }}
          v-subheader.ps(v-if="saved.length") Guardados
          v-list-tile(v-for="save in saved", :key="save.id", @click="goToSubject(save)")
            v-list-tile-title {{ save.Title }}
            v-list-tile-sub-title {{ save.AuthorName }}
          v-subheader.ps(v-if="contributions.length") Contribuciones
          v-list-tile(v-for="contribution in contributions", :key="contribution.id", @click="goToSubject(contribution)")
            v-list-tile-title {{ contribution.Title }}
            v-list-tile-sub-title {{ contribution.AuthorName }}
          v-subheader.ps(v-if="queryResults.length") Busqueda Rápida
          //- div.grey--text(v-if="!queryResults.length").pa-3 No se ha encontrado ninguna materia
          v-list-tile(v-for="query in queryResults", :key="query._source.id", @click="goToElasticSubject(query._source)")
            v-list-tile-title {{ query._source.Title }}
            v-list-tile-sub-title {{ query._source.Author.displayName }}
      v-text-field(v-model="searchText", autofocus, flat, solo, @keydown.enter.prevent="goToSearch", hide-details, prepend-inner-icon="search", :label="$t('search')", color="primary")
      
</template>

<script>
import format from '@/format'
import notifications from '@/components/notifications.vue'

export default {
    components: {
      notifications
    },

    data() {
        return {
            searchText: "",
            menu: false,
            alwaysTrue: true,
            queryResults: [],
            publications: [],
            saved: [],
            contributions: []


        }
    },

    computed: {
      user() {
        return this.$store.state.user.user
      }
    },

    methods: {

        goToSubject(subject) {
            this.$store.commit('search/searchBarDisable')
            this.$router.push({ path: `/${subject.AuthorId}/${subject.id}/` })
        },

        goToElasticSubject(subject) {
            this.$router.push({ path: `/${subject.Author.id}/${subject.id}/` })
        },

        
        goToSearch() {
            if (this.searchText) {
              this.$router.push({ path: `/search/${this.searchText}` })
              this.searchText = ''
            }
        },

        disableSearchBar() {
          console.log("Disable")
          this.$store.commit('search/searchBarDisable')
        }

    },

    watch: {
        searchText(value) {
            if (value == "") {
              this.queryResults = []
              this.publications = []
              this.saved = []
              this.contributions = []
              return
            }

            this.$store.dispatch('search/fetchAutocomplete', value)
            this.queryResults = this.$store.state.search.autocomplete

            this.publications = this.user.publications.filter(publication => {
              return format(publication.Title).includes(format(value)) || format(publication.Description).includes(format(value))
            })

            console.log(this.publications)

            this.saved = this.user.saved.filter(save => {
              return format(save.Title).includes(format(value)) || format(save.Description).includes(format(value))
            })

            this.contributions = this.user.contributions.filter(save => {
              return format(save.Title).includes(format(value)) || format(save.Description).includes(format(value))
            })

        }
    },

}
</script>
