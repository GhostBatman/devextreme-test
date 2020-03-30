import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVlODA2ZWI2NzAwMTRkNGMzMmRkZmIwZCIsImV4cCI6MTU4NjA4MTcyMX0.TFLdAwYDKNkKCuWc31CcosBq2Sstf7C_BGyfAdTaUVQ'
const adapter = axios.create({
  baseURL: 'https://xbi-dev.elastoo.com/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
})

export const store = () => new Vuex.Store({

  state: {
    baseData: [{
      name: 'line',
      id: '5e80afe684ffe8d196c2156f'
    }, {
      name: 'pie',
      id: '5e80afbc84ffe8d196c2156d'
    }],
    sources: []
  },
  getters: {
    sources({ sources }) {
      return sources
    }
  },
  mutations: {
    setData({ sources }, payload) {
      sources.push(payload)
    },
    deleteSources(state) {
      state.sources = []
    }
  },
  actions: {
    async PREPARE_DATA({ dispatch, state, commit }) {
      commit('deleteSources')
      for (const data of state.baseData) {
        await dispatch('GET_DATA', data)
      }
    },
    async GET_DATA({ commit }, { name, id }) {
      try {
        await adapter.get(`/api/datasource/${id}/data/`)
          .then(resp => {
            commit('setData', {
              name: name,
              data: resp.data
            })
          })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
  },
})

