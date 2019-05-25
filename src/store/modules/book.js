const book = {
  state: {
    bookName: ''
  },
  mutations: {
    'SET_BOOKNAME': (state, bookName) => {
      state.bookName = bookName
    }
  },
  actions: {
    setBookName: ({ commit }, bookName) => {
      return commit('SET_BOOKNAME', bookName)
    }
  }
}

export default book
