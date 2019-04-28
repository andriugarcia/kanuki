<template lang="pug">
    #SpreadsheetRenderer
        vue-friendly-iframe.frame(:src="source")
        v-alert(:value="true", type="info", outline).mx-2 Si el documento no carga, recarga la página

</template>

<script>
export default {
    props: [
        "content"
    ],

    data() {
        return {
            source: 'https://view.officeapps.live.com/op/embed.aspx?src='+ this.content.Src
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


