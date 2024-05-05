<script setup lang="ts">
import 'vant/es/notify/style';
import 'vant/es/dialog/style';
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import blg from "../assets/blg.jpeg";
import myAxios from "../plugins/myAxios.ts";
import {showDialog, showNotify} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  loading: boolean;
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  loading: true,
  teamList: () => [],
});

const currentUser = ref();
const router = useRouter();
const password = ref('');
const joinTeamId = ref();
const showPasswordDialog = ref(false);

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

/**
 * 加入队伍
 * @param id
 */
const doJoinTeam = (id: number, status: number) => {
  if (status === 2) {
    joinTeamId.value = id;
    showPasswordDialog.value = true;
  } else {
    showDialog({
      overlay: true,
      showCancelButton: true,
      message:
          '确认加入该队伍吗？',
      theme: 'round-button',
    }).then(async () => {
      // on confirm
      await myAxios.post("/team/join", {
        teamId: id,
      }).then(res => {
        if (res?.code == 20000) {
          showNotify({type: 'success', duration: 900, message: "加入成功"});
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          showNotify({type: 'warning', duration: 900, message: "加入失败" + (res?.desc ? `,${res?.desc}` : '')});
          console.log(res);
        }
      }).catch(error => {
        console.log(error);
      });
    }).catch(() => {
    });
  }
}

// 加入加密队伍
const doJoinPasswordTeam = async (password: string) => {
  await myAxios.post("/team/join", {
    teamId: joinTeamId.value,
    password,
  }).then(res => {
    if (res?.code == 20000) {
      showNotify({type: 'success', duration: 900, message: "加入成功"});
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      showNotify({type: 'warning', duration: 900, message: "加入失败" + (res?.desc ? `,${res?.desc}` : '')});
      console.log(res);
    }
  }).catch(error => {
    console.log(error);
  });

}

/**
 * 更新队伍
 * @param id
 */
const doUpdateTeam = (id: number) => {
  // 跳转到更新页面
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}
/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  showDialog({
    overlay: true,
    showCancelButton: true,
    message:
        '确认退出该队伍吗？',
    theme: 'round-button',
  }).then(async () => {
    await myAxios.post("/team/quit", {
      teamId: id,
    }).then(res => {
      if (res.code == 20000) {
        showNotify({type: 'success', duration: 900, message: "退出成功"});
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        showNotify({type: 'warning', duration: 900, message: "退出失败" + (res.desc ? `,${res.desc}` : '')});
        console.log(res);
      }
    }).catch(error => {
      console.log(error);
    });
  }).catch(() => {
  });
}
/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  showDialog({
    overlay: true,
    showCancelButton: true,
    message:
        '确认解散该队伍吗？',
    theme: 'round-button',
  }).then(async () => {
    await myAxios.post("/team/delete", {
      teamId: id,
    }).then(res => {
      if (res.code == 20000) {
        showNotify({type: 'success', duration: 900, message: "解散成功"});
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        showNotify({type: 'warning', duration: 900, message: "解散失败" + (res.desc ? `,${res.desc}` : '')});
        console.log(res);
      }
    }).catch(error => {
      console.log(error);
    });
  }).catch(() => {
  });

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
  <van-skeleton title avatar :row="3" :loading="props.loading" style="margin-top: 15px">
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :title="team.teamName"
        :thumb="blg"
    >
      <template #tags>
        <van-tag style="margin: 8px 10px 5px 0;" plain :type="team.status===0?'primary':'danger'">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>{{ "最大人数:" + team.maxNum }}</div>
        <div>{{ "创建时间:" + formatTime(team.createTime) }}</div>
        <div>{{ "过期时间:" + formatTime(team.expireTime) }}</div>
      </template>
      <template #footer>
        <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" size="small" type="primary" plain
                    @click="doJoinTeam(team.id,team.status)">加入
        </van-button>
        <van-button v-if="team.userId === currentUser?.id " size="small" color="#7232dd" plain
                    @click="doUpdateTeam(team.id)">更新
        </van-button>
        <van-button v-if="team.hasJoin" size="small" type="warning" plain
                    @click="doQuitTeam(team.id)">退出
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" type="danger" plain
                    @click="doDeleteTeam(team.id)">解散
        </van-button>
      </template>
    </van-card>
  </van-skeleton>
  <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button
              @confirm="doJoinPasswordTeam(password)" @cancel="password=''">
    <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-dialog>
</template>

<style scoped>
</style>