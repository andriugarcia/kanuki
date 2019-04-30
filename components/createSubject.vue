<template lang="pug">
    v-bottom-sheet(v-model="dialog", @click="addSubject")
      v-btn.floatingAdd(style="margin-left: 32px", slot="activator", dark, color="blue", round, fixed, bottom, large, left)
        .ps Crear materia
      v-card
        v-list
            v-layout.mx-2(justify-space-between, align-center)
                v-layout(align-center)
                    v-subheader.ps {{ $t("addSubject") }}
                    v-chip(disabled)
                        v-switch(:label="$t('public')", v-model="read")
                v-btn(color="blue", dark, @click="addSubject") {{ $t('create') }}
            v-form.pa-4
                v-layout(align-center)
                    v-chip(small)
                        v-avatar
                            img(:src="user.photoURL") 
                        div {{ user.id }}
                    div.mx-1 / 
                    v-text-field.ml-2(v-model="title", :label="$t('title')", single-line, autofocus)
                v-combobox(v-model="tags", clearable, label="Tags", chips, single-line, multiple)
                    template(slot="selection", slot-scope="data")
                        v-chip(:selected="data.selected", close, @input="remove(data.item)")
                            strong {{ data.item }}
                    template(slot="no-data")
                        v-list-tile
                            v-list-tile-content
                                v-list-tile-title
                                    div Pulsa <strong> enter </strong> o <strong> tab </strong> para crear un nuevo tag
                v-select(v-model="colorValue", :items="colors", single-line, height="50", hide-details, label="Color")
                v-textarea(v-model="description", counter, maxlength="140", single-line, hide-details, label="Descripcion (opcional)", required)

</template>

<script>
    import format from '@/format'

  export default {
    data () {
      return {
        dialog: false,
        items: [this.$t('private'), this.$t('public')],
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
        tags: [],
        colorValue: "",
        read: true,
        title: "",
        description: "",
      }
    },

    methods: {
        addSubject() {
            var read = (this.read) ? 'public' : 'private'
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

            
            var arrayLocales = navigator.language.split("-")

            const subject = {
                Title: this.title,
                id: format(this.title),
                url: `${this.user.id}/${format(this.title)}`,
                Read: read,
                Admins: {
                    [this.user.id]: true
                },
                Author: {
                    displayName: this.user.displayName,
                    id: this.user.id,
                    photoURL: this.user.photoURL
                },
                Content: {
                    Elements: [],
                    Description: this.description,
                    Tags: this.tags,
                    Color: color
                },
                Comments: [],
                Read: "public",
                Type: "subject",
                Visits: 0,
                Saves: 0,
                createdAt: Math.floor(Date.now() / 1000),
            }

            this.$store.dispatch('page/addSubject', subject)
            this.dialog = false
        },

        remove(item) {
            this.tags.splice(this.tags.indexOf(item), 1)
            this.chips = [...this.chips]
        }
    },

    computed: {
        user() {
            return this.$store.state.user.user
        },

        isDisabled() {
            return (this.title && this.readValue && this.colorValue) ? false : true
        }
    }
  }
</script>