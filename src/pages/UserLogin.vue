<script setup lang="ts">
import {ref} from 'vue';
import {showFailToast, showSuccessToast} from "vant/es";
import {useRoute} from "vue-router";
import userAxios from "../plugins/userAxios.ts";

const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = () => {
  userAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  }).then((response) => {
    // 处理登录成功逻辑
    if (response.data) {
      showSuccessToast("登录成功");
      window.location.href = route.query.redirect as string ?? "/";
      console.log('登录成功', response);
    } else {
      showFailToast("登录失败");
      console.log('登录失败', response);
    }
  }).catch((error) => {
    console.log('登录失败', error);
  });
}

</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <van-cell title="" url="https://user.null920.top/user/register" value="还没有账号？点击注册"></van-cell>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>