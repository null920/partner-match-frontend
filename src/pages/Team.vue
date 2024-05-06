<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import TeamCardList from "../components/TeamCardList.vue";
import myAxios from "../plugins/myAxios.ts";
import {showNotify} from "vant";
import {getCurrentUser} from "../services/user.ts";

const router = useRouter();
const teamList = ref([]);
const searchText = ref("");
const loading = ref(true);
const loginUser = ref();
const active = ref('public');

/**
 * 切换标签页
 * @param name 标签页名称
 */
const onTabChange = (name) => {
  if (name === 'public') {
    listTeam(searchText.value, 0);
  } else {
    listTeam(searchText.value, 2);
  }
}

/**
 * 获取队伍列表
 * @param val 搜索关键词
 * @param status 队伍状态
 * @returns {Promise<void>} 队伍列表
 */
const listTeam = async (val = '', status = 0) => {
  loading.value = true;
  // 获取队伍列表
  await myAxios.get("/team/list", {
    params: {
      searchText: val,
      status,
    }
  }).then(res => {
    if (res?.code === 20000) {
      //showNotify({type: 'success', duration: 900, message: '获取成功'});
      teamList.value = res?.data;
    } else {
      showNotify({type: 'warning', duration: 900, message: '获取失败'});
      console.log(res);
    }
  }).catch(error => {
    console.log(error);
  });
  loading.value = false;
}

onMounted(async () => {
  loginUser.value = await getCurrentUser();
  await listTeam();
})

const addTeam = () => {
  // 跳转
  router.push({
    path: '/team/add'
  });
}

const onSearch = async (val) => {
  await listTeam(val);
}

</script>
<template>
  <div v-if="loginUser" id="teamPage">
    <van-search clearable clear-trigger="focus" v-model="searchText" placeholder="请输入搜索关键词"
                @search="onSearch"/>
    <van-tabs v-model:active="active" sticky @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="private"/>
    </van-tabs>
    <van-floating-bubble :gap="10" icon="plus" @click="addTeam"/>
    <team-card-list :team-list="teamList" :loading="loading"></team-card-list>
    <van-empty v-if="!loading && (!teamList || teamList.length < 1)" image="error" description="数据为空"/>
  </div>
</template>

<style scoped>
</style>