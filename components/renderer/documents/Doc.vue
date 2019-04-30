<template lang="pug">
    #DocRenderer
        //- vue-friendly-iframe.frame(:src="source")
        iframe(v-if="content.Src", :src="source", style="border: 0; width: 100%; height: 70vh")
        v-alert(:value="true", type="info", outline).mx-2 Si el documento no carga, recarga la página
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
            source: 'https://view.officeapps.live.com/op/embed.aspx?src='+ this.content.Src,
            edit: false,
            file: [],
            uploading: false
        }
    },
    
    mounted() {
        if (getQuery('edit') == 'true') {
            this.edit = true
        }
    },

    methods: {
        updateFile(event) {
            this.file = event.target.files[0]
        },

        upload() {
            let storageRef = storage.ref(`${this.$route.params.user}`)

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

<style>
    .frame > iframe {
        border: 0;
        width: 100%;
        height: 80vh;
    }
</style>


