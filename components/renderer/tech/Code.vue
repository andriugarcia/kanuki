<template lang="pug">
    .container(v-if="!edit")
        pre(v-highlightjs="content.Text") 
            code(:class="content.Language")
        .language {{ content.Language }}
    prism-editor(v-else, :code="content.Text", language="js")

</template>

<script>


import NoSSR from 'vue-no-ssr'

import {getQuery} from '@/tools'
import PrismEditor from 'vue-prism-editor'

import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
//vue-prism-editor dependency
// import "prismjs/themes/prism.css";

export default {
    props: [
        "content"
    ],

    components: {
        'no-ssr': NoSSR,
        PrismEditor
    },

    computed: {
        edit() {
            return this.$store.state.page.edit
        }
    },


}
</script>

<style lang="scss" scoped>
    .container {
        position: relative;
        height: 100%;
    }

    .language {
        position: absolute;
        color: white;
        background-color: rgba(255,255,255, .25);
        font-size: .8em;
        padding: 6px;
        border-radius: 8px;
        top: 56px;
        right: 40px;
    }
</style>

