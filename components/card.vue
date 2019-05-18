<template lang="pug">
  #card.pointer
    v-card(:color="color")
      v-layout.header
          v-btn(flat, dark, small, @click="goToUser")
              v-avatar(size="24px")
                img(:src="photourl")
              div.ml-1.white--text {{ author }}
          v-spacer(@click="goToSubject")
          div.date.ps.white--text(@click="goToSubject") {{ date | toDate }}
      .card-body(@click="goToSubject")
          h1.ps.white--text {{ title }}
          p.white--text {{ description }}


</template>

<script>
export default {
    props: [
        "title", "description", "author", "authorid", "id", "color", "photourl", "date", "type"
    ],

    methods: {
      goToSubject() {
        var id = `/${this.authorid}/${this.id}`
        this.$router.push({ path: id })
      },

      goToUser() {
        this.$router.push({ path: `/${this.authorid}` })
      }
    },

    filters: {
      toDate(value) {
        var date = new Date(value * 1000);
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
      }
    }
}
</script>


<style lang="scss" scoped>
    #card {
      // background-color: $CardRed;
      border-radius: 4px;
      .header {
        // display: flex;
        // flex-direction: row;
        // justify-content: space-between;
        border-radius: 4px 4px 0 0;
        background: rgba(0, 0, 0, 0.075);
      }
      .card-body {
        padding: 4px 8px 8px 24px;
        h1 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        p {

          font-size: 12px;
          margin-bottom: 8px;
        }
      }
    }

    .date {
      font-size: 12px;
      margin-top: 12px;
      margin-right: 8px;
    }

</style>
