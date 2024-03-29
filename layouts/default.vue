<template lang="pug">
  v-app(light, style="background-color: #f0f0f0;")
    v-layout.mx-3.mt-2(v-if="$vuetify.breakpoint.mdAndUp", justify-space-between, style="position: fixed; top: 0; width: 100%; z-index: 7")
      v-card(style="border-radius: 32px; background-color: white; padding: 4px;")
        v-tooltip(bottom)
          v-btn(slot="activator", @click.stop="drawer = !drawer", icon)
            v-icon dehaze
          span(v-if="drawer") {{ $t("contract") }}
          span(v-if="!drawer") {{ $t("expand") }}
        v-btn(flat, round)
          img.pointer(src="../assets/images/KanukiLogo.png", height="32px", @click="goToRoot")
          img.pointer.ml-1(@click="goToRoot", src="../assets/images/KanukiLogoLetter.png", height="40px")

      searchbar(:user="user")

    div(v-else)
      v-card(v-if="!$store.state.search.searchBar", style="position: fixed; bottom: 0; z-index: 16; width: 100%")
        v-layout.px-3(justify-space-around)
          v-btn(fab, flat, :color="drawer ? 'blue' : 'black'", @click="drawer = !drawer")
            v-icon dehaze 
          create-subject(v-if="user.id")
          v-btn(fab, flat, @click="goToRoot")
            v-avatar(size="28px")
              img.pointer(src="../assets/images/KanukiLogo.png")
          v-btn(fab, flat, @click="searchBarActivate")
            v-icon search
          v-btn(fab, flat, @click="switchNotifications")
            v-avatar(size="24px")
              img(v-if="user.id", :src="user.photoURL", style="border-radius: 50%;")
              v-icon(v-else, size=20) far fa-user
      searchbar(v-else, :user="user", style="z-index: 16;")
      notifications(v-if="notificationsMobile", :user="user", style="position: fixed; z-index: 15; width: 100%; top: 0; height: 90%").ma-2
    v-navigation-drawer#sidebar(:clipped="true", v-model="drawer", fixed, dark, app)
      div(v-if="$vuetify.breakpoint.mdAndUp", style="margin-bottom: 60px")
      div(v-if="user.id")
        v-btn(flat, large, light, @click="publicationsToggle").ps.ml-0.px-2 {{ $t("publications") }}
        v-list
          v-list-tile-content(v-if="publications")
            card.mb-2(v-for="subject in subjects",
              :key="subject.id", 
              :title="subject.Title", 
              :description="subject.Description", 
              :author="subject.AuthorName",
              :authorid="subject.AuthorId",
              :color="subject.Color",
              :photourl="subject.PhotoURL",
              :date="subject.createdAt",
              :id="subject.id")
        v-btn(flat, large, light, @click="savedToggle").ps.ml-0.px-2 {{ $t("saved") }}
        v-list
          v-list-tile-content(v-if="saved")
            card.mb-2(v-for="subject in subjectsSaved",
              :key="subject.id", 
              :title="subject.Title", 
              :description="subject.Description", 
              :author="subject.AuthorName",
              :authorid="subject.AuthorId",
              :color="subject.Color",
              :photourl="subject.PhotoURL",
              :date="subject.createdAt",
              :id="subject.id")
        v-btn(flat, large, light, @click="contributionsToggle").ps.ml-0.px-2 {{ $t("administrator") }}
        v-list
          v-list-tile-content(v-if="contributions")
            card.mb-2(v-for="subject in subjectsContributions",
              :key="subject.id", 
              :title="subject.Title", 
              :description="subject.Description", 
              :author="subject.AuthorName",
              :authorid="subject.AuthorId",
              :color="subject.Color",
              :photourl="subject.PhotoURL",
              :date="subject.createdAt",
              :id="subject.id")
      div(v-else)
        v-card.pa-2.mt-3(color="blue", flat)
          v-card-title.ps.subheading {{ this.$t("login") }}
          v-btn(light, block, @click="auth()")
            v-avatar(size=32)
              img(src="../assets/images/googleLogo.png")
            div {{ this.$t("loginGoogle") }}
        v-card.pa-2.mt-3(color="green", flat)
          v-card-title.ps.subheading {{ $t("signup") }}
          v-text-field(v-model="usernameInput", flat, solo-inverted, label="Nombre de usuario")
          v-alert(:value="usernameExists", type="error")
            div El nombre de usuario ya existe
          v-btn(light, block, @click="register()")
            v-avatar(size=32)
              img(src="../assets/images/googleLogo.png")
            div {{ this.$t("signupGoogle") }}

    div(v-if="$vuetify.breakpoint.mdAndUp", style="margin-bottom: 48px")
    v-content(:style="notificationsMobile ? '-webkit-filter: blur(5px); -moz-filter: blur(5px); -o-filter: blur(5px); -ms-filter: blur(5px); filter: blur(5px);' : ''")
      v-alert.mt-0(:value="errorAlert", type="error") {{ errorAlert }}
      v-container(fluid)
        v-slide-y-transition(mode="out-in")
          router-view

    v-dialog(v-model="errorSection", width="600px").pa-3
      v-card(color="error").py-4
        v-layout(column, align-center, justify-center)
          .ps.white--text(style="font-size: 3em") Error
          .headline.ps.white--text Ya existe una sección con este nombre
    v-dialog(v-model="errorSubject", width="600px").pa-3
      v-card(color="error").py-4
        v-layout(column, align-center, justify-center)
          .ps.white--text(style="font-size: 3em") Error
          .headline.ps.white--text Ya existe una materia con este nombre
    v-dialog(v-model="errorPage", width="600px").pa-3
      v-card(color="error").py-4
        v-layout(column, align-center, justify-center)
          .ps.white--text(style="font-size: 3em") Error
          .headline.ps.white--text Ya existe una página con este nombre
    create-subject(v-if="drawer && user.id", style="z-index: 15")
    v-dialog(v-model="boom", width="500")
      v-card.pa-3
        v-layout(column, align-center)
          h1.ps(style="text-align: center") ¡Muchas gracias por tu atención!
          v-layout.ma-3(align-center)
            div.mr-2
              div(style="width: .6em; height: 1.2em; transform: rotate(45deg); border-radius: 4px; background-color: #ff6384")
              div.ml-5(style="width: .6em; height: 1.2em; transform: rotate(105deg); border-radius: 4px; background-color: #1e88e5")
              div.ml-2(style="width: .6em; height: 1.2em; transform: rotate(30deg); border-radius: 4px; background-color: #f1d027")
              div.mt-3.ml-4(style="width: .6em; height: 1.2em; transform: rotate(45deg); border-radius: 4px; background-color: #1e88e5")
              div.ml-5(style="width: .6em; height: 1.2em; transform: rotate(105deg); border-radius: 4px; background-color: #ff6384")
              div.ml-2(style="width: .6em; height: 1.2em; transform: rotate(30deg); border-radius: 4px; background-color: #f1d027")
            div
              .ps.font-weight-light(style="text-align: center") ¿Te gustaría participar o informarte de Kanuki?
              .ps.font-weight-bold(style="text-align: center") Escribenos tu mail para contactar
            div.ml-2(style="transform: rotate(180deg)")
              div(style="width: .6em; height: 1.2em; transform: rotate(45deg); border-radius: 4px; background-color: #ff6384")
              div.ml-5(style="width: .6em; height: 1.2em; transform: rotate(105deg); border-radius: 4px; background-color: #1e88e5")
              div.ml-2(style="width: .6em; height: 1.2em; transform: rotate(30deg); border-radius: 4px; background-color: #f1d027")
              div.mt-3.ml-4(style="width: .6em; height: 1.2em; transform: rotate(45deg); border-radius: 4px; background-color: #1e88e5")
              div.ml-5(style="width: .6em; height: 1.2em; transform: rotate(105deg); border-radius: 4px; background-color: #ff6384")
              div.ml-2(style="width: .6em; height: 1.2em; transform: rotate(30deg); border-radius: 4px; background-color: #f1d027")
          v-text-field.my-2(label="Correo Electronico", v-model="emailNewsletter", style="width: 100%")
          v-btn(:color="thanks ? 'green' : 'cardyellow'", large, @click="addMail") {{thanks ? 'Gracias' : '¡Quiero participar!'}}

</template>

<script>
  import Card from '@/components/card.vue'
  import searchbar from '@/components/searchbar.vue'
  import CreateSubject from '@/components/createSubject.vue'
  import notifications from '@/components/notifications.vue'
  import format from '@/format'
  import { getCookie, deleteCookie } from '@/cookie'
  import {getQuery} from '@/tools'
  import db from '@/db'

  export default {

    head () {
      return {
        title: 'Página de inicio',
        meta: [
          { hid: 'og-title', property: 'og:title', content: 'Kanuki' },
          // other meta
        ]
      }
    },

    data () {
      return {
        thanks: false,
        preboom: false,
        emailNewsletter: '',
        search: false,
        drawer: this.$vuetify.breakpoint.mdAndUp,
        usernameInput: "", // Text field de Registro
        notificationsMobile: false,
        usernameExists: false,

        // Toggle para mostrar ocultar los submenus
        publications: true,
        saved: true,
        contributions: true,

      }
    },

    mounted() {

        if (getQuery('boom')) {
          console.log("BOOOOOOM")
          this.$store.dispatch('user/setBoom', getQuery('boom'))
        }

        this.$store.dispatch('user/getBoom')
    },

    computed: {

      boom: {
        get() {
          if (this.preboom) {
            return false
          }

          return this.$store.state.user.boom
        },
        set(value) {
          this.preboom = true
        }
      },

      errorAlert() {
        return this.$store.state.error.errorAlert
      },

      errorSection() {
        return this.$store.state.error.errorSection
      },
      
      errorSubject() {
        return this.$store.state.error.errorSubject
      },

      errorPage() {
        return this.$store.state.error.errorPage
      },

      subjects() {
        const publications = this.$store.state.subject.publications
        return publications
      },

      subjectsSaved() {

        const saved = this.$store.state.subject.saved
        return saved
      },

      subjectsContributions() {

        const contributions = this.$store.state.subject.contributions
        return contributions
      },

      user() {
        return this.$store.state.user.user
      },

      bottomNav() {
        if (this.drawer) return 'sidebar'
        return 'home'
      }

    },

    beforeMount() {
      this.$store.dispatch('user/getCurrentUser')
    },

    methods: {
      addMail() {
        this.thanks = true
        this.$store.dispatch('user/sendEmail', this.emailNewsletter).then(() => {
          setTimeout(() => {this.preboom = true}, 2000)
          
        })
      },

      auth() {
        this.$store.dispatch('user/auth')
      },

      register() {

        this.usernameExists = false

        // Si existe el username, lanza un error, si no lo registra
        db.collection('users').doc(format(this.usernameInput)).get().then(doc => {
          if(doc.exists || this.usernameInput == '404' || this.usernameInput == 'search') {
            this.usernameExists = true
          }
          else {
            this.$store.dispatch('user/register', this.usernameInput)
          }
        })

      },

      searchBarActivate() {
        this.$store.commit('search/searchBarActivate')
      },

      // Permite mostrar ocultar los submenús
      publicationsToggle() {
        this.publications = !this.publications
      },
      savedToggle() {
        this.saved = !this.saved
      },
      contributionsToggle() {
        this.contributions = !this.contributions
      },

      switchNotifications() {
        if (!this.user.id) {
          this.drawer = true
        }
        else {
          this.notificationsMobile = !this.notificationsMobile
        }
      },

      
      // Salta a la materia
      goToSubject(subject) {
        this.$router.push({ path: `/${subject.Author.id}/${subject.id}/` })
      },

      // Se utiliza para las notificaciones, salta directamente a la notificacion
      goToLink(link) {
        if (this.$route.params.page) {
          var id = link.replace(/\//g, ".");
          id = id.substring(1)
          this.$store.dispatch("page/fetchPageParam", id)

        }
        this.$router.push({ path: link })
      },


      // Vuelve al menú home
      goToRoot() {
        this.$router.push({ path:'/' })
      },

      // Al abrir las notificaciones, las lee todas para que no haya más
      readAll() {
        this.$store.dispatch('notification/readAll')
      }

    },

    components: {
      Card,
      CreateSubject,
      searchbar,
      notifications
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/main.scss';

  #sidebar {
    padding: 8px 16px 8px 16px;
    // background-color: $BarBackground;
    background-color: #f0f0f0;
  }
</style>

