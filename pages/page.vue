<template lang="pug">
    v-layout(v-if="page", justify-space-between, row, wrap)
        #page
            v-card.mb-3(v-if="subject.id", style="width: 100%")
                //- Encabezado del subject
                v-toolbar.inline(:color="subject.Content.Color", dark, flat).mb-2
                    v-toolbar-title.ps {{ subject.Title }}
                    v-spacer
                    share-button
                    download-button(v-if="subject.id != 'notFound'", :subject="subject", :user="user", :admin="admin")
                    subject-settings(v-if="admin", :subject="subject", :admin="admin")
                    change-read(v-if="subject.id && admin", :subject="subject", :user="user.id")
                    p(slot="extension") {{ subject.Content.Description }}
            v-card(v-if="page && page.Type == 'subject'")
                v-toolbar(flat)
                    v-btn(v-if="page.Author.id", flat, light, small, @click="goToAuthor")
                        v-avatar.mr-1(size="28")
                            img(:src="page.Author.photoURL")
                        div {{ page.Author.displayName }}
                    v-spacer
                    v-btn(v-if="!dragging", flat, icon, @click="dragging = true")
                        v-icon swap_vert
                    v-btn(v-else, color="blue lighten-1", icon, @click="changeOrder")
                        v-icon swap_vert
                    v-btn(v-if="deleteElementList.length != 0", icon, flat, @click="deleteElements")
                        v-icon delete
                    create-page
                elements(:elements="page.Content.Elements", :dragging="dragging", :admin="admin")

            v-card(v-else, transition="slide-x-transition", v-touch="{ left: () => goForward(), right: () => goBack()}", :key="rerender")
                v-toolbar(:color="color", flat, light, extended)
                    v-btn(outline, fab, small, :disabled="leftDisabled", @click="goBack")
                        v-icon arrow_back
                    v-spacer
                    v-menu(v-model="pagemenu", :close-on-content-click="false", :nudge-width="70", offset-y)
                        v-btn(slot="activator", flat) {{ $t("page") }}{{ this.pageIndex + 1 }}
                        v-card
                            v-list
                                v-list-tile(v-for="(pag, index) in father.Content.Elements", :key="index", @click.native="goToPage(pag.id)")
                                    v-list-tile-content
                                        v-list-tile-title {{pag.Title}}
                    v-spacer
                    v-btn(outline, fab, small, :disabled="rightDisabled", @click="goForward")
                        v-icon arrow_forward
                    v-btn(icon, slot="extension", @click="goToFather")
                        v-icon arrow_back
                    v-toolbar-title.ml-2(v-if="!edit", slot="extension").ps {{ page.Title }}
                    v-text-field(v-else, slot="extension", v-model="page.Title", hide-details, color="black").ps
                    v-spacer(slot="extension")
                    share-button(slot="extension")
                    change-read(v-if="page.id && admin", :subject="page", :user="user.id", slot="extension")

                    v-tooltip(v-if="subject.id && admin", slot="extension", bottom)
                        v-dialog(slot="activator", width="500", v-model="deleteDialog")
                            v-btn(icon, slot="activator")
                                v-icon close
                            v-card
                                v-toolbar(color="error", dark)
                                    v-toolbar-title {{ $t("deletePage") }}
                                v-card-text {{ $t("deleteText") }}{{ page.Title }}?
                                v-card-actions
                                    v-btn(color="primary", @click="deleteDialog = false") {{ $t("cancel") }}
                                    v-btn(color="error", @click="deletePage") {{ $t("delete") }}
                        span {{ $t('deleteSubject') }}

                v-toolbar(flat)
                    v-btn(v-if="page.Author.id", flat, light, small, @click="goToAuthor")
                        v-avatar.mr-1(size="28")
                            img(:src="page.Author.photoURL")
                        div {{ page.Author.displayName }}
                    div {{ father.id }} / {{ page.id }}
                    v-spacer
                    //- v-btn(v-if="page.Type == 'section' && deleteElementList.length != 0", @click="deleteElements", icon, flat)
                        v-icon delete
                    create-page(v-if="page.Type == 'section'")
                    v-fab-transition(v-if="!edit")
                        v-btn(v-show="page.id && admin", @click="goToEdit", color="green darken-1", dark, small, absolute, bottom, right, fab)
                            v-icon edit
                    v-fab-transition(v-else)
                        v-btn(v-show="page.id && admin", @click="save", color="gray darken-1", dark, small, absolute, bottom, right, fab)
                            v-icon save
                section-renderer(v-if="page.Type == 'section'", :content="page.Content", :admin="admin")
                text-renderer(v-if="page.Type == 'text/text'", :content="page.Content")
                text-format-renderer(v-if="page.Type == 'text/textformat'", :content="page.Content")
                media-image-renderer(v-else-if="page.Type == 'media/image'", :content="page.Content")
                media-video-renderer(v-else-if="page.Type == 'media/video'", :content="page.Content")
                media-youtube-renderer(v-else-if="page.Type == 'media/youtube'", :content="page.Content")
                media-audio-renderer(v-else-if="page.Type == 'media/audio'", :content="page.Content")
                media-pdf-renderer(v-else-if="page.Type == 'media/pdf'", :content="page.Content")
                //- media-collage-renderer(v-else-if="page.Type == 'media/collage'", :content="page.Content")
                documents-doc-renderer(v-else-if="page.Type == 'documents/doc'", :content="page.Content")
                //- exercise-card-renderer(v-else-if="page.Type == 'exercise/card'", :content="page.Content")
                exercise-test-renderer(v-else-if="page.Type == 'exercise/test'", :content="page.Content")
                //- exercise-write-renderer(v-else-if="page.Type == 'exercise/write'", :content="page.Content")
                //- tech-code-renderer(v-else-if="page.Type == 'tech/code'", :content="page.Content")
                //- tech-math-renderer(v-else-if="page.Type == 'tech/math'", :content="page.Content")
                //- tech-linechart-renderer(v-else-if="page.Type == 'tech/linechart'", :content="page.Content")
                //- business-dafo-renderer(v-else-if="page.Type == 'business/dafo'", :content="page.Content")
                //- business-bmc-renderer(v-else-if="page.Type == 'business/bmc'", :content="page.Content")
                v-toolbar(color="white",flat, light)
                    v-btn(outline, fab, small, :disabled="leftDisabled", @click="goBack")
                        v-icon arrow_back
                    v-spacer
                    v-menu(v-model="pagemenu2", :close-on-content-click="false", :nudge-width="70", offset-y)
                        v-btn(slot="activator", flat) {{ $t("page") }}{{ this.pageIndex + 1 }}
                        v-card
                            v-list
                                v-list-tile(v-for="(pag, index) in father.Content.Elements", :key="index", @click.native="goToPage(pag.id)")
                                    v-list-tile-content
                                        v-list-tile-title.ps {{pag.Title}}
                    v-spacer
                    v-btn(outline, fab, small, :disabled="rightDisabled", @click="goForward")
                        v-icon arrow_forward

            v-card(v-if="page.Comments").my-3
                v-toolbar.pointer(:color="subject.Content.Color", @click="comments = !comments", dark, dense, flat)
                    v-toolbar-title.body-2.ps {{page.Comments.length}} {{ $t("comments") }}
                    v-spacer
                    v-icon(v-bind:class="[{ 'rotateIcon': comments }, 'notRotateIcon']") arrow_right
                div(v-if="comments")
                    v-list(style="max-height: 80vh; overflow-y: scroll")
                        div(v-if="!page.Comments.length").pa-3.ps Todavia no hay comentarios en esta página
                        v-layout.pa-2(v-for="(comment, index) in page.Comments", :key="index")
                            v-btn(flat, fab, @click="goToUser(comment.Author.id)")
                                v-avatar(:size=40)
                                    img(:src="comment.Author.photoURL")
                            div
                                v-layout(justify-space-between)
                                    v-btn.ml-0.px-1.text-capitalize(flat, small, @click="goToUser(comment.Author.id)").ps.font-weight-bold {{ comment.Author.displayName }}
                                    v-btn.text-capitalize(flat, small) 
                                        v-icon reply
                                        div Responder
                                .mx-1.black--text {{ comment.Comment }}
                        v-divider
                    v-card.pa-4(v-if="user.id", flat, color="lit")
                        v-layout(row, no-wrap, justify-space-between)
                            v-chip
                                v-avatar(size="32px")
                                    img(:src="user.photoURL")
                                div {{ user.displayName }}
                            v-btn(flat, icon, @click="sendComment")
                                v-icon send
                        v-textarea.ml-2(v-model="newComment", :loading="loadingComment", :disabled="loadingComment", label="Comentario")
        rightbar
</template>


<script>
import db from '@/db'
import CreatePage from '@/components/createPage.vue'
import ShareButton from '@/components/shareButton.vue'
import SubjectSettings from '@/components/subjectSettings.vue'
import ChangeRead from '@/components/changeRead.vue'
import DownloadButton from '@/components/downloadButton.vue'

import {getQuery, getPathArray, getPathFather} from '@/tools'
import shareButton from '@/components/shareButton.vue'
import format from '@/format'
import Rightbar from '@/components/Rightbar.vue'
import SectionRenderer from '@/components/renderer/section/section.vue'
import TextRenderer from '@/components/renderer/text/Text.vue'
import TextFormatRenderer from '@/components/renderer/text/TextFormat.vue'
import MediaImageRenderer from '@/components/renderer/media/Image.vue'
import MediaVideoRenderer from '@/components/renderer/media/Video.vue'
import MediaYoutubeRenderer from '@/components/renderer/media/Youtube.vue'
import MediaAudioRenderer from '@/components/renderer/media/Audio.vue'
import MediaPdfRenderer from '@/components/renderer/media/PDF.vue'
import MediaCollageRenderer from '@/components/renderer/media/Collage.vue'
import DocumentsDocRenderer from '@/components/renderer/documents/Doc.vue'
import DocumentsSpreadsheetRenderer from '@/components/renderer/documents/Spreadsheet.vue'
import DocumentsPresentationRenderer from '@/components/renderer/documents/Presentation.vue'
import ExerciseCardRenderer from '@/components/renderer/exercise/Card.vue'
import ExerciseTestRenderer from '@/components/renderer/exercise/Test.vue'
import ExerciseWriteRenderer from '@/components/renderer/exercise/Write.vue'
// import TechCodeRenderer from '@/components/renderer/tech/Code.vue'
import TechMathRenderer from '@/components/renderer/tech/Math.vue'
import TechLinechartRenderer from '@/components/renderer/tech/LineChart.vue'
import BusinessDafoRenderer from '@/components/renderer/business/Dafo.vue'
import BusinessBmcRenderer from '@/components/renderer/business/Bmc.vue'

import elements from '@/components/elements.vue'

export default {
    components: {
        CreatePage,
        ShareButton,
        SubjectSettings,
        ChangeRead,
        DownloadButton,
        elements,
        Rightbar,
        shareButton,
        SectionRenderer,
        TextRenderer,
        TextFormatRenderer,
        MediaImageRenderer,
        MediaPdfRenderer,
        MediaVideoRenderer,
        MediaYoutubeRenderer,
        MediaAudioRenderer,
        MediaCollageRenderer,
        DocumentsDocRenderer,
        DocumentsSpreadsheetRenderer,
        DocumentsPresentationRenderer,
        ExerciseCardRenderer,
        ExerciseTestRenderer,
        ExerciseWriteRenderer,
        // TechCodeRenderer,
        TechMathRenderer,
        TechLinechartRenderer,
        BusinessDafoRenderer,
        BusinessBmcRenderer,
    },

    data() {
        return {
            pageIndex: 0,
            subject: {},
            father: {},
            page: {},
            admin: false,
            edit: false,
            comments: true,
            dragging: false,
            deleteDialog: false,
            backId: "",
            nextId: "",
            leftDisabled: true,
            rightDisabled: true,
            menu: false,
            pagemenu: false,
            pagemenu2: false,
            rerender: 0,
            newComment: '',
            loadingComment: false,
        }
    },

    head() {
        return {
            title: `${this.page.Title}`,
            meta: [
                { hid: 'description', name: 'description', content: this.subject.Description },
                { name: 'keywords', content: this.subject.Content.Tags.join(', ') },
                // { 'property': 'og:image', 'itemprop':"image", 'content':  this.clothing.Image },
                // { 'property': 'og:image:width', 'content': "516" },
                // { 'property': 'og:image:height', 'content': "640" },
                { 'property': 'og:title', 'content':  `${this.page.Title} - Kanuki` },
                { 'property': 'og:url', 'content': `https://kanuki.io/${this.$route.params.user}/${this.$route.params.pathMatch}`},
                { 'property': 'og:site_name', 'content':  'Kanuki' },
                // { 'property': 'og:updated_time', 'content':  '2018-08-23T16:13:30+02:00' },
            ],
            script: [
                { type: 'application/ld+json', src: JSON.stringify(this.structuredData) }
            ]
        }
    },

    async asyncData({store, params}) {
        let path = `${params.user}/${params.pathMatch}`

        if (path[path.length - 1] == '/') {
            path = path.substr(0, path.length - 1)
        }
        
        let data = await store.dispatch('page/getPage', path)


        var index
        var leftDisabled
        var rightDisabled
        var backId
        var nextId

        if (data.page.Type != 'subject') {
            
            var pages = data.father.Content.Elements.filter(pag => {
                return pag.Read == 'public'
            })

            index = pages.findIndex(x => x.id == data.page.id)
    
            leftDisabled = (index <= 0) ? true : false
            rightDisabled = (index + 1 >= pages.length) ? true : false

    
            if (!leftDisabled) {
                backId = pages[index - 1].id
            }
    
            if (!rightDisabled) {
                nextId = pages[index + 1].id
            }
        }
        

        return {
            subject: data.subject, 
            father: data.father,
            page: data.page,
            index,
            leftDisabled,
            rightDisabled,
            backId,
            nextId

        }

    },

    mounted() {
        if (getQuery('edit') == 'true') {
            this.edit = true
        }
    },

    computed: {
        
        user() {
            let user = this.$store.state.user.user
            if (user.id) {
                const self = this
                this.$store.dispatch('page/setAdmin', {
                    subject: this.subject, page: this.page}).then(function (admin) {
                        self.admin = admin
                    })
                
            }

            else { this.admin = false }

            return user
        },

        color() {
            var type = this.page.Type
            if (type.slice(0, type.indexOf("/")) == 'text' || type == 'documents/presentation') {
                return 'yellow darken-1'
            }

            else if (type.slice(0, type.indexOf("/")) == 'media') {
                return 'red darken-1'
            }

            else if (type.slice(0, type.indexOf("/")) == 'exercise' || type == 'documents/spreadsheet') {
                return 'green darken-1'
            }

            else if (type.slice(0, type.indexOf("/")) == 'tech' || type.slice(0, type.indexOf("/")) == 'business' || type == 'documents/doc') {
                return 'blue darken-1'
            }

            return 'gray'
        },

        deleteElementList() {
            return this.$store.state.page.deleteElementList
        }
    },

    beforeMount() {
        this.update()
    },

    beforeRouteUpdate (to, from, next) {
        this.rerender += 1
        next()
    },



    methods: {
        update() {
            let id = `${this.$route.params.user}/${this.$route.params.pathMatch}`
            const self = this

            if (id[id.length - 1] == '/') {
                id = id.substr(0, id.length - 1)
            }

            //Vuelve a obtener la pagina en snapshot
            db.collection('pages').doc(id.replace(/\//g, "."))
                .onSnapshot(function(doc) {
                    self.page = doc.data()
                })

            this.$store.dispatch("user/updateAdmin", this.subject)
            this.$store.commit('page/setOldTitle', this.page.Title)


            const queries = this.subject.Title + " " + this.subject.Content.Tags.join(" ")
            this.$store.dispatch('search/fetchRightBar', queries, {
                root: true
            })
        },

        goToSubject() {
            
        },

        goToUser(id) {
            this.$router.push({ path: `/${id}` })
        },

        goToFather() {
            this.$router.push({ path: `/${this.father.url}` })
        },

        goToAuthor() {
            this.$router.push({ path: `/${this.page.Author.id}` })
        },

        async deletePage() {
            await this.$store.dispatch('page/deleteElements', {
                idFather: this.father.url.replace(new RegExp('/', 'g'), '.'),
                arrayIndex: [this.page.id],
            })  

            this.goToFather()
        },

        async deleteElements() {
            if (!this.father.id) {
                await this.$store.dispatch('page/deleteElements', {
                    idFather: this.subject.url.replace(new RegExp('/', 'g'), '.'),
                    arrayIndex: this.$store.state.page.deleteElementList,
                })    
            }
            else {
                await this.$store.dispatch('page/deleteElements', {
                    idFather: this.father.url.replace(new RegExp('/', 'g'), '.'),
                    elements: this.father.Content.Elements,
                    arrayIndex: this.$store.state.page.deleteElementList,
                    deleteAll: false
                })
            }

            this.$store.commit('page/setDeleteElementList', [])
        },

        goToEdit() {
            // Introduciendo query
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?edit=true';
            window.history.pushState({path:newurl},'',newurl);

            this.rerender += 1
            this.edit = true
        },

        save() {
            const page = this.page
            page.id = format(page.Title)

            this.$store.dispatch('page/updatePage', {
                idFather: this.father.url.replace(new RegExp('/', 'g'), '.'),
                page
            }).then((id) => {
                var newurl = `/${id}`;
                this.$router.replace({path: newurl})
                this.rerender += 1
                this.edit = false
            })


            if (!this.admin) {

                this.subject.Admins.forEach(admin => {
                    if (admin.Super) {
                        this.$store.dispatch('sendNotification', {
                            id: admin.id,
                            value: {
                                Author: {
                                    displayName: this.user.displayName,
                                    id: this.user.id,
                                    photoURL: this.user.photoURL
                                },
                                Link: `/${this.$route.params.user}/${this.$route.params.subject}/${this.$route.params.section}/${page.id}`,
                                Message: `ha publicado en ${this.$route.params.subject}`,
                                Read: false
                            }
                        })
                    }
                })
            }

        },

        async sendComment() {
            this.loadingComment = true


            await this.$store.dispatch('page/sendComment', {
                id: this.page.url.replace(new RegExp('/', 'g'), '.'),
                Comment: {
                    Author: {
                        id: this.user.id,
                        displayName: this.user.displayName,
                        photoURL: this.user.photoURL,
                    },
                    Comment: this.newComment
                }
            })
            this.loadingComment = false
            this.newComment = ''

        },

        changeOrder() {
            this.dragging = false
        },
        
        goBack() {
            const idPage = `/${this.father.url}/${this.backId}`
            this.$router.replace({ path: idPage })
        },

        goForward() {
            const idPage = `/${this.father.url}/${this.nextId}`
            this.$router.replace({ path: idPage })
        },

        goToPage(id) {
            const idPage = `/${this.father.url}/${id}`
            this.pagemenu = false
            this.pagemenu2 = false
            this.$router.replace({ path: idPage })
        },


    }
}
</script>

<style lang="scss" scoped>
    .notRotateIcon {
        font-size: 2em;
        transform: rotate(0deg);
    }

    .rotateIcon {
        font-size: 2em;
        transform: rotate(90deg);
    }
</style>

