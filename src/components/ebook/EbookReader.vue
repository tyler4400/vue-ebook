<template>
  <div class="ebook-reader">
    <div id="read">
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Epub from 'epubjs'
    global.ePub = Epub // 这行代码的含义是指在全局对象中添加一个epub属性，这个属性的值为Epub模块，这样做的目的是epubjs库中会直接从global中获取epub，如果不加会抛异常，在新版本的epubjs中已经修复这个问题了

    export default {
      name: 'EbookReader',
      computed: {
        ...mapGetters(['bookName'])
      },
      methods: {
        initEpub () {
          const bookUrl = 'http://192.168.43.23:8021/epub/' + this.bookName + '.epub'
          this.book = new Epub(bookUrl)
          this.rendition = this.book.renderTo('read', {
            width: innerWidth,
            height: innerHeight,
            method: 'default'
          })
          this.rendition.display()
        }
      },
      mounted () {
          /* 1.获取书名参数 */
        const bookName = this.$route.params.bookName.split('|').join('/')
        /* 2.并记录在vuex中,然后初始化阅读器 */
        this.$store.dispatch('setBookName', bookName).then(() => {
            this.initEpub()
          })
      },
    }
</script>

<style scoped>

</style>
