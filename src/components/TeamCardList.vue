<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import blg from "../assets/blg.jpeg";
import myAxios from "../plugins/myAxios.ts";
import {showNotify} from "vant";
import {onMounted, ref} from "vue";
import 'vant/es/notify/style';
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: () => [],
});

const currentUser = ref();
const router = useRouter();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

/**
 * 加入团队
 * @param id
 */
const doJoinTeam = async (id: number) => {
  await myAxios.post("/team/join", {
    teamId: id,
  }).then(res => {
    if (res.code == 20000) {
      showNotify({type: 'success', duration: 900, message: "加入成功"});
    } else {
      showNotify({type: 'warning', duration: 900, message: "加入失败" + (res.desc ? `,${res.desc}` : '')});
      console.log(res);
    }
  }).catch(error => {
    console.log(error);
  })
}

const doUpdateTeam = (id: number) => {
  // 跳转到更新页面
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

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
  <van-card
      v-for="team in props.teamList"
      :desc="team.description"
      :title="team.teamName"
      :thumb="blg"
  >
    <template #tags>
      <van-tag style="margin: 8px 10px 5px 0;" plain type="primary">{{ teamStatusEnum[team.status] }}
      </van-tag>
    </template>
    <template #bottom>
      <div>{{ "最大人数:" + team.maxNum }}</div>
      <div>{{ "创建时间:" + formatTime(team.createTime) }}</div>
      <div>{{ "过期时间:" + formatTime(team.expireTime) }}</div>
    </template>
    <template #footer>
      <van-button size="small" type="primary" plain @click="doJoinTeam(team.id)">加入</van-button>
      <van-button v-if="team.userId === currentUser?.id " size="small" type="default" plain
                  @click="doUpdateTeam(team.id)">更新
      </van-button>
    </template>
  </van-card>
</template>

<style scoped>
</style>