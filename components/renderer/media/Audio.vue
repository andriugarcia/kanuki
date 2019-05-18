<template lang="pug">
    #AudioRenderer
        div.mt-2
            audio.audio(v-if="content.Src", controls) Este navegador no soporta audio
                source(:src="content.Src", type="audio/mpeg")
            p(v-if="!edit").ml-4.mt-3 {{ content.Text }}
        div(v-if="edit")
            v-layout.pa-3(justify-space-between, align-center)
                input(type="file", @change="updateFile")
                v-btn(outline, color="red", @click="upload", :loading="uploading") Subir
            v-textarea.ma-3(v-model="content.Text", :label="$t('message.text')", single-line, auto-grow)

</template>

<script>
import storage from '@/storage'
import {getQuery} from '@/tools'

export default {
    props: [
        "content"
    ],

    data() {
        return {
            uploading: false,
            file: [],
            progress: 0
        }
    },

    computed: {
        edit() {
            return this.$store.state.page.edit
        }
    },

    methods: {
        updateFile(event) {
            this.file = event.target.files[0]
        },

        upload() {
            let storageRef = storage.ref(`${this.$route.params.user}/videos/${this.file.name}`)

            this.uploading = true
            var self = this
            var task = storageRef.put(this.file)
            task.on('state_changed', function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(progress)
                self.progress = progress
            })
            task.then(snapshot => {
                snapshot.ref.getDownloadURL().then(downloadURL => {
                    this.content.Src = downloadURL
                    this.uploading = false
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .audio {
        width: calc(100% - 32px);
        margin: 16px;
    }
</style>


