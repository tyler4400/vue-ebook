<template>
  <div class="ebook-reader">
    <div id="read">
    </div>
  </div>
</template>

<script>
    import { ebookMixin } from '../../utils/mixin'
    import Epub from 'epubjs'
    global.ePub = Epub // 这行代码的含义是指在全局对象中添加一个epub属性，这个属性的值为Epub模块，这样做的目的是epubjs库中会直接从global中获取epub，如果不加会抛异常，在新版本的epubjs中已经修复这个问题了

    export default {
      mixins: [ebookMixin],
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
          this.rendition.on('touchstart', event => {
            this.touchStartX = event.changedTouches[0].clientX
            this.touchStartTime = event.timeStamp
          })
          this.rendition.on('touchend', event => {
            const offsetX = event.changedTouches[0].clientX - this.touchStartX
            const time = event.timeStamp - this.touchStartTime
          //  当touch间隔500ms以内，offsetX大于40的时候被识别为左滑右滑，其它被识别为点击
            if (time < 500 && offsetX > 40) {
              this.toRightEvent()
            } else if (time < 500 && offsetX < -40) {
              this.toLeftEvent()
            } else {
              this.clickEvent()
            }
            event.preventDefault()
            event.stopPropagation()
          })
        },
        toRightEvent () {
          this.prevPage()
          this.isShowTitleAndMenu(false)
        },
        toLeftEvent () {
          this.nextPage()
          this.isShowTitleAndMenu(false)
        },
        clickEvent () {
          this.toggleTitleAndMenu()
        },
        nextPage () {
          if (this.rendition) this.rendition.next()
        },
        prevPage () {
          if (this.rendition) this.rendition.prev()
        },
        toggleTitleAndMenu () {
          this.$store.dispatch('setMenuVisible', !this.menuVisible)
        },
        isShowTitleAndMenu (flag) {
          this.$store.dispatch('setMenuVisible', !!flag)
        }
      },
      mounted () {
          /* 1.获取书名参数 */
        const bookName = this.$route.params.bookName.split('|').join('/')
        /* 2.并记录在vuex中,然后初始化阅读器 */
        this.$store.dispatch('setBookName', bookName).then(() => {
            this.initEpub()
          })
      }
    }
</script>

<style scoped>

</style>
