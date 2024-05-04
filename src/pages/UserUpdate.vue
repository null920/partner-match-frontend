<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showNotify} from "vant/es";
import 'vant/es/notify/style'

const router = useRouter();

const user = ref();

onMounted(async () => {
  // 获取用户信息
  await myAxios.get("/user/current")
      .then((response) => {
        if (response.data) {
          // 保存用户信息
          user.value = response.data;
        } else {
          showNotify({type: 'danger', message: '用户未登录或登录已过期',});
          // 用户未登录，跳转到登录页面
          router.push({
            path: "/user/login",
            query: {
              redirect: router.currentRoute.value.fullPath,
            },
          });
        }
      });
})

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: "/user/edit",
    query: {
      userId: user.value.id,
      editKey,
      editName,
      currentValue,
    },
  });
};

const toGenderEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: "/user/genderEdit",
    query: {
      userId: user.value.id,
      editKey,
      editName,
      currentValue,
    },
  });
};

const formatTime = (time) => {
  let year = new Date(time).getFullYear();
  let month = new Date(time).getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  let date = new Date(time).getDate();
  date = date < 10 ? '0' + date : date;
  let hours = new Date(time).getHours();
  hours = hours < 10 ? '0' + hours : hours;
  let minutes = new Date(time).getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${year}-${month}-${date} ${hours}:${minutes}`;
}
</script>

<template>
  <template v-if="user">
    <van-cell title="昵称" is-link :value="user.username" @click="toEdit('username','昵称', user.username)"/>
    <van-cell title="用户账户" :value="user.userAccount"/>
    <van-cell
        style="height: 150px"
        title="头像"
        is-link
        :value="user.avatarUrl"
    >
      <van-image round width="10rem" height="10rem" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell
        title="性别"
        is-link
        :value="user.gender === 0 ? '男':'女'"
        @click="toGenderEdit('gender','性别', user.gender)"
    />
    <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone','电话', user.phone)"/>
    <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email','邮箱', user.email)"/>
    <van-cell title="注册时间" :value="formatTime(user.createTime)"/>
  </template>
</template>
