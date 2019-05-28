import { mapGetters, mapActions } from 'vuex'
export const ebookMixin = {
  computed: {
    ...mapGetters([
      'bookName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
    ])
  },
  methods: {
    ...mapActions([
      'setMenuVisible',
      'setBookName',
      'setSettingVisible',
      'setDefaultFontSize',
    ])
  }
}
