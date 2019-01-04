<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="3">
          <img src="@/assets/logo.png">
        </el-col>
        <el-col :span="19" class="middle">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a href @click.prevent="Loginout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px" router>
        <el-menu default-active="2" unique-opened router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-caret-right"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-message"></i>
              用户列表
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-caret-right"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-message"></i>
              角色列表
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-message"></i>
              权限列表
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-caret-right"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-message"></i>
              商品列表
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-message"></i>
              分类参数
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-message"></i>
              商品分类
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-caret-right"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-message"></i>
              订单列表
            </el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-caret-right"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-message"></i>
              数据报表
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeCreate() {
    if (!localStorage.getItem("token")) {
      this.$router.push({
        name: "login"
      });
      // 提示
      this.$message.warning("请先登录");
    }
  },
  methods: {
    // 实现退出功能
    Loginout() {
      // 清除token
      localStorage.clear();
      // 回到登录
      this.$router.push({
        name: "login"
      });
      this.$message.success("退出成功");
    }
  }
};
</script>

<style>
.container {
  height: 100%;
  /* background-color: yellow; */
}
.header {
  background-color: #b3c0d1;
}
.container a {
  text-decoration: none;
  line-height: 60px;
}
.middle {
  line-height: 60px;
  text-align: center;
}
/* .aside {
  background-color: red;
} */
/* .main {
  background-color: blue;
} */
</style>
