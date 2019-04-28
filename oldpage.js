import { get, set, updatePublication, unshift, push, remove, pull, checkTitle } from '@/f'
import format from '@/format';

const page = {
  state: () => {
    return {
      oldTitle: "",
      pageParam: {
        Author: {},
        Comments: []
      },
    } 
  },

  mutations: {
    setPageParamRead(state, data) {
      state.pageParam.Read = data
    },

    setPageParam(state, data) {
      state.pageParam = data
    },

    setComments(state, data) {
      state.pageParam.Comments = data
    }
  },

  actions: {

    createUpdatedPage: async function(context, value) {
      var title // Prueba 12
      var id
      var i = 1
      var page = value.page
      const sectionId = `${value.authorId}.${value.subjectId}.${value.sectionId}`

      console.log(`${sectionId}.${page.id}`)
      if (await checkTitle('pages', `${sectionId}.${page.id}`)) {
        var matches = page.Title.match(/\d+$/); // ['12']
        console.log(matches)

        if (!matches) {
          page.Title = page.Title + ' 0'
          page.id = page.id + '_0'
          matches = page.Title.match(/\d+$/);
        }

        var i = parseInt(matches[0], 10); //12
        var istring = i.toString()
        console.log(istring)
        title = page.Title.substring(0, page.Title.length - istring.length) // Prueba 
        id = page.id.substring(0, page.id.length - istring.length)
        console.log(title)
        i++

        console.log(`${id}${i}`)
        while (await checkTitle('pages', `${sectionId}.${id}${i}`)) {
          i += 1
        }
        title = title + i
        id = id + i
  
      }

      else {
        title = page.Title
        id = page.id
      }

      console.log(title)
      page.Title = title
      page.id = id
      console.log(page)

      context.state.oldTitle = title
      return push('sections', sectionId, 'Pages', {
        AuthorName: page.Author.displayName,
        AuthorId: page.Author.id,
        Title: title,
        Type: page.Type,
        id: id,
        Read: 'public'
      }).then(() => {
        console.log('HERE')
        return set('pages', `${sectionId}.${id}`, page).then(() => {
          context.dispatch("page/section/fetchSectionParam", sectionId)
          return `${value.authorId}/${value.subjectId}/${value.sectionId}/${id}`
        })
      })
    },

    createPage: async function (context, value) {
      var i = 1
      var title = 'Nuevo '
      var id = 'nuevo_'
      var user = context.rootState.user.user

      while (await checkTitle('pages', `${value.id}.${id}${i}`)) {
        i += 1
      }

      return push('sections', value.id, 'Pages', {
        AuthorName: user.displayName,
        AuthorId: user.id,
        Title: title + i,
        Type: value.Type,
        id: id + i,
        Read: 'public'
      }).then(() => {
        
        return set('pages', `${value.id}.${id}${i}`, {
          Title: title + i,
          id: id + i,
          Type: value.Type,
          Read: 'public',
          Author: {
            displayName: user.displayName,
            id: user.id,
            photoURL: user.photoURL
          },
          Content: {
            Src: ""
          },
  
          Comments: []
        }).then(() => {
          return i
        })
      })


    },

    fetchPageParam: (context, id) => {

      context.dispatch("page/subject/fetchSubjectParam", id.idSubject)
      context.dispatch("page/section/fetchSectionParam", id.idSection)

      return get('pages', id.idPage).then(doc => {
        context.commit('setPageParam', doc.data())
        return doc.data()
      })
    },

    updatePageRead: (context, value) => {

      updatePublication('sections', value, ['Read'])

      var id = `${value.authorId}.${value.subjectId}.${value.sectionId}.${value.pageId}`
      set('pages', id, {
        Read: value.Read
      })

      context.commit('setPageParamRead', value.Read)
    },

    updatePage: (context, value) => {
      console.log(value.authorId)
      var id = `${value.authorId}.${value.subjectId}.${value.sectionId}.${value.page.id}`
      var oldTitle = context.state.oldTitle

      console.log(oldTitle)
      console.log(value.page.Title)
      if (oldTitle != value.page.Title) {
        context.dispatch("deletePage", {
          authorId: value.authorId,
          subjectId: value.subjectId,
          sectionId: value.sectionId,
          pageId: format(oldTitle)
        })
        return context.dispatch("createUpdatedPage", {
          authorId: value.authorId,
          subjectId: value.subjectId,
          sectionId: value.sectionId,
          page: value.page
        })
      }
      else {
        return set('pages', id, value.page).then(() => {
          return `${value.authorId}/${value.subjectId}/${value.sectionId}/${value.page.id}`
        })
      }
    },

    addPage: (context, value) => {
      var id = `${value.authorId}.${value.subjectId}.${value.sectionId}.${value.page.id}`
      get('pages', id).then((doc) => {

        if (!doc.data()) {
          set('pages', id, value.page)

          push('sections', `${value.authorId}.${value.subjectId}.${value.sectionId}`, 'Pages', {
            AuthorName: value.page.Author.displayName,
            AuthorId: value.page.Author.id,
            Title: value.page.Title,
            Type: value.page.Type,
            id: value.page.id,
            Read: value.page.Read
          }).then(pageList => {
            context.commit("page/section/setSectionPagesParam", pageList)
          })

        } else {
          context.state.errorPage = true
          setTimeout(() => {
            context.state.errorPage = false
          }, 4000)
        }
      })

    },

    deletePage: (context, value) => {
      var id = `${value.authorId}.${value.subjectId}.${value.sectionId}.${value.pageId}`

      remove('pages', id)

      pull('sections', `${value.authorId}.${value.subjectId}.${value.sectionId}`, 'Pages', value.pageId)

    },

    addComment: (context, value) => {
      console.log(value)
      unshift('pages', value.id, 'Comments', value.comment)
    },

  }
}