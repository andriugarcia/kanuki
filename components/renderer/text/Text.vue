<template lang="pug">
    v-layout(v-if="!edit")
        v-card-text.ma-4 {{ content.Text }}
    v-form.pa-4(v-else)
        v-textarea(v-model="content.Text", :label="$t('message.text')", single-line, auto-grow)
</template>

<script>

import {getQuery} from '@/tools'

export default {
    data() {
        return {
            edit: false
        }
    },

    props: [
        "content"
    ],

    mounted() {
        if (getQuery('edit') == 'true') {
            this.edit = true
        }
    }
}
</script>

