import { getDatabase, ref, onValue, update } from "firebase/database";

export default {
  state: {
    info: {}
  },
  getters: {
    info: s => s.info
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase();
        onValue(ref(db, `/users/${uid}/info`), (snapshot) => {
          const info = snapshot.val()
          commit('setInfo', info)
        }, {
          onlyOnce: true
        });
        
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateInfo({dispatch, commit, getters}, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase();
        const updateData = {...getters.info, ...toUpdate}
        await update(ref(db, `/users/${uid}/info`), updateData)
        commit('setInfo', updateData)     
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}