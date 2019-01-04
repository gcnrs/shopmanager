<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框+按钮 -->
    <!-- 行 -->
    <el-row>
      <!-- 列 -->
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <!-- el-table需要通过data属性提供数据源tableData -->
    <el-table :data="tableData" style="width: 100%">
      <!-- id: (...)
      username: (...)
      email: (...)
      mobile: (...)
      create_time: (...)
      mg_state: (...)
      role_name: (...)-->
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="160"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
      <el-table-column label="创建日期" width="120">
        <!-- template 如果单元格内容不是简单字符串 -->
        <!-- template属性slot-scope = "值"，此时info就是tableData -->
        <!-- info.row就是数组中每个对象，info.row.create_time就是要使用的数据 -->
        <template slot-scope="info">{{info.row.create_time | fmtDate}}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="140">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain circle></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain circle></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 2
    };
  },
  created() {
    this.gettableData();
  },
  methods: {
    // 发送请求，返回用户数据列表
    // 在发起请求(除了登录之外)之前,需设置请求头
    async gettableData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      // console.log(res);
      const {
        data: {
          data: { total, users },
          meta: { status, msg }
        }
      } = res;
      if (status === 200) {
        // 1.给表格数据赋值
        this.tableData = users;
        console.log(this.tableData);

        // 2.提示
        this.$message.success(msg);
      }
    }
  }
};
</script>

<style>
.card {
  height: 100%;
}
.input-with-select {
  margin-top: 20px;
  width: 350px;
}
</style>
