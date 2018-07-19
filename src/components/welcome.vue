<template>
  <div class="welcome">
    <div class="top">
      <img src="/src/assets/images/enter_top.png" class="img-responsive">
    </div>
    <div class="middle">
      <img src="/src/assets/images/enter_middle.png">
    </div>
    <div class="bottom">
      <div class="bimg1"></div>
      <div class="bimg2"></div>
      <div class="bimg3"></div>
    </div>
  </div>
</template>
<script>
  export default {
    mounted() {
      setTimeout(() => {
        this.$router.push('/home');
      }, 2000)
    }
  }
</script>
<style scoped lang="scss">
  .welcome {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: -webkit-linear-gradient(bottom, rgba(121, 190, 83, 1), rgba(121, 190, 83, .1)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom, rgba(121, 190, 83, 1), rgba(121, 190, 83, .1)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom, rgba(121, 190, 83, 1), rgba(121, 190, 83, .1)); /* Firefox 3.6 - 15 */
    background: linear-gradient(bottom, rgba(121, 190, 83, 1), rgba(121, 190, 83, .1)); /* 标准的语法 */
    img {
      max-height: 200px;
    }
    .middle {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      margin-top: -50px;
      text-align: center;
      img {
        width: 200px;
      }
    }
    .bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 200px;
      overflow: hidden;
      .bimg1 {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 150px;
        background: url('/src/assets/images/enter_bottom1.png') bottom repeat-x;
        background-size: contain;
        z-index: 9;
      }
      .bimg2 {
        position: absolute;
        bottom: -10px;
        left: 0;
        right: 0;
        height: 200px;
        background: url('/src/assets/images/enter_bottom2.png') right bottom repeat-x;
        background-size: contain;
        z-index: 8;
      }
      .bimg3 {
        position: absolute;
        bottom: -12px;
        left: 0;
        right: 24px;
        height: 200px;
        background: url('/src/assets/images/enter_bottom3.png') right bottom repeat-x;
        background-size: contain;
        z-index: 7;
      }
      @keyframes welcome
      {
      from {
        left: 0;
      }
      to {
        left: 100%;
      }
      }

      @-moz-keyframes welcome /* Firefox */
      {
      from {
        left: 0;
      }
      to {
        left: 100%;
      }
      }

      @-webkit-keyframes welcome /* Safari 和 Chrome */
      {
      from {
        left: 0;
      }
      to {
        left: 100%;
      }
      }

      @-o-keyframes welcome /* Opera */
      {
      from {
        left: 0;
      }
      to {
        left: 100%;
      }
      }
    }
  }
</style>
