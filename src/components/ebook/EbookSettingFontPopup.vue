<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="menuVisible && fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">选择字体</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-item" v-for="(item, index) in fontFamilyList" :key="index" @click="setFontFamily(item.font)">
          <div class="ebook-popup-item-text" :class="{'selected': isSelected(item)}">{{item.fontName}}</div>
          <div class="ebook-popup-item-check" v-show="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import { FONT_FAMILY } from '../../utils/book'
  import { setFontFamily } from '../../utils/localStorage'
  export default {
    mixins: [ebookMixin],
    data () {
      return {
        fontFamilyList: FONT_FAMILY
      }
    },
    methods: {
      hide () {
        this.setFontFamilyVisible(false)
      },
      setFontFamily (fontFamily) {
        this.setDefaultFontFamily(fontFamily)
        setFontFamily(this.bookName, fontFamily)
        this.currentBook.rendition.themes.font(fontFamily)
      },
      isSelected (item) {
        return this.defaultFontFamily === item.font
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .ebook-popup-list{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 300;
    background: white;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .1);
    .ebook-popup-title{
      position: relative;
      padding: px2rem(15);
      box-sizing: border-box;
      border-bottom: px2rem(1) solid #b8b9bb;
      font-weight: bold;
      @include center;
      .ebook-popup-title-icon{
        position: absolute;
        left: px2rem(15);
        top: 0;
        height: 100%;
        font-size: px2rem(16);
        @include center;
      }
      .ebook-popup-title-text{
        font-size: px2rem(14);
      }
    }
    .ebook-popup-list-wrapper{
      .ebook-popup-item{
        display: flex;
        padding: px2rem(15);
        .ebook-popup-item-text{
          flex: 1;
          font-size: px2rem(14);
          text-align: left;
          &.selected{
            color: #346cb9;
            font-weight: bold;
          }
        }
        .ebook-popup-item-check{
          flex: 1;
          text-align: right;
          font-size: px2rem(14);
          color: #346cb9;
          font-weight: bold;
        }
      }
    }
  }
</style>
