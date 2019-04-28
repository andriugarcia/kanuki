<template lang="pug">
    v-layout(justify-space-between, row, wrap)
        #page
            <div id="fb-root"></div>
            <script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_ES/sdk.js#xfbml=1&autoLogAppEvents=1&version=v3.2&appId=131519400980196"></script>
            v-card
                v-container
                    v-layout(row)
                        v-avatar(size="72px")
                            img(:src="userParam.photoURL")
                        div.ml-3
                            h1 {{ userParam.displayName }}
                            p {{ publications.length }} Publicaciones

            v-toolbar.pointer.mt-2(color="blue", @click="twitter = !twitter")
                v-toolbar-title Twitter
            v-card(v-if="twitter", style="height: 60vh; overflow-y: scroll")
                a.twitter-timeline(href="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw", style="height: 90vh")
                script(async, src="https://platform.twitter.com/widgets.js", charset="utf-8")
            
            v-toolbar.pointer.mt-2(color="blue darken-1", dark, @click="twitter = !twitter")
                v-toolbar-title Facebook
            v-card(v-if="true", style="height: 60vh; overflow-y: scroll")
                <div class="fb-page" data-href="https://www.facebook.com/mouo.spain/" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/mouo.spain/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/mouo.spain/">Mouo</a></blockquote></div>
            v-toolbar.mt-2(color="blue", dark, tabs)
                v-text-field.mx-3.mt-3.ps(v-model="userFilter", flat, :label="$t('search')", prepend-inner-icon="search", solo-inverted)
                v-tabs(slot="extension", v-model="tabs", centered, color="transparent", slider-color="white")
                    v-tab(@click="toLeft") Publicaciones
                    v-tab(@click="toRight") Contribuciones
            v-card(v-if="left")
                masonry.pa-3(:cols="{default:5, 1600: 4, 1400:3, 800: 2, 500: 1}", :gutter="10")
                    card.mb-2.mr-2(v-for="publication in publications",
                    :key="publication.id"
                    :title="publication.Title",
                    :description="publication.Description",
                    :author="userParam.displayName",
                    :photourl="userParam.photoURL",
                    :authorid="userParam.id",
                    :date="publication.createdAt"
                    :color="publication.Color"
                    :id="publication.id")
            v-card(v-else)
                v-card-title Contribuciones
                        


</template>

<script>
import Card from '@/components/Card.vue'
import format from '@/format'

export default {
    data () {
        return {
            tabs: null,
            left: true,
            userFilter: "",
            twitter: false,            
            userParam: {}
        }
    },

    components: {
        Card
    },

    methods: {
        toLeft() {
            this.left = true
        },

        toRight() {
            this.left = false
        }

    },

    async asyncData({ store, route }) {
        const userParam = await store.dispatch("user/fetchUserParam", route.params.user)

        return {
            userParam
        }
    },

    computed: {
        user () {
            return this.$store.state.user.user
        },

        publications() {
            if (!this.userParam.publications) return []

            var publications = this.userParam.publications.filter(publication => {
                return !(publication.Read == 'private' && this.user.id != publication.AuthorId)
            })

            
            return publications.filter(save => {
                return format(save.Title).includes(format(this.userFilter)) || format(save.Description).includes(format(this.userFilter))
            })
        }
    }

}
</script>

