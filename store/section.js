import { get, set, remove, push, pull } from '@/f'

const section = {
  state: () => {
    return {
      sectionParam: {}
    }
  },

  mutations: {
    setSectionParam(state, data) {
      state.sectionParam = data
    },

    setSectionPagesParam(state, data) {
      state.sectionParam.Pages = data
    }
  },

  actions: {
    fetchSectionParam: (context, id) => {

      return get('sections', id).then(doc => {
        context.commit('setSectionParam', doc.data())
      })
    },


    // UPDATE

    updateSectionParamPages: (context, value) => {
      set('sections', value.id, {
        Pages: value.array
      })


      context.commit('setSectionPagesParam', value.array)
    },


    // ADD

    addSection: (context, value) => {

      var id = `${value.section.Author.id}.${value.subject.id}.${value.section.id}`
      get('sections', id).then((doc) => {
        if (!doc.data()) {

          var sectionId = `${value.section.Author.id}.${value.subject.id}.${value.section.id}`
          set('sections', sectionId, value.section)

          push('subjects', `${value.subject.authorId}.${value.subject.id}`, 'Sections', {
            Title: value.section.Title,
            id: value.section.id,
            AuthorName: value.section.Author.displayName,
          }).then(sectionList => {
            console.log(sectionList)
            context.commit("section/subject/setSubjectParamSections", sectionList)
          })



        } else {
          context.state.errorSection = true

          setTimeout(() => {
            context.state.errorSection = false
          }, 4000)
        }
      })

    },

    deleteSection: (context, value) => {

      //Delete Pages

      var pages

      var id = `${value.authorId}.${value.subjectId}.${value.sectionId}`
      get('sections', id).then(doc => {
        pages = doc.data().Pages

        pages.forEach(page => {
          context.dispatch('section/page/deletePage', {
            authorId: value.authorId,
            subjectId: value.subjectId,
            sectionId: value.sectionId,
            pageId: page.id
          })
        })

        remove('sections', id)

        pull('subjects', `${value.authorId}.${value.subjectId}`, 'Sections', value.sectionId).then(sectionList => {
          context.commit("section/subject/setSubjectParamSections", sectionList)
        })

      })



    },
  }
}

export default section