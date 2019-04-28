<template lang="pug">
    v-tooltip(bottom)
        v-btn(v-if="user.id && !admin && !downloaded", slot="activator", :loading="downloading", flat, icon, @click="saveSubject")
            v-icon cloud_download
        span(v-if="user.id && !admin && !downloaded") {{ $t("subjectNotSaved") }}
        v-btn(v-if="user.id && !admin && downloaded", slot="activator", :loading="downloading", flat, icon, @click="pullSubject")
            v-icon cloud_done
        span(v-if="user.id && !admin && downloaded") {{ $t("subjectSaved") }}
</template>

<script>
export default {
    data() {
        return {
            downloading: false,
        }
    },

    props: ["subject", "user", "admin"],

    computed: {
        downloaded() {
            return this.$store.state.downloaded
        },
    },

    methods: {
        saveSubject() {
            this.downloading = true
            this.$store.dispatch('subject/addSaved', {
                userId: this.user.id,
                value: {
                    AuthorId: this.subject.Author.id,
                    AuthorName: this.subject.Author.displayName,
                    Description: this.subject.Description,
                    Read: this.subject.Read,
                    PhotoURL: this.subject.Author.photoURL,
                    Color: this.subject.Color,
                    Title: this.subject.Title,
                    id: this.subject.id
                }
            }).then(() => {
                this.downloading = false
                this.$store.state.downloaded = true
            })
        },

        pullSubject() {
            this.downloading = true
            this.$store.dispatch('subject/pullSaved', {
                userId: this.user.id,
                id: this.subject.id
            }).then(() => {
                this.downloading = false
                this.$store.state.downloaded = false
            })
        }
    }
}
</script>

