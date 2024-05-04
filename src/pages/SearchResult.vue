<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant/es";
import qs from "qs";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const {tags} = route.query;
const userList = ref([]);
const loading = ref(true);
const searchFlag = ref(false);

onMounted(async () => {
  searchFlag.value = true;
  loading.value = true;
  // 向后端请求数据
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false});
    }
  }).then(function (response) {
    if (response.data.length < 1) {
      showFailToast('没有找到匹配的用户');
      return null;
    }
    // 处理成功情况
    showSuccessToast('获取用户列表成功');
    console.log('获取用户列表成功:', response);
    return response.data;
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
  searchFlag.value = false;
  loading.value = false;
});

</script>

<template>
  <van-loading v-show="searchFlag" vertical>
    <template #icon>
      <van-icon name="star-o" size="30"/>
    </template>
    搜索中...
  </van-loading>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!loading && (!userList || userList.length < 1)" image="error" description="没有找到匹配的用户"/>
</template>

<style scoped>

</style>