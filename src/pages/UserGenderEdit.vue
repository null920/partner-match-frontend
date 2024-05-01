<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref, onMounted} from "vue";
import {showToast} from "vant/es"
import myAxios from "../plugins/myAxios.ts";

const route = useRoute();
const router = useRouter();


const genderChecked = ref();
const editUser = ref();
/**
 * 借助生命周期钩子函数onMounted()初始化genderChecked的值
 */
onMounted(() => {
  editUser.value = {
    userId: route.query.userId,
    editKey: route.query.editKey,
    editName: route.query.editName,
    currentValue: route.query.currentValue,
  }
  genderChecked.value = <string>editUser.value.currentValue;
});

const onSubmit = () => {
  if (genderChecked.value === null) {
    showToast("请选择性别");
    return;
  }
  myAxios.post('/user/update', {
    "id": editUser.value.userId,
    [editUser.value.editKey]: <number>genderChecked.value,
  }).then(response => {
    if (response.data > 0) {
      showToast("修改成功");
      router.back();
    } else {
      showToast("修改失败");
    }
    console.log(response);
  }).catch(error => {
    console.log(error);
  })
};

</script>

<template>
  <van-form @submit="onSubmit">
    <van-radio-group v-model="genderChecked">
      <van-cell-group>
        <van-cell title="男" clickable @click="genderChecked = '0'">
          <template #right-icon>
            <van-radio name='0'/>
          </template>
        </van-cell>
        <van-cell title="女" clickable @click="genderChecked = '1'">
          <template #right-icon>
            <van-radio name='1'/>
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        确认修改
      </van-button>
    </div>
  </van-form>
</template>
