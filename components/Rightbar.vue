<template lang="pug">
    #rightbar
        //- .ad
        card.mb-2(v-for="(subject, index) in subjects",
            :key="index"
            :title="subject._source.Title",
            :description="subject._source.Content.Description",
            :author="subject._source.Author.displayName",
            :color="subject._source.Content.Color",
            :authorid="subject._source.Author.id",
            :photourl="subject._source.Author.photoURL",
            :date="subject._source.createdAt",
            :id="subject._source.id")
</template>

<script>
import Card from '@/components/Card.vue'

export default {
    data() {
        return {
            data: []
        }
    },

    components: {
        Card
    },

    computed: {

        subjects() {
            return this.$store.state.search.rightbar
        }
    }
}
</script>


<style lang="scss" scoped>

    #rightbar {
        .ad {
            background-color: gray;
            width: 100%;
            height: 300px;
            margin-bottom: 8px;
        }
    }
</style>

