<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant/es";

const route = useRoute();
const router = useRouter();

const editUser = ref({
  userId: route.query.userId,
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
});

//非空值校验
const pattern = ref(/.+/);
const message = ref('输入内容不能为空');
//根据editKey的值设置pattern
switch (editUser.value.editKey) {
  case 'phone':
    pattern.value = /^1[3-9]\d{9}$/;
    message.value = '请输入正确的手机号';
    break;
  case 'email':
    //邮箱校验的正则表达式
    pattern.value = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    message.value = '请输入正确的邮箱';
    break;
  default:
    break;
}

const onSubmit = () => {
  myAxios.post('/user/update', {
    "id": editUser.value.userId,
    [editUser.value.editKey]: editUser.value.currentValue,
  },).then(function (response) {
    // 处理响应数据
    if (response.data > 0) {
      showSuccessToast("修改成功");
      router.back();
    } else {
      showFailToast("修改失败");
    }
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
}
</script>

<template>
  <van-form @submit="onSubmit">
    <!-- 通过 pattern 进行正则校验 -->
    <van-field
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :placeholder="`请输入${editUser.editName}`"
        :label="editUser.editName"
        :rules="[{ pattern, message }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        确认修改
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>