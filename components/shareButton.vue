<template lang="pug">
v-tooltip(bottom)
    v-bottom-sheet(v-model="sheet", slot="activator")
        v-btn(slot="activator", icon, flat)
            v-icon share
        v-list
            v-subheader.ps {{ $t("share") }}
            v-list-tile(@click="share('whatsapp')")
                v-list-tile-avatar
                    v-avatar(size="32px", tile)
                        img(src="../assets/images/whatsappIcon.png", alt="Whatsapp")
                v-list-tile-title Whatsapp
            v-list-tile(@click="share('facebook')")
                v-list-tile-avatar
                    v-avatar(size="32px", tile)
                        img(src="../assets/images/facebookIcon.png", alt="Facebook")
                v-list-tile-title Facebook
            v-list-tile(@click="share('twitter')")
                v-list-tile-avatar
                    v-avatar(size="32px", tile)
                        img(src="../assets/images/twitterIcon.png", alt="Twitter")
                v-list-tile-title Twitter
            v-list-tile(@click="share('linkedin')")
                v-list-tile-avatar
                    v-avatar(size="32px", tile)
                        img(src="../assets/images/linkedinIcon.png", alt="LinkedIn")
                v-list-tile-title LinkedIn
            v-list-tile(@click="share('telegram')")
                v-list-tile-avatar
                    v-avatar(size="32px", tile)
                        img(src="../assets/images/telegramIcon.png", alt="Telegram")
                v-list-tile-title Telegram
    span {{ $t("share") }}
</template>

<script>
import { socialShare } from '@/tools'

export default {
    data() {
        return {
            sheet: false
        }
    },

    methods: {
        share(network) {
            socialShare(network)
        }
    }
}
</script>

