import { mapGetters, mapActions } from 'vuex'
export const ebookMixin = {
  computed: {
    ...mapGetters([
      'bookName',
      'menuVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setMenuVisible',
      'setBookName'
    ])
  }
}
