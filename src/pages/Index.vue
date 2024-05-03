<script setup>
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant/es";
import UserCardList from "../components/UserCardList.vue";

const userList = ref([]);
const loading = ref(true);
const matchFlag = ref(false);

onMounted(async () => {
  loading.value = true;
  // 向后端请求数据
  const userListData = await myAxios.get('/user/recommend', {
    params: {
      pageNum: 1,
      pageSize: 8,
    },
  }).then(function (response) {
    if (response?.data.length < 1) {
      showFailToast('没有找到匹配的用户');
      console.log(response);
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
  loading.value = false;
});

const doMatch = async () => {
  //清空userList
  userList.value = [];
  matchFlag.value = true;
  loading.value = true;
  const num = 10;
  // 向后端请求数据
  const userListData = await myAxios.get('/user/match', {
    params: {
      num,
    },
  }).then(function (response) {
    if (response?.data.length < 1) {
      showNotify({type: 'warning', duration: 900, message: '没有找到匹配的用户'});
      console.log(response);
      return null;
    }
    // 处理成功情况
    showNotify({type: 'success', duration: 900, message: '匹配成功'});
    console.log('匹配成功:', response);
    return response?.data;
  }).catch(function (error) {
    showFailToast('匹配失败');
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
  matchFlag.value = false;
  loading.value = false;
}


</script>

<template>
  <van-button type="primary" @click="doMatch" block>匹配队友</van-button>
  <van-loading v-show="matchFlag" vertical>
    <template #icon>
      <van-icon name="star-o" size="30"/>
    </template>
    匹配中...
  </van-loading>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-show="!loading && (!userList || userList.length < 1)" image="error" description="数据为空"/>
</template>

<style scoped>

</style>