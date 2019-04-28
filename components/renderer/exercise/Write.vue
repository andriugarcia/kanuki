<template lang="pug">
    v-card(flat).pa-4
        .headline.ps {{ content.Question }}
        v-text-field.mt-4(v-model="answer", outline, label="Respuesta")
        v-btn(v-if="!showAnswer", :disabled="!answer", color="primary", block, @click="showAnswer = true") Mostrar Respuesta
        v-card(v-if="showAnswer", color="blue", dark).pa-3
            .headline.ps {{ content.Answer }}
</template>

<script>
export default {
    data() {
        return {
            showAnswer: false,
            answer: ''
        }
    },

    props: [
        "content"
    ]
}
</script>



