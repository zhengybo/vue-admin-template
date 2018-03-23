<template lang="html">
  <div id="login">
    <div class="loginInner">
      <div class="loginInnerL l">
        <img src="" alt="">
        <span class="NAME">vue后台管理系统</br>管理系统</span>
      </div>
      <keep-alive>
        <div class="loginInnerR r">
          <div class="loginTitle">
            登录
          </div>
          <el-form
          :model="login"
          :rules="rules"
          status-icon
          ref="login"
          class="demo-ruleForm">
            <el-form-item prop="checkUser">
              <el-input
              type="text"
              class="username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-bell"
              v-model="login.checkUser"
              auto-complete="on"></el-input>
            </el-form-item>
            <el-form-item  prop="checkPassword">
              <el-input
              type="password"
              class="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-goods"
              v-model="login.checkPassword"
              auto-complete="new-password"></el-input>
            </el-form-item>
            <el-form-item>
              <custrom-verification @pass="slideVaild=true">
              </custrom-verification>
              <el-button
              type="primary"
              class="loginBtn"
              @click="submitLogin('login')"
              round>登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import Reg from '@/js/public/Reg';
import cvs from '@/js/public/lib/animation'
export default {
  data(){
    {
      const validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'));
        } else if (!Reg.userName(value)){
          callback(new Error('请输入4至12位用字母'));
        }else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'));
        } else if (!Reg.password(value)) {
          callback(new Error('密码长度为6至20位且不包含特殊字符'));
        } else {
          callback();
        }
      };
      return {
        slideVaild : false,
        login: {
          checkUser: '',
          checkPassword: '',
        },
        rules: {
          checkUser: [
            {required: true, validator: validateUser, trigger: 'blur' }
          ],
          checkPassword: [
            { required: true,validator: validatePassword, trigger: 'blur' }
          ]
        }
      };
    }
  },
  mounted(){
    cvs({
      c : "255,255,0",
      l : 3,
      n : "200",
      o : "0.9",
      z :"-2",
      d : document.getElementById('login')
    })
    document.onkeydown = () => {
      if (event.keyCode === 13){
        this.submitLogin('login');
      }
    }
  },
  destroyed(){
    document.onkeydown = null;
  },
  methods: {
    submitLogin(formName) {

      this.$refs[formName].validate((valid) => {
        if(valid && this.slideVaild) {
          this.$store.dispatch('login',this.login)
        }else {
          if(!valid)return;
          this.$root.$notify.warning({
            title: '提示',
            message: '请拖动校验条'
          });

          return false;
        }

      });
    }
  }
}
</script>

<style lang="scss">

</style>
