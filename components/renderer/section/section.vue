<template lang="pug">
    elements(:elements="content.Elements", :dragging="dragging", :admin="admin")
</template>

<script>

import {getQuery} from '@/tools'
import elements from '@/components/elements.vue'

export default {
    data() {
        return {
            dragging: false,
        }
    },

    components: {
        elements
    },

    props: [
        "content", "admin"
    ],

    computed: {
        edit() {
            return this.$store.state.page.edit
        }
    }
}
</script>

