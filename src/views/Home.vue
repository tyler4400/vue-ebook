<template>
  <div class="home">
    <span class="icon-bookmark"></span>
    <span class="icon-cart"></span>
    <span class="text">a dog jump into the fence without a bark</span>
    <p class="text">ABCDEFGHI</p>
  </div>
</template>

<script>
// @ is an alias to /src
import Epub from 'epubjs'
global.ePub = Epub

export default {

}
</script>

<style lang="scss" scoped>
  @import ".././assets/styles/global";
  .icon-cart{
    font-size: 1rem;
    color: red;
  }
  .text{
    font-family: 'Days One',serif;
    font-size: px2rem(24);
    color: #ff6b00;
  }
</style>
