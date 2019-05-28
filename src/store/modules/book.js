const book = {
  state: {
    bookName: '',
    menuVisible: false
  },
  mutations: {
    'SET_BOOKNAME': (state, bookName) => {
      state.bookName = bookName
    },
    'SET_MENUVISIBLE': (state, menuVisible) => {
      state.menuVisible = menuVisible
    }
  },
  actions: {
    setBookName: ({ commit }, bookName) => {
      return commit('SET_BOOKNAME', bookName)
    },
    setMenuVisible: ({ commit }, menuVisible) => {
      return commit('SET_MENUVISIBLE', menuVisible)
    }
  }
}

export default book
