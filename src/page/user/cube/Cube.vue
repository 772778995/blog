<template>
  <!--/*外层最大容器*/-->
  <div class="wrap">
    <div class="cube">
      <!--前面图片 -->
      <div class="out_front">
        <img src="../../../assets/img/html.png"  class="pic"/>
      </div>
      <!--后面图片 -->
      <div class="out_back">
        <img src="../../../assets/img/css.png"  class="pic"/>
      </div>
      <!--左图片 -->
      <div class="out_left">
        <img src="../../../assets/img/js.png"  class="pic"/>
      </div>
      <div class="out_right">
        <img src="../../../assets/img/node.png"  class="pic"/>
      </div>
      <div class="out_top">
        <img src="../../../assets/img/typescript.png"  class="pic"/>
      </div>
      <div class="out_bottom">
        <img src="../../../assets/img/react.png"  class="pic"/>
      </div>
      <!--小正方体 -->
      <span class="in_front">
        <img src="../../../assets/img/java.png" class="in_pic" />
      </span>
      <span class="in_back">
           <img src="../../../assets/img/mysql.png" class="in_pic" />
      </span>
      <span class="in_left">
        <img src="../../../assets/img/php.png" class="in_pic" />
      </span>
      <span class="in_right">
        <img src="../../../assets/img/vue.png" class="in_pic" />
      </span>
      <span class="in_top">
        <img src="../../../assets/img/webpack.png" class="in_pic" />
      </span>
      <span class="in_bottom">
        <img src="../../../assets/img/wx.png" class="in_pic" />
      </span>
    </div>
  </div>
</template>

<script>
import '../../../assets/css/user.css'
export default {
  name: 'Cube'
}
</script>

<style>
</style>
