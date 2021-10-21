import { getDatabase, ref, push, onValue } from "firebase/database";

export default {
  actions: {
    async createRecord({commit, dispatch}, record) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase();
        return await push(ref(db, `/users/${uid}/records`), record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({dispatch, commit}) {
      return new Promise(async (resolve, reject) => {
        try {
          const uid = await dispatch('getUid')
          const db = getDatabase();
          onValue(ref(db, `/users/${uid}/records`), (snapshot) => {
            const records = snapshot.val() || {}
            resolve(Object.keys(records).map(key => ({...records[key], id: key})))
          }, {
            onlyOnce: true
          });
          
        } catch (e) {
          commit('setError', e)
          reject(e)
        }
      })
    },
    async fetchRecordById({dispatch, commit}, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const uid = await dispatch('getUid')
          const db = getDatabase();
          onValue(ref(db, `/users/${uid}/records/${id}`), (snapshot) => {
            const record = snapshot.val() || {}
            resolve({...record, id})
          }, {
            onlyOnce: true
          });
          
        } catch (e) {
          commit('setError', e)
          reject(e)
        }
      })
    }
  }
}