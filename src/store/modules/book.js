const book = {
  state: {
    bookName: '',
    menuVisible: false,
    settingVisible: -1, // -1隐藏，0字号，1主题，2进度，3目录
    defaultFontSize: 16
  },
  mutations: {
    'SET_BOOKNAME': (state, bookName) => {
      state.bookName = bookName
    },
    'SET_MENUVISIBLE': (state, menuVisible) => {
      state.menuVisible = menuVisible
    },
    'SET_SETTINGVISIBLE': (state, settingVisible) => {
      state.settingVisible = settingVisible
    },
    'SET_DEFAULTFONTSIZE': (state, defaultFontSize) => {
      state.defaultFontSize = defaultFontSize
    },
  }
}

export default book
