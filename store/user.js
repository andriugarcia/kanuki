import firebase from '@/firebase'
import format from '@/format'
import db from '@/db'

import {
  get,
  set,
  where
} from '@/f'

const user = {
  state: () => 
 {
  return  {
      boom: false,
      user: {},
      admin: "",
      userParam: {
        user: {},
        publications: [],
        contributions: []
      }
    }
  },

  mutations: {
    changeBoom(state, data) {
      state.boom = data
    },
    setUser(state, data) {
      state.user = data
    },

    setUserParam(state, data) {
      state.userParam = data
    },

    setAdmin(state, data) {
      state.admin = data
    }
  },

  getters: {
    getUser: (state) => {
      return state.user
    }
  },

  actions: {
    sendEmail: (context, email) => {
      db.collection('global').doc(email).set({})
    },

    getBoom: (context) => {
      db.collection('global').doc('boom').onSnapshot((doc) => {
        const boom = doc.data()
        context.commit('changeBoom', boom.activate)
        return boom.activate
      })
    },
    setBoom: (context, boom) => {
      db.collection('global').doc('boom').set({
        activate: boom == 'true' ? true : false 
      })
    
    },

    updateAdmin: (context, subject) => {

      const userId = context.rootState.user.user.id
      if (subject.Admins[userId]) {
        context.commit('setAdmin', 'super')
        if (subject.Read == 'admins') {
          context.commit('subject/setSubjectParam', subject)
        }
      }
      else {
        context.commit('setAdmin', 'admin')
      }

    },

    getCurrentUser: (context) => {

      firebase.auth().onAuthStateChanged(function (authUser) {
        if (authUser) {
          var docRef = where('users', 'email', '==', authUser.email)

          // Obtiene el usuario de la base de datos
          docRef.onSnapshot(function (doc) {

            if (!doc.docs[0]) {
              context.state.errorAlert = "El usuario no existe"

              setTimeout(() => {
                context.state.errorAlert = ""
              }, 10000)

              return
            }

            //Lo guarda en vuex
            context.commit('setUser', {
              displayName: doc.docs[0].data().displayName,
              id: doc.docs[0].data().id,
              email: doc.docs[0].data().email,
              photoURL: doc.docs[0].data().photoURL,
              publications: doc.docs[0].data().publications,
              notifications: doc.docs[0].data().notifications,
              saved: doc.docs[0].data().saved,
              contributions: doc.docs[0].data().contributions,
              historical: doc.docs[0].data().historical
            })

            const saved = doc.docs[0].data().saved
            const publications = doc.docs[0].data().publications
            const contributions = doc.docs[0].data().contributions

            var queries = " "

            saved.forEach(save => {
              queries = `${queries} ${save.Title}`
            })

            publications.forEach(save => {
              queries = `${queries} ${save.Title}`
            })

            contributions.forEach(save => {
              queries = `${queries} ${save.Title}`
            })

            context.dispatch("search/fetchHomePosts", queries, {root:true})
            context.commit("subject/setPublications", publications, {root:true}) // se puede reemplazar por publications
            context.commit("subject/setSaved", saved, {root:true}) // se puede cambiar por saved
            context.commit("subject/setContributions", contributions, {root:true}) // se puede cambiar por contributions

            // Comprobamos a tiempo real si somos admin
            var subject = context.rootState.subject.subjectParam
            if (!subject.id) return
          })

        } else {
          context.commit('setUser', {})
          context.dispatch("search/fetchHomePosts", '', {root:true})
          context.commit('setAdmin', "")
          context.commit('setUser', {})
          context.commit('subject/setPublications', [], {root:true})
          context.commit('subject/setSaved', [], {root:true})
          context.commit('subject/setContributions', [], {root:true})
        }
      })
    },

    logout: () => {
      firebase.auth().signOut()
    },

    auth: (context) => {
      context.state.errorAlert = ""
      var provider = new firebase.auth.GoogleAuthProvider()

      provider.addScope('email')

      // Realiza la autentificacón
      return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        return firebase.auth().signInWithPopup(provider).then(function (result) {
          return result
        }).catch(() => {
          console.assert("No se ha podido inicar sesión")
        })
      }).catch(function () {
        console.assert("No se ha podido iniciar sesión")
      })
    },

    register: (context, username) => {
      var provider = new firebase.auth.GoogleAuthProvider()

      provider.addScope('email')

      // Realiza la autentificacón
      return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        return firebase.auth().signInWithPopup(provider).then(function (result) {

          // Si no existe, lo crea y lo guarda en vuex

          set('users', format(username), {
              displayName: username,
              email: result.user.email,
              id: format(username),
              photoURL: result.user.photoURL,
              publications: [],
              notifications: [],
              saved: [],
              contributions: [],
              historical: []
            })
            .then(function () {
              context.commit('setUser', {
                displayName: username,
                id: format(username),
                email: result.user.email,
                photoURL: result.user.photoURL,
                publications: result.user.publications,
                notifications: result.user.notifications,
                saved: result.user.saved,
                contributions: result.user.contributions,
                historical: result.user.historical
              })

            })

        })
      })

    },

    fetchUserParam: (context, id) => {

      return get('users', id).then(doc => {
        return doc.data()
      })

    },

    addAdmin: (context, value) => {

      //Actualizamos la lista de admins
      push('subjects', value.id, 'Admins', value.value).then(adminList => {
        context.commit('user/subject/updateSubjectAdmins', adminList)
      })


      //Actualizamos la lista de contribuciones
      push('users', value.value.id, 'contributions', {
        AuthorId: subject.Author.id,
        AuthorName: subject.Author.displayName,
        Color: subject.Color,
        Description: subject.Description,
        PhotoURL: subject.Author.photoURL,
        Read: subject.Read,
        Title: subject.Title,
        id: subject.id
      })

    },

    deleteAdmin: (context, value) => {

      pull('subjects', `${value.authorId}.${value.subjectId}`, 'Admins', value.admin).then(adminList => {
        context.commit('user/subject/updateSubjectAdmins', adminList)
      })

      pull('users', value.admin.id, 'contributions', subject.id)

    },
  }
}

export default user