<template>
  <div class="login-wrap">
    <el-form class="form" label-position="top" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click="Login()" class="btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // Login () {
    //     // 接口文档的要求(post login)
    //     this.$http.post("login",this.formdata)
    //     .then((res) =>{
    //         // console.log(res);
    //         // 对象解构赋值 把msg跟status拿出来
    //         const{data:{data,meta:{msg,status}}} = res
    //         if (status === 200) {
    //             // elementUI中的提示框
    //             // this.$message({
    //             //     message:msg,
    //             //     type:'success'
    //             // })
    //             this.$router.push({
    //                 name:'home'
    //             })
    //         } else {
    //             this.$message({
    //                 message:msg,
    //                 type:'error'
    //             })
    //         }

    //     })
    // }

    // 简化登陆请求代码
    // 在距离异步操作方法最近的外层函数前面加async
    async Login() {
      // 在异步操作方法的前面加await，拿变量接收
      const res = await this.$http.post("login", this.formdata);
      console.log(res);
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = res;
      if (status === 200) {
        // 此时用户名和密码正确
        // 保存token值(将来写其他功能时会使用)
        localStorage.setItem('token',data.token)
        
        // 渲染home组件
        this.$router.push({
          name: "home"
        });
      } else {
        this.$message.warning(msg);
      }
    }
  }
};
</script>

<style>
.login-wrap {
  height: 100%;
  background: aqua;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .form {
  width: 400px;
  padding: 30px;
  background: #fff;
  border-radius: 6px;
}
.login-wrap .form .btn {
  width: 100%;
}
</style>
