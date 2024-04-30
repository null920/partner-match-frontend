<script setup lang="ts">
import {ref} from 'vue';
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant/es";
import {useRouter} from "vue-router";

const router = useRouter();

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = () => {
  myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  }).then((response) => {
    // 处理登录成功逻辑
    if (response.data) {
      showSuccessToast("登录成功");
      router.replace('/');
      console.log('登录成功', response);
    } else {
      showFailToast("登录失败");
      console.log('登录失败', response);
    }
  }).catch((error) => {
    console.log('登录失败', error);
  });
};

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
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>