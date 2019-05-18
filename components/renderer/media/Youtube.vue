<template lang="pug">
    #YoutubeRenderer
        iframe(v-if="content.Src", style="width:100%; height: 40vw", :src="content.Src", frameborder="0", allow="autoplay; encrypted-media", allowfullscreen)
        v-text-field.ma-3(v-if="edit", v-model="link", label="Youtube URL", single-line)
</template>

<script>
import {getQuery} from '@/tools'

export default {
    data() {
        return {
            link: ''
        }
    },

    watch: {
        link(value) {
            this.getId()
        }
    },

    computed: {
        edit() {
            return this.$store.state.page.edit
        }
    },

    methods: {
        getId() {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = this.link.match(regExp);

            if (match && match[2].length == 11) {
                this.content.Src = 'https://www.youtube.com/embed/' + match[2];
            } else {
                return 'error';
            }
        }
    },

    props: [
        "content"
    ],
}
</script>


