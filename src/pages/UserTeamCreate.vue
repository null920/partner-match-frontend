<script setup>
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import TeamCardList from "../components/TeamCardList.vue";
import myAxios from "../plugins/myAxios.ts";
import {showNotify} from "vant";

const router = useRouter();
const teamList = ref([]);
const searchText = ref("");

onMounted(async () => {
  // 获取队伍列表
  await myAxios.get("/team/list/my/create")
      .then(res => {
        if (res.code === 20000) {
          showNotify({type: 'success', duration: 900, message: '获取成功'});
          teamList.value = res.data;
        } else {
          showNotify({type: 'warning', duration: 900, message: '获取失败'});
          console.log(res);
        }
      }).catch(error => {
        console.log(error);
      });
});

const addTeam = () => {
  // 跳转
  router.push({
    path: '/team/add'
  });
}

const onSearch = async (val) => {
  await myAxios.get("/team/list", {
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
  })
}

</script>
<template>
  <div id="teamPage">
    <van-search clearable clear-trigger="focus" v-model="searchText" placeholder="请输入搜索关键词"
                @search="onSearch"/>
    <van-button type="primary" @click="addTeam">创建队伍</van-button>
    <team-card-list :team-list="teamList"></team-card-list>
    <van-empty v-if="!teamList || teamList.length < 1" image="error" description="数据为空"/>
  </div>
</template>

<style scoped>
</style>