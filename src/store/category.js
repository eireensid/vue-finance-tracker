import { getDatabase, ref, push, onValue, update, remove } from "firebase/database";

export default {
  actions: {
    async createCategory({commit, dispatch}, {title, limit}) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase();
        const category = await push(ref(db, `/users/${uid}/categories`), {title, limit})
        return {title, limit, id: category.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({commit, dispatch}, {title, limit, id}) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase();
        await update(ref(db, `/users/${uid}/categories/${id}`), {title, limit})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteCategory({commit, dispatch}, id) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase();
        await remove(ref(db, `/users/${uid}/categories/${id}`))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    fetchCategories({dispatch, commit}) {
      return new Promise(async (resolve, reject) => {
        try {
          const uid = await dispatch('getUid')
          const db = getDatabase();
          onValue(ref(db, `/users/${uid}/categories`), (snapshot) => {
            const categories = snapshot.val() || {}
            resolve(Object.keys(categories).map(key => ({...categories[key], id: key})))
          }, {
            onlyOnce: true
          });
          
        } catch (e) {
          commit('setError', e)
          reject(e)
        }
      })
    },
    fetchCategoryById({dispatch, commit}, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const uid = await dispatch('getUid')
          const db = getDatabase();
          onValue(ref(db, `/users/${uid}/categories/${id}`), (snapshot) => {
            const category = snapshot.val() || {}
            resolve({...category, id})
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