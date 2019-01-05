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
        <el-input
          clearable
          @clear="getAllusers()"
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
        </el-input>

        <el-button type="primary" @click="showdiaAdd()">添加用户</el-button>
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
          <el-switch
            v-model="scope.row.mg_state"
            @change="changeState(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="showEdit(scope.row)"
            size="mini"
            plain
            circle
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="showDel(scope.row)"
            size="mini"
            plain
            circle
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            @click="showCheck(scope.row)"
            size="mini"
            plain
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Adduser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Edituser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">{{userName}}</el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <!-- v-model绑定的值如果和option的value值一样，可以默认选项 -->
          <!-- 点击不同的option值时，v-model绑定的值就是被选中option的value值 -->
          <el-select v-model="userRoleid" placeholder="请选择活动区域">
            <el-option label="请选择" :value="-1"></el-option>
            <!-- v-for遍历 -->
            <el-option v-for="(v,i) in roles" :key="i" :label="v.roleName" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 2,
      total: -1,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "100px",
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      // 下拉框绑定的数据
      userRoleid: -1,
      roles: [],
      userName:"",
      userID:-1
    };
  },
  created() {
    this.gettableData();
  },
  methods: {
    // 修改用户角色
    async setRole(){
      // id 用户id
      // rid 角色id
      const res = await this.$http.put(`users/${this.userID}/role`,{
        rid:this.userRoleid
      })
      // console.log(res);
      this.dialogFormVisibleRole = false;
      
    },
    // 分配角色
    async showCheck(user) {
      // console.log(user);
      this.userID = user.id;
      this.dialogFormVisibleRole = true;
      // 显示当前用户名字
      this.userName = user.username;
      // 获取所有角色
      const res = await this.$http.get(`roles`);
      // 所有的角色id在里面
      this.roles = res.data.data;
      // console.log(this.roles);
      // 显示当前用户角色
      const res2 = await this.$http.get(`users/${user.id}`);
      // console.log(res2);
      
      this.userRoleid = res2.data.data.rid;
    },
    // 修改用户状态
    async changeState(user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      // console.log(res);
    },
    // 发送编辑的请求
    async Edituser() {
      // 这里的id指要编辑的用户id
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      // console.log(res);
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = res;
      // 编辑成功后的逻辑
      if (status === 200) {
        this.dialogFormVisibleEdit = false;
        this.gettableData();
      }
    },
    // 展示编辑
    showEdit(user) {
      this.dialogFormVisibleEdit = true;
      // 显示编辑的数据
      this.form = user;
    },
    showDel(user) {
      // console.log(user);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 发送删除请求
          const res = await this.$http.delete(`users/${user.id}`);
          console.log(res);

          const {
            meta: { msg, status }
          } = res.data;
          // 删除成功后的逻辑
          if (status === 200) {
            this.$message.success(msg);
            // 再次去到第一页
            this.pagenum = 1;
            // 重新获取表格数据
            this.gettableData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async Adduser() {
      // 发送添加请求
      const res = await this.$http.post("users", this.form);
      console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 201) {
        // 关闭对话框
        this.dialogFormVisible = false;
        // 刷新表格
        this.gettableData();
      } else {
        this.$message.warning(msg);
      }
    },
    // 添加用户，显示对话框
    showdiaAdd() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    // 当清空文本框的时候，显示所有数据
    getAllusers() {
      this.gettableData();
    },
    // 搜索
    searchUser() {
      this.pagenum = 1;
      this.gettableData();
    },
    // 分页相关的方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.pagenum = 1;
      this.gettableData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      console.log(`当前页: ${val}`);
      this.gettableData();
    },
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
        this.total = total;
        // console.log(this.tableData);

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
