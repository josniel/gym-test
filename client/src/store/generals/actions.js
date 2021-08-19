export function fetchAccessToken ({ commit }) {
  commit('updateAccessToken', JSON.parse(localStorage.getItem('SESSION_INFO')))
}
export function logout ({ commit }) {
  localStorage.removeItem('SESSION_INFO')
  commit('logout')
}
export async function saveUser ({ commit }) {
  await this._vm.$api.get('userInfoWithRole').then(v => {
    if (v) {
      // console.log(v)
      commit('dataUser', v[0])
    }
  })
}
