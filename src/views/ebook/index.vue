<template>
  <div class="ebook">
    <ebook-reader></ebook-reader>
  </div>
</template>

<script>
  import EbookReader from '../../components/ebook/EbookReader'
    export default {
        name: 'index.vue',
      components: {
          EbookReader
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
</style>
