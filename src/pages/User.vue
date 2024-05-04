<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showNotify} from "vant/es";
import 'vant/es/notify/style'
import {getCurrentUser} from "../services/user.ts";

const router = useRouter();

const loginUser = ref();

onMounted(async () => {
  // 获取用户信息
  loginUser.value = await getCurrentUser();
});

const doLogout = () => {
  myAxios.post("/user/logout")
      .then((res) => {
            if (res?.data > 0) {
              showNotify({type: 'success', message: '退出登录成功', duration: 900});
              // 跳转到登录页面
              setTimeout(() => {
                router.push({
                  path: "/user/login",
                  query: {
                    redirect: router.currentRoute.value.fullPath,
                  },
                });
              }, 1100);
            }
          }
      ).catch((err) => {
    showNotify({type: 'danger', message: '退出登录失败', duration: 900});
    console.log(err);
  });
}


</script>

<template>
  <div v-if="loginUser">
    <van-cell title="当前用户" :value="loginUser?.username"/>
    <van-cell title="修改信息" is-link to="/user/update"/>
    <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
    <van-cell title="我加入的队伍" is-link to="/user/team/join"/>
    <van-button style="margin-top: 10px;" icon="arrow-left" plain block type="danger" @click="doLogout">退出登录
    </van-button>
  </div>
</template>
