<template lang="pug">
    #Card
        v-layout(column, align-center)
            v-card.ma-4.pointer(:color="color", @click.native="showAnswer", dark)
                v-card-text.ma-5.headline {{ text }}
        v-alert.ma-2(type="info", :value="true", outline) Para revelar la respuesta toca la tarjeta
</template>

<script>
export default {

    data() {
        return {
            text: this.content.Data.Question,
            color: 'gray'
        }
    },

    props: [
        "content"
    ],

    methods: {
        showAnswer() {
            this.text = this.content.Data.Answer
            this.color = 'blue'
        }
    }
}
</script>

<style lang="scss" scoped>
    .pointer {
        cursor: pointer;
    }
</style>



