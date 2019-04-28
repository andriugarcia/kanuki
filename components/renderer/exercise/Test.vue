<template lang="pug">
    #test
        div(style="width: 100%").pa-3
            v-card-text(v-if="!edit").title.font-weight-bold.ma-2 {{ content.Question }}
            v-text-field.title.font-weight-bold.ma-3(v-else, label="Enunciado", v-model="content.Question")
            v-card(flat, :key="rerender").px-3
                v-btn(v-if="!edit", v-for="(answer, index) in content.Answers", :outline="!answer.Selected", @click="select(answer)", block, large, :key="answer.Text", :color="!answer.Selected ? 'gray' : (answer.isCorrect) ? 'green' : 'red'") {{answer.Text}}
                v-layout(v-if="edit", v-for="(answer, index) in content.Answers",:key="index")
                    v-btn(@click="switchCorrect(answer)", :color="(answer.isCorrect) ? 'green' : 'red'") {{(answer.isCorrect) ? 'Correcta' : 'Incorrecta'}}
                    v-text-field(v-model="answer.Text")
                    v-btn(flat, icon, @click="remove(index)")
                        v-icon close
                v-btn(v-if="edit", block, large, color="gray", @click="addTest")
                    v-icon add

                //- v-btn(v-for="answer in shuffledAnswers", block, large, :key="answer.Text", :outline="!answer.Selected", 
                //- @click="select(answer)", :color="!answer.Selected ? 'gray' : (answer.IsCorrect ? 'green' : 'red')",
                //- :dark="answer.Selected", :light="!answer.Selected") {{ answer.Text }}
</template>

<script>
import {getQuery} from '@/tools'


export default {

    data() {
        return {
            edit: false,
            rerender: 1
        }
    },
    
    props: [
        "content"
    ],

    mounted() {

        
        if (getQuery('edit') == 'true') {
            this.edit = true
        }
        const answers = this.content.Answers
        if (!this.content.Answers) return
        
        if (this.content.Answers) {
            this.content.Answers.forEach(item => {
                item.Selected = false
            })
        }

        var currentIndex = answers.length, temporaryValue, randomIndex

        while(0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            temporaryValue = answers[currentIndex]
            answers[currentIndex] = answers[randomIndex]
            answers[randomIndex] = temporaryValue
        }

        this.rerender += 1
    },

    methods: {
        select(answer) {
            answer.Selected = true
        },

        remove(index) {
            this.content.Answers.splice(index, 1)
        },

        switchCorrect(answer) {
            answer.isCorrect = !answer.isCorrect
        },

        addTest() {
            if (!this.content.Answers) {
                this.content.Answers = [{Text: '', Selected: false, isCorrect: true}]
            } 

            else {
                this.content.Answers.push({Text: '', Selected: false, isCorrect: false})
            }

            this.rerender += 1
        }
    }
}
</script>

