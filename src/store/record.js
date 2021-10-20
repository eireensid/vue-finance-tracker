import { getDatabase, ref, push } from "firebase/database";

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
    }
  }
}