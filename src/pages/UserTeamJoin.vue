<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import TeamCardList from "../components/TeamCardList.vue";
import teamAxios from "../plugins/teamAxios.ts";
import {showNotify} from "vant";

const router = useRouter();
const teamList = ref([]);
const searchText = ref("");
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  // 获取队伍列表
  await teamAxios.get("/team/list/my/join")
      .then(res => {
        if (res.code === 20000) {
          //showNotify({type: 'success', duration: 900, message: '获取成功'});
          teamList.value = res.data;
        } else {
          showNotify({type: 'warning', duration: 900, message: '获取失败'});
          console.log(res);
        }
      }).catch(error => {
        console.log(error);
      });
  loading.value = false;
})


const onSearch = async (val) => {
  loading.value = true;
  await teamAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
    }
  }).then(res => {
        if (res.code === 20000 && res.data.length !== 0) {
          showNotify({type: 'success', duration: 900, message: '搜索成功'});
          teamList.value = res.data;
        } else if (res.code === 20000 && res.data.length === 0) {
          showNotify({type: 'warning', duration: 900, message: '没有数据'});
          teamList.value = [];
        } else {
          showNotify({type: 'danger', duration: 900, message: '搜索失败'});
        }
        console.log(res);
      }
  ).catch(error => {
    console.log(error);
  });
  loading.value = false;
}

</script>
<template>
  <div id="teamPage">
    <van-search clearable clear-trigger="focus" v-model="searchText" placeholder="请输入搜索关键词"
                @search="onSearch"/>
    <team-card-list :team-list="teamList" :loading="loading"></team-card-list>
    <van-empty v-if="!loading && (!teamList || teamList.length < 1)" image="error" description="数据为空"/>
  </div>
</template>

<style scoped>
</style>