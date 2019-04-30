<template lang="pug">
v-tooltip(bottom)
    v-dialog(slot="activator", width="500")
        v-btn(slot="activator", flat, icon)
            v-icon settings
        v-list
            v-subheader.ps Configuración
            v-form.pa-3
                v-combobox(v-model="tags", clearable, label="Tags", chips, single-line, multiple)
                    template(slot="selection", slot-scope="data")
                        v-chip(:selected="data.selected", close, @input="remove(data.item)")
                            strong {{ data.item }}
                    template(slot="no-data")
                        v-list-tile
                            v-list-tile-content
                                v-list-tile-title
                                    div Pulsa <strong> enter </strong> o <strong> tab </strong> para crear un nuevo tag
                v-divider
                v-select(v-model="colorValue", :items="colors", single-line, height="50", hide-details, label="Color")
                v-divider
                v-textarea(v-model="description", counter, maxlength="140", single-line, hide-details, label="Descripcion (opcional)", required)
                v-btn.ps(color="primary", :disabled="isDisabled", fullwidth, block, @click="updateSubject", @click.native="dialog = false") {{ $t("change") }}
                v-divider.mt-3

            v-form.pa-2
                v-subheader {{ $t("admins") }}
                v-list-tile(v-for="(admin, index) in subject.Admins", :key="index", @click="")
                    v-list-tile-title
                        v-layout
                            div {{ [admin] }}
                            .ml-2 {{ admin ? 'super' : 'admin' }}
                    v-spacer
                    v-btn(v-if="[admin] != subject.Author.id", icon, flat, @click="deleteAdmin([admin])")
                        v-icon close

                v-subheader {{ $t("addAdmin") }}
                v-form.px-3
                    v-switch(:label="$t('superadmin')", v-model="superadminSwitch")
                    v-text-field.mt-2(:label="$t('id')", v-model="superadminId", append-icon="add", @click:append="addAdmin", @keydown.enter.prevent="addAdmin")
                
                v-subheader Eliminar materia
                v-dialog.mx-3(width="500", v-model="deleteDialog")
                    v-btn(slot="activator", block, color="error").ps Eliminar materia
                    v-card
                        v-toolbar(color="error", dark)
                            v-toolbar-title.ps {{ $t("deleteSubject") }}
                        v-card-text {{ $t("deleteText") }}{{ subject.Title }}?
                        v-card-actions
                            v-btn.ps(color="primary", @click="deleteDialog = false") {{ $t("cancel") }}
                            v-btn.ps(color="error", @click="deleteSubject") {{ $t("delete") }}
    span {{ $t("settings") }}

</template>

<script>
import format from '@/format'

export default {
    props: ['subject', 'admin'],

    data() {
        return {
            // Modularizando subjectsetting
            // Vas por update subject
            tags: [],
            colorValue: "",
            superadminSwitch: false,
            superadminId: "",
            deleteDialog: false,
            colors: [
                this.$t('red'),
                this.$t('blue'),
                this.$t('yellow'),
                this.$t('green'),
                this.$t('grey'),
                this.$t('olive'),
                this.$t('purple'),
                this.$t('orange'),
                this.$t('brown'),
                this.$t('navy'),
                this.$t('turquese')
            ],
            description: "",
            isDisabled: false,

        }
    },

    mounted() {

        this.description = this.subject.Description

        this.tags = this.subject.Tags
        switch(this.subject.Color) {
            case 'cardred':
                this.colorValue = this.$t('red')
                break;
            case 'cardblue':
                this.colorValue = this.$t('blue')
                break;
            case 'cardyellow':
                this.colorValue = this.$t('yellow')
                break;
            case 'cardgreen':
                this.colorValue = this.$t('green')
                break;
            case 'cardpurple':
                this.colorValue = this.$t('purple')
                break;
            case 'cardgrey':
                this.colorValue = this.$t('grey')
                break;
            case 'cardbrown':
                this.colorValue = this.$t('brown')
                break;
            case 'cardorange':
                this.colorValue = this.$t('orange')
                break;
            case 'cardolive':
                this.colorValue = this.$t('olive')
                break;
            case 'cardnavy':
                this.colorValue = this.$t('navy')
                break;
            case 'cardturquese':
                this.colorValue = this.$t('turquese')
                break;


    }

    },

    methods: {
        updateSubject() {
            var color

            switch(this.colorValue) {
                case this.$t('red'):
                    color = 'cardred'
                    break;
                case this.$t('blue'):
                    color = 'cardblue'
                    break;
                case this.$t('yellow'):
                    color = 'cardyellow'
                    break;
                case this.$t('green'):
                    color = 'cardgreen'
                    break;
                case this.$t('purple'):
                    color = 'cardpurple'
                    break;
                case this.$t('grey'):
                    color = 'cardgrey'
                    break;
                case this.$t('brown'):
                    color = 'cardbrown'
                    break;
                case this.$t('orange'):
                    color = 'cardorange'
                    break;
                case this.$t('olive'):
                    color = 'cardolive'
                    break;
                case this.$t('navy'):
                    color = 'cardnavy'
                    break;
                case this.$t('turquese'):
                    color = 'cardturquese'
                    break;
            }
            this.$store.dispatch('updateSubject', {
                authorId: this.$route.params.user,
                subjectId: this.$route.params.subject,
                Color: color,
                Tags: this.tags,
                Description: this.description
            })

        },

        deleteSubject() {
            const subjectId = this.$route.params.subject
            const authorId = this.$route.params.user

            this.$store.dispatch('deleteSubject', {
                subjectId,
                authorId
            }).then(() => {
                this.$router.replace({ path: `/` })
            })

            this.deleteDialog = false

        },

        addAdmin() {
            this.$store.dispatch('addAdmin', {
                id: `${this.$route.params.user}.${this.$route.params.subject}`,
                value: {
                    Super: this.superadminSwitch,
                    id: format(this.superadminId),
                }
            })

            this.$store.dispatch('sendNotification', {
                id: format(this.superadminId),
                value: {
                    Author: {
                        displayName: this.user.displayName,
                        id: this.user.id,
                        photoURL: this.user.photoURL
                    },
                    Link: `/${this.$route.params.user}/${this.$route.params.subject}`,
                    Message: `Ahora eres administrador en ${this.subject.Title}`,
                    Read: false
                }
            })
        },
    }
}
</script>

