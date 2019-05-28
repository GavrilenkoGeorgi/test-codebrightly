import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    singleComment: {
      commentTitle: ``,
      commentBody: ``
    },
    allComments: []
  },
  getters: {
    getSingleComment (state) {
      return state.singleComment
    },
    getAllComments (state) {
      return state.allComments
    }
  },
  mutations: {
    showSingleComment (state, payload) {
      // add comment to display on 'read more' page
      Vue.set(state.singleComment = Object.assign(state.singleComment, payload))
    },
    setAllComments (state, payload) {
      // all comments from api
      Vue.set(state.allComments = Object.assign(state.allComments, payload))
    },
    deleteComment (state, id) {
      // delete single comment
      let elementPos = state.allComments.map(comment => comment.id).indexOf(id)
      Vue.set(state.allComments.splice(elementPos, 1))
    },
    sendComment (state, payload) {
      state.allComments.push(payload)
    },
    updateComment (state, payload) {
      let elementPos = state.allComments.map(comment => comment.id).indexOf(payload.id)
      // remove old comment from store
      Vue.set(state.allComments.splice(elementPos, 1),
      // and add an updated one
        state.allComments.push(payload))
    }
  },
  actions: {
    showSingleComment: async ({ commit }, id) => {
      axios
        .get(`https://${process.env.VUE_APP_COMMENTS_URL}/${id}`)
        .then(response => {
          if (response.status === 200) {
            let data = response.data
            let comment = {
              commentTitle: data.title,
              commentBody: data.body
            }
            commit(`showSingleComment`, comment)
          }
        })
        .catch(error => { console.log(error) })
    },
    setAllComments: async ({ commit }) => {
      axios
        .get(`https://${process.env.VUE_APP_COMMENTS_URL}`)
        .then(response => {
          if (response.status === 200) {
            commit(`setAllComments`, response.data)
          }
        })
        .catch(error => { console.log(error) })
    },
    deleteComment: async ({ commit }, id) => {
      axios
        .delete(`https://${process.env.VUE_APP_COMMENTS_URL}/${id}`)
        .then(response => {
          if (response.status === 200) {
            commit(`deleteComment`, id)
          }
        })
        .catch(error => { console.log(error) })
    },
    sendComment: async ({ commit }, payload) => {
      axios
        .post(`https://${process.env.VUE_APP_COMMENTS_URL}`, payload)
        .then(response => {
          if (response.status === 201) {
            commit(`sendComment`, response.data)
          }
        })
        .catch(error => { console.log(error) })
    },
    updateComment: async ({ commit }, payload) => {
      let newData = {
        created_at: payload.timestamp,
        title: payload.title,
        body: payload.body
      }
      axios
        .put(`https://${process.env.VUE_APP_COMMENTS_URL}/${payload.id}`, newData)
        .then(response => {
          if (response.status === 200) {
            commit(`updateComment`, response.data)
          }
        })
        .catch(error => { console.log(error) })
    }
  }
})
