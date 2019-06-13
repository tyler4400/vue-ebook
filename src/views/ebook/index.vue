<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
  import EbookReader from '../../components/ebook/EbookReader'
  import EbookTitle from '../../components/ebook/EbookTitle'
  import EbookMenu from '../../components/ebook/EbookMenu'
  import { ebookMixin } from '../../utils/mixin'
  import { getReadTime, setReadTime } from '../../utils/localStorage'

  export default {
    mixins: [ebookMixin],
    components: {
      EbookReader,
      EbookTitle,
      EbookMenu
    },
    methods: {
      startLoopReadTime () {
        let readTime = getReadTime(this.bookName)
        if (!readTime) readTime = 0
        this.task = setInterval(() => {
          readTime++
          if (readTime % 30 === 0) setReadTime(this.bookName, readTime)
        }, 1000)
      }
    },
    mounted () {
      this.startLoopReadTime()
    },
    beforeDestroy () {
      if (this.task) clearInterval(this.task)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
</style>
