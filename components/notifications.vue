<template lang="pug">
#notifications
    v-card(color="blue", dark).pa-2
        v-list-tile(avatar)
            v-list-tile-avatar
                img(v-if="!user.id", src="../assets/images/Profile.png")
                img(v-if="user.id", :src="user.photoURL")
            v-list-tile-content
                v-list-tile-title.ps {{ user.displayName }}
                v-list-tile-sub-title {{ user.email }}
        v-divider
        //- v-list-tile
            v-list-tile-content
            v-list-tile-title.ps {{ $t("settings") }}
        v-list-tile(@click="goToUser")
            v-list-tile-content
                v-list-tile-title.ps Ver perfil
        v-list-tile(@click="logOut")
            v-list-tile-content
                v-list-tile-title.ps {{ $t("logout") }}
    v-card.mt-2
        v-list(style="overflow-y: scroll")
            v-subheader.ps {{ $t("notifications") }}
            v-divider
            div.ma-2(v-for="notification in user.notifications")
                v-list-tile(:key="notification.Message", @click="goToLink(notification.Link)")
                    v-list-tile-avatar 
                        img(:src="notification.Author.photoURL")
                    v-list-tile-content
                        v-list-tile-title.ps {{notification.Author.displayName}}
                        v-list-tile-sub-title {{notification.Message}}
</template>

<script>

export default {
    props: ['user'],
    data() {
        return {}
    },

    methods: {
        goToUser() {
          this.$router.push({ path: `/${this.user.id}` })
        },

        logOut() {
            this.$store.dispatch("user/logout")

            deleteCookie()
        },
    }
}
</script>
