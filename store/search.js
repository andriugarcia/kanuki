import search from '@/search'

const searchModule = {
    state: () => {
      return {
        autocomplete: [],
        search: [],
        homePosts: [],
        rightbar: [],
        searchBar: false,
      }
    },

    mutations: {
        searchBarActivate: (state) => {
            state.searchBar = true
          },
          searchBarDisable: (state) => {
            state.searchBar = false
          },
        setAutocomplete(state, data) {
            state.autocomplete = data
        },

        setHomePosts(state, data) {
          state.homePosts = data
        },

        setRightBar(state, data) {
          state.rightbar = data
        },

        setSearch(state, data) {
            state.search = data
        },
    },

    actions: {
      fetchAutocomplete: (context, value) => {
          search.match(0, 8, 'Title', value, 'desc').then(function (body) {
            var hits = body.hits.hits;
            context.commit('setAutocomplete', hits)

          }, function (error) {
            // console.trace(error.message);
          });
        },

        fetchSearch: (context, data) => {
          console.log(data)
          return search.multimatch(0, 30, data.value, data.filter).then(function (body) {
            var hits = body.hits.hits;
            context.commit('setSearch', hits)

          }, function (error) {
            // console.trace(error.message);
          });
        },

        fetchHomePosts: (context, queries) => {

          if (queries != '') {
            search.multimatch(0, 30, queries, ['Title', 'Description', 'Tags', 'Id'])
              .then(function (body) {
                var hits = body.hits.hits;
                console.log("Hits", hits)
                context.commit('setHomePosts', hits)

              }, function (error) {
                // console.trace(error.message);
              });

          } else {
            search.def(0, 30, 'Saves', 'desc').then(function (body) {
              var hits = body.hits.hits;
              context.state.homePosts = hits
              console.log("Hits 2", hits)
            }, function (error) {
              // console.trace(error.message);
            });
          }
        },

        fetchRightBar: (context, queries) => {
          console.log("Rightbar TEST")
          search.multimatch(0, 8, queries, ['Title', 'Content.Description', 'Content.Tags', 'id'])
            .then(function (body) {
              var hits = body.hits.hits;
              console.log("Right Bar", hits)
              // hits.shift()
              context.commit('setRightBar', hits)

            }, function (error) {
              console.trace(error.message);
            });
        },
    }
}

export default searchModule