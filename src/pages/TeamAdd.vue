<script setup lang="ts">
import {ref} from 'vue';
import myAxios from "../plugins/myAxios.ts";
import {showNotify} from "vant";
import 'vant/es/notify/style';
import {useRouter} from "vue-router";

const initFormData = {
  "description": "",
  "expireTime": "",
  "maxNum": 2,
  "teamName": "",
  "password": "",
  "status": 0,
}

const router = useRouter();
const addTeamData = ref({...initFormData});
const showPicker = ref(false);
const currentDate = ref([]);
const currentTime = ref(['12', '00']);
const statusChecked = ref('0');
const minDate = new Date();

//当currentDate选择的是今天时，限制currentTime的选择


const onConfirm = () => {
  addTeamData.value.expireTime = `${currentDate.value.join('-')} ${currentTime.value.join(':')}`;
  showPicker.value = false;
};
const onCancel = () => {
  showPicker.value = false;
};
const onSubmit = async () => {
  const postData = {...addTeamData.value, status: Number(statusChecked.value)};
  await myAxios.post('/team/add', postData)
      .then(res => {
        if (res?.code === 20000) {
          // 提交成功
          showNotify({type: 'success', duration: 900, message: '创建成功'});
          router.push({
            path: '/team',
            replace: true,
          });
        } else {
          showNotify({type: 'danger', duration: 900, message: '创建失败'});
        }
        console.log(res);
      }).catch(error => {
        showNotify({type: 'danger', duration: 900, message: '创建失败'});
        console.error('Error add team: ', error);
      });
}
</script>

<template>
  <div id="addTeamPage">
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
            <van-stepper v-model="addTeamData.maxNum" min="2" max="20" input-width="40px" button-size="32px"/>
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