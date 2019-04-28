<template lang="pug">
    v-card(flat)
        latex.ma-4(:content="content.Text", style="overflow-x: scroll;")
</template>

<script>
export default {
    props: [
        "content"
    ]
}
</script>

