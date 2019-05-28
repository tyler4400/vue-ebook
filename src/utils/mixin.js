import { mapGetters } from 'vuex'
export const ebookMixin = {
  computed: {
    ...mapGetters([
      'bookName',
      'menuVisible'
    ])
  }
}
