<script setup>
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant/es";
import UserCardList from "../components/UserCardList.vue";

const userList = ref([]);

onMounted(async () => {
  // 向后端请求数据
  const userListData = await myAxios.get('/user/recommend', {
    params: {
      pageNum: 1,
      pageSize: 8,
    },
  }).then(function (response) {
    if (response?.data.length < 1) {
      showFailToast('没有找到匹配的用户');
      return null;
    }
    // 处理成功情况
    showSuccessToast('获取用户列表成功');
    console.log('获取用户列表成功:', response);
    return response?.data;
  }).catch(function (error) {
    showFailToast('获取用户列表失败');
    console.error('Error fetching user list: ', error);
  });
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
    userList.value = userListData;
  }
});

</script>

<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" image="error" description="数据为空"/>
</template>

<style scoped>

</style>