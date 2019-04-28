<template lang="pug">
    #imageRender
        masonry.pa-3(:cols="{default:5, 1600: 4, 1400:3, 800: 2, 500: 1}", :gutter="10")
            img(v-for="image in content.Src", :key="image", :src="image")
        p.ml-4.mt-3 {{ content.Text }}
        pre {{ content.Src }}
</template>

<script>
export default {
    props: [
        "content"
    ]
}
</script>
