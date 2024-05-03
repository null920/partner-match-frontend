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
  myAxios.get("/user/current")
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


</script>

<template>
  <van-cell title="当前用户" :value="user?.username"/>
  <van-cell title="修改信息" is-link to="/user/update"/>
  <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
  <van-cell title="我加入的队伍" is-link to="/user/team/join"/>

</template>
