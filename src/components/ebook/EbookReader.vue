<template>
  <div class="ebook-reader">
    <div id="read">
    </div>
  </div>
</template>

<script>
    import { ebookMixin } from '../../utils/mixin'
    import Epub from 'epubjs'
    import {
      setFontFamily,
      getFontFamily,
      setFontSize,
      getFontSize,
      getTheme,
      setTheme,
      getLocation
    } from '../../utils/localStorage'

    global.ePub = Epub // 这行代码的含义是指在全局对象中添加一个epub属性，这个属性的值为Epub模块，这样做的目的是epubjs库中会直接从global中获取epub，如果不加会抛异常，在新版本的epubjs中已经修复这个问题了

    export default {
      mixins: [ebookMixin],
      methods: {
        initEpub () {
          // 通过书资源地址初始化阅读器对象
          const bookUrl = process.env.VUE_APP_RES_URL + '/epub/' + this.bookName + '.epub'
          this.book = new Epub(bookUrl)
          this.setCurrentBook(this.book)
          this.initRendition()
          this.initGesture()
          this.book.ready.then(() => { // 当book全部被解析完成之后会调用ready
            return this.book.locations.generate(this.getPages())
          }).then(locations => {
            // console.log(locations)
            // 此时就可以认为book资源已经可用，意味着可以获取书的所有信息
            this.setBookAvailable(true)
            this.refreshLocation()
          })
        },
        initRendition () {
          this.rendition = this.book.renderTo('read', {
            width: innerWidth,
            height: innerHeight,
            method: 'default'
          })
          // 初始化一些设置数据
          const location = getLocation(this.bookName)
          this.display(location, () => {
            this.initTheme()
            this.initFontSize()
            this.initFontFamily()
            this.setGlobalStyle()
          })
          // 注册字体
          this.rendition.hooks.content.register(contents => {
            Promise.all([
              contents.addStylesheet(process.env.VUE_APP_RES_URL + '/fonts/daysOne.css'),
              contents.addStylesheet(process.env.VUE_APP_RES_URL + '/fonts/cabin.css'),
              contents.addStylesheet(process.env.VUE_APP_RES_URL + '/fonts/montserrat.css'),
              contents.addStylesheet(process.env.VUE_APP_RES_URL + '/fonts/tangerine.css')
            ]).then(() => {
              console.log('字体全部加载完毕')
            })
          })
        },
        initGesture () {
          // 判定用户手势行为
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
        initFontSize () {
          let fontSize = getFontSize(this.bookName)
          if (fontSize) {
            this.rendition.themes.fontSize(fontSize)
            this.setDefaultFontSize(fontSize)
          } else {
            setFontSize(this.bookName, this.fontSize)
          }
        },
        initFontFamily () {
          let font = getFontFamily(this.bookName)
          if (font) {
            this.rendition.themes.font(font)
            this.setDefaultFontFamily(font)
          } else {
            setFontFamily(this.bookName, this.defaultFontFamily)
          }
        },
        initTheme () {
          let theme = getTheme(this.bookName)
          this.themeList.forEach(theme => {
            this.rendition.themes.register(theme.name, theme.style)
          })
          if (theme) {
            this.setDefaultTheme(theme).then(() => {
              this.rendition.themes.select(this.defaultTheme)
            })
          } else {
            setTheme(this.bookName, this.defaultTheme)
            this.rendition.themes.select(this.defaultTheme)
          }
        },
        toRightEvent () {
          this.prevPage()
          this.hideTitleAndMenu()
        },
        toLeftEvent () {
          this.nextPage()
          this.hideTitleAndMenu()
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
          if (!this.menuVisible) this.initMenuParams() // 在menu被关掉时它的一些变量并没有被重置，所以每次打开menu的时候需要初始化一下menu的变量
          this.setMenuVisible(!this.menuVisible)// 等于this.$store.dispatch('setMenuVisible', !this.menuVisible)
        },
        hideTitleAndMenu () {
          this.setMenuVisible(false)
        },
        initMenuParams () {
          this.setSettingVisible(-1)
          this.setFontFamilyVisible(false)
        },
        getPages () {
          // 首先这个不精确。认为每页750个字，然后根据屏幕宽度和字体进行微调。除以每页字数就是分页情况
          return 750 * (window.innerWidth / 375) * (getFontSize(this.bookName) / 16)
        }
      },
      mounted () {
          /* 1.获取书名参数 */
        const bookName = this.$route.params.bookName.split('|').join('/')
        /* 2.并记录在vuex中,然后初始化阅读器 */
        this.setBookName(bookName).then(() => {
            this.initEpub()
          })
      }
    }
</script>

<style scoped>

</style>
