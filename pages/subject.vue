<template lang="pug">
    .flex.wrap
        #subject
            v-card.mb-3
                v-toolbar.inline(:color="subject.Color", dark, flat)
                    v-toolbar-title.ps {{ subject.Title }}
                    v-spacer
                    shareButton
                    download-button(v-if="subject.id != 'notFound'", :subject="subject", :user="user", :admin="admin")
                    subjectSettings(v-if="admin == 'super'", :subject="subject", :admin="admin")
                    changeRead(v-if="subject.id && admin == 'super'", :subject="subject", :user="user.id")
                    p(slot="extension") {{ subject.Description }}
                v-toolbar.inline(flat, v-if="!(subject.id == 'notFound' || subject.id == 'loading')")
                    v-btn(flat, icon, v-if="$route.params.section", @click="goToSubject")
                        v-icon arrow_back
                    v-btn(v-if="subject.Author", flat, light, @click="goToUser")
                        v-avatar(size="32px")
                            img.mr-2(:src="subject.Author.photoURL")
                        div {{ subject.Author.displayName }}
                    v-breadcrumbs.desktop(divider="/")
                        v-breadcrumbs-item(v-if="$route.params.section") {{ $route.params.section }}
                    v-spacer
                    create-page(v-if="$route.params.section && user.id && !sectionNotFound")
                    v-bottom-sheet(v-if="!$route.params.section && user.id && admin == 'super'", v-model="createBar")
                        v-btn.ps(slot="activator", flat, icon)
                            v-icon add
                        v-list
                            v-subheader.ps {{ $t("createSection") }}
                            form.ma-4
                                v-layout
                                    v-chip
                                        v-avatar
                                            img(:src="user.photoURL")
                                        div {{ user.displayName }}
                                    v-text-field.ml-3(v-model="title", autofocus, counter, maxlength="25", :error="$store.state.error.errorSection", :loading="isloading", :disabled="isloading", append-icon="add", @click:append="addSection", @keydown.enter.prevent="addSection", :label="$t('title')", required)
                    v-btn(v-if="!$route.params.section && admin == 'super' && deleteSectionList.length != 0", @click="deleteSections", flat, icon)
                        v-icon delete
                    v-btn(v-if="$route.params.section && admin == 'super' && deletePageList.length != 0", @click="deletePages", flat, icon)
                        v-icon delete
                    
                    v-btn(v-if="admin == 'super' && !dragging", @click="dragging = true", flat, icon)
                        v-icon swap_vert
                    v-btn(v-if="admin == 'super' && dragging", @click="dragging = false", color="blue", icon, dark)
                        v-icon swap_vert
                    
                draggable(v-if="!$route.params.section && dragging", v-model="sections", :options="{draggable:'.item'}")
                    v-list-tile.item.py-1(v-for="section in sections", :key="section.id") 
                        v-list-tile-avatar
                            v-icon drag_indicator
                        v-list-tile-avatar
                            v-icon folder
                        v-list-tile-content
                            v-list-tile-title.ps {{ section.Title }}
                            v-list-tile-sub-title {{ section.AuthorName }}
                v-list-tile.item.py-1(v-if="!$route.params.section && !dragging", v-for="section in sections", :key="section.id") 
                    v-list-tile-avatar(@click="goToSection(section)")
                        v-icon folder
                    v-list-tile-content(@click="goToSection(section)")
                        v-list-tile-title.ps {{ section.Title }}
                        v-list-tile-sub-title {{ section.AuthorName }}
                    v-list-tile-action
                        v-checkbox(v-if="admin == 'super'", v-model="deleteSectionList", :value="section.id") 


                draggable(v-if="$route.params.section && dragging", v-model="pages", :options="{draggable:'.item'}")
                    v-list-tile.item.py-1(v-for="page in pages", :key="page.id") 
                        v-list-tile-avatar
                            v-icon drag_indicator
                        v-list-tile-avatar
                            v-icon {{ page.Type | geticon }}
                        v-list-tile-content
                            v-list-tile-title.ps {{ page.Title }}
                            v-list-tile-sub-title {{ page.AuthorName }}  
                div(v-if="$route.params.section && !dragging")
                    v-list-tile.item.py-1(v-if="!sectionNotFound", v-for="page in pages", :key="page.id") 
                        v-list-tile-avatar(@click="goToPage(page)")
                            v-icon {{ page.Type | geticon }}
                        v-list-tile-content(@click="goToPage(page)")
                            v-list-tile-title.ps {{ page.Title }}
                            v-list-tile-sub-title {{ page.AuthorName }}  
                        v-tooltip(v-if="admin == 'super'", bottom)
                            v-avatar(slot="activator")
                                v-icon(v-if="page.Read == 'public'") public
                                v-icon(v-if="page.Read == 'admin'") how_to_reg
                            span(v-if="page.Read == 'public'") {{ $t('isPublic') }}
                            span(v-if="page.Read == 'admin'") {{ $t('isAdmin') }}
                        v-list-tile-action
                            v-checkbox(v-if="admin == 'super'", v-model="deletePageList", :value="page.id") 

                      
        rightbar           

</template>

<script>

import Rightbar from '@/components/rightbar.vue'
import CreatePage from '@/components/createPage.vue'
import shareButton from '@/components/shareButton.vue'
import subjectSettings from '@/components/subjectSettings.vue'
import changeRead from '@/components/changeRead.vue'
import downloadButton from '@/components/downloadButton.vue'
import draggable from 'vuedraggable'
import format from '@/format'
import { getIcon, getCardColor } from '@/tools'

export default {

    data() {
        return {
            index: Number,
            admin: "",
            title: "",
            dragging: false,
            deleteSectionList: [],
            deletePageList: [],
            createBar: false,
            isloading: false,
            deleting: false,
            sectionNotFound: false,

        }
    },

    components: {
        Rightbar,
        CreatePage,
        shareButton,
        subjectSettings,
        changeRead,
        downloadButton,
        draggable
    },

    filters: {
        geticon: function (value) {
            return getIcon(value)
        }
    },

    methods: {

        goToUser() {
            this.$router.push({path:`/${this.$route.params.user}`})
        },

        goToSection(section) {
            const idSection = `${this.$route.params.user}.${this.$route.params.subject}.${section.id}`
            this.$store.dispatch("section/fetchSectionParam", idSection)
            this.$router.push({ path: `/${this.subject.Author.id}/${this.subject.id}/${section.id}` })
        },

        goToPage(page) {
            this.$router.push({ path: `/${this.subject.Author.id}/${this.subject.id}/${this.$route.params.section}/${page.id}` })
        },

        addSection() {

            if (!this.title) return

            this.isloading = true

            const section = {
                Title: this.title,
                id: format(this.title),
                Author: {
                    displayName: this.user.displayName,
                    id: this.user.id,
                    photoURL: this.user.photoURL
                },
                Pages: []
            }

            this.$store.dispatch('section/addSection', {
                section,
                subject: {
                    id: this.subject.id,
                    authorId: this.subject.Author.id
                }
            }).then(() => {
                this.isloading = false
                this.createBar = false
                this.title = ""
                })

        },

        deleteSections() {

            this.$store.dispatch('subject/deleteSubjectParamSections', {
                authorId: this.$route.params.user,
                subjectId: this.$route.params.subject,
                array: this.deleteSectionList
            })

        this.deleteSectionList = []

        },

        deletePages() {
            this.$store.dispatch('subject/deleteSubjectParamPages', {
                authorId: this.$route.params.user,
                subjectId: this.$route.params.subject,
                sectionId: this.$route.params.section,
                array: this.deletePageList
            })

        this.deletePageList = []
        },

        deleteAdmin(admin) {
            this.$store.dispatch('subject/deleteAdmin', {
                authorId: this.$route.params.user,
                subjectId: this.$route.params.subject,
                admin
            })
        }
    },

    asyncData({store, params}) {

        return store.dispatch("subject/fetchSubjectParam", `${params.user}.${params.subject}`)
    },

    computed: {
        user() {
            return this.$store.state.user.user
        },

        subject() {
            // Pasar esto a Vuex
            const subject = this.$store.state.subject.subjectParam
            
            if (typeof(subject) == 'undefined') {
                this.sectionNotFound = true
                return subjectTemplate
            } 

            this.admin = this.$store.state.user.admin
            
            this.sectionNotFound = false

            return subject
        },

        sections: {
            get() {
                const subject = this.$store.state.subject.subjectParam

                if (!subject) return []

                return subject.Sections
            },

            set(value) {
                this.$store.dispatch('subject/updateSubjectParamSections', {
                    id: `${this.$route.params.user}.${this.$route.params.subject}`,
                    array: value
                })
            }
        },

        pages: {
            // Hacer el set y pasar a vuex
            get() {
                const idSection = `${this.$route.params.user}.${this.$route.params.subject}.${this.$route.params.section}`
                this.$store.dispatch("section/fetchSectionParam", idSection)

                var section = this.$store.state.sectionModule.sectionParam

                if (!section) return [] 

                if (!section.Pages) {
                    this.sectionNotFound = true
                    return []
                }
                
                return section.Pages.filter(page => {
                    this.sectionNotFound = false
                    return page.Read == 'public' || page.Read == 'admin' && this.admin == 'super'
                })
            },

            set(value) {
                this.$store.dispatch('subject/updateSectionParamPages', {
                    id: `${this.$route.params.user}.${this.$route.params.subject}.${this.$route.params.section}`,
                    array: value
                })

            }
        },

    }
}
</script>

