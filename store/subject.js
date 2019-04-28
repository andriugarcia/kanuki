import { get, set, remove, inc, updatePublication, unshift, pull } from '@/f'

const subject = {
  state: () => {
    return {
      subjectParam: {},
      publications: [],
      saved: [],
      contributions: [],
      subjects: [],
    }
  },

  mutations: {
    setPublications(state, data) {
      state.publications = data
    },

    setSaved(state, data) {
      state.saved = data
    },

    setContributions(state, data) {
      state.contributions = data
    },

    setSubjects(state, data) {
      state.subjects = data
    },

    setSubjectParam(state, data) {
      state.subjectParam = data
    },

    updateSubjectAdmins(state, data) {
      state.subjectParam.Admins = data
    },

    setSubjectParamRead(state, data) {
      state.subjectParam.Read = data
    },

    setSubjectParamSections(state, data) {
      state.subjectParam.Sections = data
    },
  },

  actions: {

    commitSubject: (context, data) => {
      var subject = data.data()

      context.commit('setSubjectParam', subject)

      // GET Admin Info
      if (subject) {

        context.dispatch("user/updateAdmin", subject, {root:true}) // Actualizamos admin

        if (context.rootState.user.user.id) {
          var downloaded = false
          context.rootState.user.user.saved.forEach(subjectSaved => {
            if (subject.id == subjectSaved.id) {
              downloaded = true
            }
          })

          context.rootState.downloaded = downloaded

        }
        const queries = subject.Title + " " + subject.Tags.join(" ")

        context.dispatch('search/fetchRightBar', queries, {root:true})

        // Adding visit
        inc('subjects', `${subject.Author.id}.${subject.id}`, 'Visits')


        return subject

      }

      return null

    },

    fetchSubjectParam: (context, id) => {
      return get('subjects', id).then(subject => {
        return context.dispatch('commitSubject', subject)
      }).catch(() => {
        return context.commit('setSubjectParam', {
          Title: 'Materia no encontrada',
          id: 'notFound',
          Admins: {},
          Author: {},
          Color: 'grey',
          Description: 'La materia que buscas es privada o no existe',
          Locale: '',
          Read: 'public',
          Saves: 0,
          Sections: [],
          Tags: [],
          Visits: 0,
          createdAt: ''
        })
      })

    },

    updateSubject: (context, value) => {

      updatePublication('users', value, ['Color', 'Description'])

      set('subjects', `${value.authorId}.${value.subjectId}`, {
        Color: value.Color,
        Tags: value.Tags,
        Description: value.Description
      })


      context.state.subjectParam.Color = value.Color
      context.state.subjectParam.Tags = value.Tags
      context.state.subjectParam.Description = value.Description
    },

    updateSubjectParamSections: (context, value) => {
      set('subjects', value.id, {
        Sections: value.array
      })

      context.commit('setSubjectParamSections', value.array)
    },

    updateSubjectRead: (context, value) => {

      updatePublication('users', value, ['Read'])

      set('subjects', `${value.authorId}.${value.subjectId}`, {
        Read: value.Read
      })


      context.commit('setSubjectParamRead', value.value)
    },

    addSubject: (context, value) => {

      get('subjects', `${value.Author.id}.${value.id}`).then((doc) => {

        if (!doc.data()) {

          set('subjects', `${value.Author.id}.${value.id}`, value)

          unshift('users', `${value.Author.id}`, 'publications', {
            AuthorId: value.Author.id,
            AuthorName: value.Author.displayName,
            Color: value.Color,
            Description: value.Description,
            PhotoURL: value.Author.photoURL,
            Read: value.Read,
            Title: value.Title,
            createdAt: value.createdAt,
            id: value.id,
          })
        } else {
          context.state.errorSubject = true

          setTimeout(() => {
            context.state.errorSubject = false
          }, 4000)
        }
      })


    },

    addSaved: (context, value) => {

      unshift('users', value.userId, 'saved', value.value)

      inc('subjects', `${value.value.AuthorId}.${value.value.id}`, 'Saves')

    },

    pullSaved: (context, value) => {

      pull('users', value.userId, 'saved', value.id)

    },

    deleteSubject: (context, value) => {

      var sections

      get('subjects', `${value.authorId}.${value.subjectId}`).then(doc => {
        sections = doc.data().Sections

        sections.forEach(section => {
          context.dispatch('section/deleteSection', {
            authorId: value.authorId,
            subjectId: value.subjectId,
            sectionId: section.id
          }, {root: true})

        })

        remove('subjects', `${value.authorId}.${value.subjectId}`)

        pull('users', value.authorId, 'publications', value.subjectId, value.id)

      })

    },

    deleteSubjectParamSections: (context, value) => {
      value.array.forEach(id => {
        context.dispatch('section/deleteSection', {
          authorId: value.authorId,
          subjectId: value.subjectId,
          sectionId: id
        }, {root: true})
      })
    },

    deleteSubjectParamPages: (context, value) => {
      value.array.forEach(id => {
        context.dispatch('page/deletePage', {
          authorId: value.authorId,
          subjectId: value.subjectId,
          sectionId: value.sectionId,
          pageId: id
        }, {root: true})
      })
    },
  }
}

export default subject