export default {
  setBookName: ({ commit }, bookName) => {
    return commit('SET_BOOKNAME', bookName)
  },
  setMenuVisible: ({ commit }, menuVisible) => {
    return commit('SET_MENUVISIBLE', menuVisible)
  }
}
