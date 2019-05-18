<template lang="pug">
    #cv.pa-4
        script(type="text/javascript", src="https://platform.linkedin.com/badges/js/profile.js", async, defer)
        v-layout(v-if="!edit")
            div
                div.LI-profile-badge(data-version="v1", data-size="medium", data-locale="es_ES", data-type="horizontal", data-theme="light", :data-vanity="getVanity()") 
                    a.LI-simple-link(:href="getProfile()") Perfil de linkedin
                v-btn(v-if="content.email", color="gray lighten-1", flat, small, @click="sendMail") 
                    v-icon.mr-2 mail
                    .text-lowercase {{ content.email }}
            div.ml-4
                h2.ps Estudios
                div.ml-2.html(v-html="content.studies")
                h2.ps.mt-3 Proyectos
                div.ml-2.html(v-html="content.projects")
        div(v-if="!edit") 
            h2.ps Idiomas
            v-data-table(:headers="headers", :items="languages", hide-actions)
                template(v-slot:items="props")
                    td 
                        div {{ props.item. language }}
                    td 
                        div {{ props.item.reading }}
                    td 
                        div {{ props.item.writing }}
                    td 
                        div {{ props.item.speaking }}
        div(v-if="edit")
            div
                v-text-field(label="URL de tu cuenta Linkedin", v-model="content.linkedin")
                v-text-field(label="Email", v-model="content.email")
            v-card(color="blue", flat)
                v-layout(justify-space-around)
                    v-btn(flat, dark, @click="select = 1").ps Estudios
                    v-btn(flat, dark, @click="select = 2").ps Proyectos
                    v-btn(flat, dark, @click="select = 3").ps Idiomas
            div(v-if="select==1")
                div.quill-editor(:content="content.studies", @change="onStudiesChange($event)", v-quill:myQuillEditor="editorOption")
            div(v-else-if="select==2")
                div.quill-editor(:content="content.projects", @change="onProjectsChange($event)", v-quill:myQuillEditor="editorOption")
            v-data-table(v-else, :headers="headers", :items="languages", hide-actions)
                template(v-slot:items="props")
                    td 
                        v-text-field(v-model="props.item.language", label="Idioma", single-line)
                    td 
                        v-text-field(v-model="props.item.reading", label="Lectura", single-line)
                    td 
                        v-text-field(v-model="props.item.writing", label="Escritura", single-line)
                    td 
                        v-text-field(v-model="props.item.speaking", label="Hablado", single-line)
                    td.text-xs-right
                        v-btn(icon, small, flat, @click="remove(props.item)")
                            v-icon(small) close
            v-layout(justify-center)
                v-btn(round, color="blue", large, dark, @click="add").ma-3 Nuevo

</template>

<script>
export default {
    props: ["content"],
    data() {
        return {
            select: 1,
            headers: [
                {
                text: 'Idioma',
                value: 'language',
                sortable: false
                },
                {
                text: 'Lectura',
                value: 'reading',
                sortable: false
                },
                {
                text: 'Escritura',
                value: 'writing',
                sortable: false
                },
                {
                text: 'Hablado',
                value: 'speaking',
                sortable: false
                }
            ],
            editorOption: { 
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        ['blockquote', 'code-block'],

                        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                        [{ 'direction': 'rtl' }],                         // text direction

                        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                        [{ 'font': [] }],
                        [{ 'align': [] }],

                        ['clean']                                         // remove formatting button
                    ]
                }
            },
        }
    },

    computed: {
        edit() {
            return this.$store.state.page.edit
        },

        languages() {
            if (typeof this.content.languages == 'undefined') {
                this.content.languages = [
                    {
                        language: "",
                        reading: "",
                        writing: "",
                        speaking: "",
                    }
                ]
            }

            return this.content.languages
        }

    },


    methods: {
        add() {
            this.content.languages.push({
                language: "",
                reading: "",
                writing: "",
                speaking: ""
            })
        },

        remove(item) {
            const index = this.content.languages.indexOf(item)
            this.languages.splice(index, 1)
        },

        onProjectsChange(event) {
            this.content.projects = event.html
        },
        onStudiesChange(event) {
            this.content.studies = event.html
        },
        sendMail() {
            window.location.href = `mailto:${this.content.email}`
        },
        getVanity() {
            var vanity = ""
            var regexp = /in\/(.*)/
            console.log("vanity")
            var vanity = this.content.linkedin.match(regexp)
            vanity = vanity[1].replace(/\/$/, "")

            console.log(vanity)

            return vanity
        },
        getProfile() {
            console.log("PROFILE")
            const user = this.getVanity()
            console.log(user)
            return `https://es.linkedin.com/in/${user}?trk=profile-badge`
        }
    }
}
</script>

