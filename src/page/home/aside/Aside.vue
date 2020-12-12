<template>
  <div>
    <Bg class="bg" v-show="!collapse"/>
    <!-- 侧边栏 -->
    <el-aside :width="collapse ? '64px' : '200px'">
      <div class="open-aside" @click="collapse = !collapse">|||</div>
      <el-menu
        :default-active="activePath"
        :collapse-transition = "false"
        :collapse = "collapse"
        unique-opened
        background-color = "#23508a"
        text-color = "#fff"
        router
        active-text-color = "#ffff00">
        <!-- 一级菜单 -->
        <el-submenu
          v-for = "item in asideData"
          :index = "'LV'+item.id"
          :key = "item.id">
          <template slot = "title">
            <i class = "el-icon-s-grid"></i>
            <span>{{item.title}}</span>
          </template>
          <!-- 二级菜单 -->
          <el-submenu
            v-for = "item2 in item.children"
            :index = "'lv'+item2.id"
            :key = "item2.id">
            <template slot = "title">
              <i class = "el-icon-menu"></i>
              {{item2.title}}
            </template>
            <!-- 三级菜单 -->
            <el-menu-item
            v-for = "item3 in item2.children"
            :index = "'/article/'+item3.id"
            :key = "item3.id">
              <i class="el-icon-tickets"></i>
              {{item3.title}}
            </el-menu-item>
          </el-submenu>
        </el-submenu>

        <!-- 编辑内容 -->
        <el-menu-item index="/article/add">
          <i class = "el-icon-edit"></i>
          <span slot="title">编辑内容</span>
        </el-menu-item>

      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Bg from './bg/Bg.vue'
export default {
  name: 'Aside',
  components: { Bg },
  data () {
    return {
      // 侧边栏导航默认项
      activePath: this.$route.path,
      // 侧边栏是否折叠
      collapse: document.body.offsetWidth < 1100,
      screenWidth: document.body.offsetWidth,
      // 添加新内容表单数据
      addForm: {
        // 添加内容抽屉是否显示
        isShow: false,
        // 添加新内容选择器内的数据
        option: {
          // 选择器的选项列表
          list: [
            { label: '添加一级分类', value: 1 },
            { label: '添加二级分类', value: 2 },
            { label: '添加新文章', value: 3 }
          ],
          value: ''
        }
      }
    }
  },
  computed: {
    ...mapState(['asideData', 'userInfo'])
  },
  watch: {
    $route: {
      handler (value) {
        // 改变编辑文章数据
        this.activePath = value.path
      },
      deep: true
    },
    screenWidth (val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val
        this.timer = true
        const that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          that.timer = false
        }, 400)
      }
      this.collapse = val < 1100
    }
  },
  methods: {
    // 获取侧边栏菜单
    ...mapActions(['getAsideData'])
  },
  created () {
    this.getAsideData()
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  }
}
</script>

<style lang="less" scoped>
  .el-aside {
    background: rgba(157,198,255,0.01);
    height: 100%;
    .open-aside {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      letter-spacing: 3px;
      background-color: #23508a;
      font-size: 14px;
      color: #303133;
      padding: 0 20px;
      cursor: pointer;
      transition: border-color .3s,background-color .3s,color .3s;
      box-sizing: border-box;
      font-weight: bolder;
    }
    .el-menu-item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .open-aside:hover {
      background-color: #1c3f6c;
    }
    .el-menu {
      border: none;
    }
    .el-drawer {
      .el-form {
        padding: 0 30px;
      }
    }
  }
</style>
