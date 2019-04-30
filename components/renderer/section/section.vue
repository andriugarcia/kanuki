<template lang="pug">
    elements(:elements="content.Elements", :dragging="dragging", :admin="admin")
</template>

<script>

import {getQuery} from '@/tools'
import elements from '@/components/elements.vue'

export default {
    data() {
        return {
            edit: false,
            dragging: false,
        }
    },

    components: {
        elements
    },

    props: [
        "content", "admin"
    ],

    mounted() {
        if (getQuery('edit') == 'true') {
            this.edit = true
        }
    }
}
</script>

