import { get, set, editElement, unshift, push, remove, pull, checkTitle } from '@/f'
import format from '@/format';
import { getPathArray } from '@/tools'
import db from '@/db'

const page = {
    state: () => {
        return {
            oldTitle: "",
            deleteElementList: [],
            pageParam: {},
            edit: false,
            subjectParam: {},
            father: {}
        }
    },

    mutations: {
        SetPageParamRead(state, data) {
            state.pageParam.Read = data
        },

        setEditFalse(state) {
            state.edit = false
        },

        setEditTrue(state) {
            state.edit = true
        },

        setPage(state, data) {
            state.pageParam = data
        },

        setSubjectParam(state, data) {
            state.subjectParam = data
        },

        setFather(state, data) {
            state.father = data
        },

        setComments(state, data) {
            state.pageParam.Comments = data
        },

        setOldTitle(state, data) {
            state.oldTitle = data
        },

        setDeleteElementList(state, data) {
            state.deleteElementList = data
        }
    },

    actions: {

        getPageSnapshot: function (context, id) {
            return db.collection('pages').doc(id)
                .onSnapshot((doc) => {
                    context.commit('setPage', doc.data())
                })
        },

        getPage: async function (context, path) {
            let subject
            let father
            let page
        
            // path: user/subject/page1/page2

            const array = getPathArray(path)

            //array: [user, subject, page1, page2]
            
            var id = path.replace(new RegExp('/', 'g'), '.');  
            id = (id[id.length - 1] == '.') ? id.substr(0, id.length - 1) : id
            //id: user.subject.page1.page2
            
            page = await get('pages', id)

            if (!page.exists) {
                page = {
                    Title: "No encontrado",
                    Type: "NotFound",
                    id,
                    Content: {
                        Description: "La materia que has buscado no existe o es privada"
                    }
                }
            }

            else {page = page.data()}

            if (page.Type == 'subject') {
                subject = page
                father = {}
            }

            else {
                const idFather = array.slice(0, array.length - 1).join('.')
                father = await context.dispatch('getFather', idFather)

                if (father.Type == 'subject') {
                    subject = father
                }

                else {
                    subject = await context.dispatch('getSubject', `${array[0]}.${array[1]}`)
                }
    
            }

            context.commit('setOldTitle', page.Title)
        

            let ret = {
                subject, father, page
            }

            return ret

        },

        getSubject: function (context, id) {
            return get('pages', id).then(function(doc) {
                context.commit('setSubjectParam', doc.data())
                return doc.data()
            })
        },

        getFather: function (context, id) {
            return get('pages', id).then(function(doc) {
                context.commit('setFather', doc.data())
                return doc.data()
            })
        },

        updatePageRead: (context, value) => {
            var id = `${value.idFather}.${value.id}`

            if (value.Type != 'subject') {
                editElement(value.idFather, value.id, 'Read', value.Read)
            }

            set('pages', id, {
                Read: value.Read
            })
        },

        sendComment: (context, value) => {
            unshift('pages', value.id, 'Comments', value.Comment)
        },
        
        updatePage: (context, value) => {
            console.log(value.authorId)
            var oldTitle = context.state.oldTitle


            if (oldTitle != value.page.Title) {
                context.dispatch("deleteElements", {
                    arrayIndex: [format(oldTitle)],
                    idFather: value.idFather
                })

                return context.dispatch("createUpdatedPage", {
                    idFather: value.idFather,
                    page: value.page
                })
            } else {
                return set('pages', `${value.idFather}.${value.page.id}`, value.page).then(() => {
                    return `${value.idFather.replace(/\./g, '/')}/${value.page.id}`
                })
            }
        },

        setAdmin: function (context, data) {
            const userId = context.rootState.user.user.id

            if (userId == data.subject.Author.id || userId == data.page.Author.Id ||
                data.subject.Admins[userId] == true) {
                return true
            }

            return false

            
        },

        createUpdatedPage: async function (context, value) {
            var title // Prueba 12
            var id
            var i = 1
            var page = value.page

            console.log(`${value.idFather}.${page.id}`)
            if (await checkTitle('pages', `${value.idFather}.${page.id}`)) {
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
                while (await checkTitle('pages', `${value.idFather}.${id}${i}`)) {
                    i += 1
                }
                title = title + i
                id = id + i

            } else {
                title = page.Title
                id = page.id
            }

            console.log(title)
            page.Title = title
            page.id = id
            console.log(page)

            context.commit('setOldTitle', title)
            
            return push('pages', value.idFather, 'Elements', {
                AuthorName: page.Author.displayName,
                AuthorId: page.Author.id,
                Title: title,
                Type: page.Type,
                id: id,
                Read: 'public'
            }).then(() => {
                console.log('HERE')
                return set('pages', `${value.idFather}.${id}`, page).then(() => {
                    return `${value.idFather.replace(/\./g, '/')}/${id}`
                })
            })
        },

        addSubject: (context, subject) => {
            get('pages', `${subject.Author.id}.${subject.id}`).then((doc) => {
                if (!doc.data()) {
                    set('pages', `${subject.Author.id}.${subject.id}`, subject)

                    unshift('users', `${subject.Author.id}`, 'publications', {
                        AuthorId: subject.Author.id,
                        AuthorName: subject.Author.displayName,
                        Color: subject.Content.Color,
                        Description: subject.Content.Description,
                        PhotoURL: subject.Author.photoURL,
                        Type: subject.Type,
                        Read: subject.Read,
                        Title: subject.Title,
                        createdAt: subject.createdAt,
                        id: subject.id,
                    })
                } else {
                    context.state.errorSubject = true

                    setTimeout(() => {
                        context.state.errorSubject = false
                    }, 4000)
                }
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

            return push('pages', value.id, 'Elements', {
                AuthorName: user.displayName,
                AuthorId: user.id,
                Title: title + i,
                Type: value.Type,
                id: id + i,
                Read: 'public'
            }).then(() => {
                const url = `${value.id}/${id}${i}`
                return set('pages', `${value.id}.${id}${i}`, {
                    Title: title + i,
                    id: id + i,
                    url: url.replace(/\./g, '/'),
                    Type: value.Type,
                    Read: 'public',
                    Author: {
                        displayName: user.displayName,
                        id: user.id,
                        photoURL: user.photoURL
                    },
                    Content: {
                        Elements: []
                    },

                    Comments: []
                }).then(() => {
                    return i
                })
            })


        },

        deleteElements: async function(context, value) {
            console.log(value)
            return await value.arrayIndex.forEach(async function(id) {
                await remove('pages', `${value.idFather}.${id}`)
                await pull('pages', value.idFather, 'Elements', id)
            })
        },

    }
}

export default page