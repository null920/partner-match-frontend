<script setup lang="ts">
import {onMounted, ref} from 'vue';
import myAxios from "../plugins/myAxios.ts";
import {showNotify} from "vant";
import 'vant/es/notify/style';
import {useRoute, useRouter} from "vue-router";


const router = useRouter();
const route = useRoute();
const addTeamData = ref({});
const showPicker = ref(false);
const currentDate = ref([]);
const currentTime = ref([]);
const statusChecked = ref('0');
const minDate = new Date();
const id = route.query.id;

// 获取队伍信息
onMounted(async () => {
  if (id == null || id <= 0) {
    showNotify({type: 'danger', duration: 900, message: "加载队伍失败"});
  }
  await myAxios.get("/team/get", {
    params: {
      id,
    }
  }).then(res => {
    if (res.code === 20000) {
      addTeamData.value = res.data;
      formatTime(addTeamData);
    } else {
      showNotify({type: 'danger', duration: 900, message: "获取队伍信息失败"});
    }
  })
});

// 格式化时间
const formatTime = (addTeamData) => {
  if (addTeamData.value.expireTime) {
    currentDate.value.push(new Date(addTeamData.value.expireTime).getFullYear());
    const month = new Date(addTeamData.value.expireTime).getMonth() + 1;
    currentDate.value.push(month < 10 ? '0' + month : month);
    const date = new Date(addTeamData.value.expireTime).getDate();
    currentDate.value.push(date < 10 ? '0' + date : date);
    const hours = new Date(addTeamData.value.expireTime).getHours();
    currentTime.value.push(hours < 10 ? '0' + hours : hours);
    const minutes = new Date(addTeamData.value.expireTime).getMinutes();
    currentTime.value.push(minutes < 10 ? '0' + minutes : minutes);
    addTeamData.value.expireTime = `${currentDate.value.join('-')} ${currentTime.value.join(':')}`;
  }
}

const onConfirm = () => {
  addTeamData.value.expireTime = `${currentDate.value.join('-')} ${currentTime.value.join(':')}`;
  showPicker.value = false;
};
const onCancel = () => {
  showPicker.value = false;
};

const onSubmit = async () => {
  const postData = {...addTeamData.value, status: Number(statusChecked.value)};
  await myAxios.post('/team/update', postData)
      .then(res => {
        if (res?.code === 20000) {
          showNotify({type: 'success', duration: 900, message: '更新成功'});
          setTimeout(() => {
            router.push({
              path: '/team',
              replace: true,
            });
          }, 1000);
        } else {
          showNotify({type: 'danger', duration: 900, message: '更新失败'});
        }
        console.log(res);
      }).catch(error => {
        showNotify({type: 'danger', duration: 900, message: '更新失败'});
        console.error('Error update team: ', error);
      });
}

</script>

<template>
  <div id="updateTeamPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.teamName"
            name="teamName"
            label="队伍名称"
            placeholder="请输入队伍名称"
            :rules="[{ required: true, message: '请填写队伍名称'  }]"
        />
        <van-field name="maxNum" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" disabled min="2" max="20" input-width="40px" button-size="32px"/>
          </template>
        </van-field>
        <van-field name="status" label="队伍状态">
          <template #input>
            <van-radio-group v-model="statusChecked" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-model="addTeamData.expireTime"
            is-link
            readonly
            name="expireTime"
            label="过期时间"
            placeholder="点击选择过期时间"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker-group
              title="过期时间"
              :tabs="['选择日期', '选择时间']"
              next-step-text="下一步"
              @confirm="onConfirm"
              @cancel="onCancel"
          >
            <van-date-picker v-model="currentDate" :min-date="minDate"/>
            <van-time-picker v-model="currentTime"/>
          </van-picker-group>
        </van-popup>

        <van-field
            v-model="addTeamData.description"
            rows="3"
            autosize
            :clearable="true"
            label="队伍描述"
            type="textarea"
            maxlength="200"
            placeholder="请输入队伍描述"
            show-word-limit
        />
        <van-field
            v-if="Number(statusChecked) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>

</style>