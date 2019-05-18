<template lang="pug">
    v-layout(v-if="!edit", column)
        div.html.ma-4(v-html="content.Text")
    div.quill-editor(v-else, :content="content.Text", @change="onEditorChange($event)", v-quill:myQuillEditor="editorOption")
</template>

<script>

export default {
    props: [
        "content"
    ],

    data() {
        return {
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
        }
    },

    methods: {
        onEditorChange(event) {
            this.content.Text = event.html
        },
    }

}
</script>

<style lang="scss" scoped>
    .html >>> * {
        width: 100%;
    }
</style>




