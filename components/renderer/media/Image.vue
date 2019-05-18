<template lang="pug">
    #imageRender
        div
            img.image(:src="content.Src", @click="modalToggle")
            .modal(v-if="modal", @click="modalToggle")
                img.modal-content(:src="content.Src")
            p(v-if="!edit").ml-4.mt-3 {{ content.Text }}
        div(v-if="edit")
            v-layout.pa-3(justify-space-between, align-center)
                input(type="file", @change="updateFile")
                v-btn(@click="upload", :loading="uploading", outline, color="red") Subir
            v-textarea.ma-3(v-model="content.Text", label="Descripcion", single-line, auto-grow)

</template>

<script>
import {getQuery} from '@/tools'
import storage from '@/storage'


export default {
    data() {
        return {
            modal: false,
            uploading: false,
        }
    },

    computed: {
        edit() {
            return this.$store.state.page.edit
        }
    },

    methods: {
        modalToggle() {
            this.modal = !this.modal
        },

        updateFile(event) {
            this.file = event.target.files[0]
        },

        
        upload() {
            let storageRef = storage.ref(`${this.$route.params.user}/images/${this.file.name}`)

            this.uploading = true
            var self = this
            var task = storageRef.put(this.file)
            task.on('state_changed', function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                self.progress = progress
            })
            task.then(snapshot => {
                snapshot.ref.getDownloadURL().then(downloadURL => {
                this.content.Src = downloadURL
                this.uploading = false
                })
            })
        },
    },


    props: [
        "content"
    ]

}


</script>

<style lang="scss" scoped>
    .image {
        width: 100%;
        cursor: pointer;
    }

    .modal {
        position: fixed;
        z-index: 30;
        padding: 50px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.9);

    }

    .modal-content {
        margin: auto;
        display: block;
        width: 80%;
        max-width: 700px;
        animation-name: zoom;
        animation-duration: 0.4s;
    }

    @keyframes zoom {
        from {transform:scale(.5)}
        to {transform:scale(1) }
    }

    @media only screen and (max-width: 700px) {
        .modal-content {
            width: 100%;
        }
    }
</style>


