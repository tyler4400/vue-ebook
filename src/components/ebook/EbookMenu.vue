<template>
  <div>
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow': isHideBoxShadow }" v-show="menuVisible">
        <div class="icon-wrapper" @click="toggleSetting(3)">
          <span class="icon-menu"></span>
        </div>
        <div class="icon-wrapper" @click="toggleSetting(2)">
          <span class="icon-progress"></span>
        </div>
        <div class="icon-wrapper" @click="toggleSetting(1)">
          <span class="icon-bright"></span>
        </div>
        <div class="icon-wrapper" @click="toggleSetting(0)">
          <span class="icon-A"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import EbookSettingFont from './EbookSettingFont'
  export default {
    mixins: [ebookMixin],
    computed: {
      isHideBoxShadow () {
        return (!this.menuVisible) || (this.settingVisible >= 0)
      }
    },
    components: {
      EbookSettingFont
    },
    methods: {
      toggleSetting (key) {
        this.settingVisible === key ? this.setSettingVisible(-1) : this.setSettingVisible(key)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(20);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(24);
      }
      .icon-bright {
        font-size: px2rem(22);
      }
    }
  }

</style>
