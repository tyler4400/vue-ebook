<template>
  <transition name="popup-slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTimeText()}}</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="prevSection()">
            <span class="icon-back"></span>
          </div>
          <input class="progress" type="range"
                 max="100"
                 min="0"
                 step="1"
                 @change="onProgressChange($event.target.value)"
                 @input="onProgressInput($event.target.value)"
                 :value="progress"
                 :disabled="!bookAvailable"
                 ref="progress">
          <div class="progress-icon-wrapper" @click="nextSection()">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>({{showProgress}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { ebookMixin } from '../../utils/mixin'
  export default {
    mixins: [ebookMixin],
    computed: {
      showProgress () {
        return this.bookAvailable ? this.progress + '%' : '加载中...'
      },
      getSectionName () {
        if (!this.section) return ''
        const sectionInfo = this.currentBook.section(this.section)
        if (sectionInfo && sectionInfo.href) {
          return this.currentBook.navigation.get(sectionInfo.href).label
        } else {
          return ''
        }
      }
    },
    methods: {
      onProgressChange (progress) {
        this.setProgress(progress).then(() => {
          this.applyProgress()
        })
      },
      onProgressInput (progress) {
        this.setProgress(progress).then(() => {
        // 实时更新进度条和页面内容，耗费计算，可根据实际业务需求来判断是否需要。
          // this.applyProgress()
        })
      },
      getReadTimeText () {

      },
      applyProgress () {
        const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
        this.currentBook.rendition.display(cfi)
        this.display(cfi)
        this.updateProgressBg() // 设置进度条已读的颜色
      },
      updateProgressBg () {
        this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
      },
      nextSection () {
        if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
          this.setSection(this.section + 1).then(() => {
            this.displaySection()
          })
        }
      },
      prevSection () {
        if (this.section > 0 && this.bookAvailable) {
          this.setSection(this.section - 1).then(() => {
            this.displaySection()
          })
        }
      },
      displaySection () {
        const sectionInfo = this.currentBook.section(this.section)
        if (sectionInfo && sectionInfo.href) {
          this.display(sectionInfo.href)
        }
      }

    },
    updated () {
      this.updateProgressBg()
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 101;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: px2rem(40);
        font-size: px2rem(12);
        @include center;
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .progress-icon-wrapper {
          font-size: px2rem(20);
        }
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          margin: 0 px2rem(10);
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: white;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
            border: px2rem(1) solid #ddd;
          }
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(10);
        width: 100%;
        color: #333;
        font-size: px2rem(12);
        padding: 0 px2rem(15);
        box-sizing: border-box;
        @include center;
        .progress-section-text {
          @include ellipsis;
        }
      }
    }
  }
</style>
