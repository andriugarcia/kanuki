<template lang="pug">
    v-tooltip(bottom)
        v-menu(slot="activator", v-model="menu", :close-on-content-click="false", :nudge-width="70", offset-y)
            v-btn(slot="activator", v-if="subject.Read == 'public'", icon)
                v-icon public
            v-btn(slot="activator", v-else-if="subject.Read == 'private'", icon)
                v-icon lock
            v-btn(slot="activator", v-else-if="subject.Read == 'admin'", icon)
                v-icon how_to_reg
            v-card
                v-list
                    v-list-tile(@click="make('public')")
                        v-list-tile-content
                            v-list-tile-title {{ $t("public") }}
                    v-list-tile(@click="make('private')")
                        v-list-tile-content
                            v-list-tile-title {{ $t("private") }}
                    v-list-tile(@click="make('admin')")
                        v-list-tile-content
                            v-list-tile-title {{ $t("admins") }}
        span(v-if="subject.Read == 'public'") {{ $t("isPublic") }}
        span(v-if="subject.Read == 'private'") {{ $t("isPrivate") }}
        span(v-if="subject.Read == 'admin'") {{ $t("isAdmins") }}
</template>

<script>
export default {
    props: ['subject', 'userId'],
    data() {
        return {
            menu: false,

        }
    },

    methods: {
        make(value) {
            this.$store.dispatch("updateSubjectRead", {
                authorId: this.$route.params.user,
                subjectId: this.$route.params.subject,
                Read: value
            })
        },
    }
}
</script>
