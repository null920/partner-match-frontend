<script setup lang="ts">
import {UserType} from "../models/user";
import {showFailToast, showSuccessToast} from "vant/es";

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  // 设置默认值
  loading: true,
  userList: () => [],
});

// 把phone复制到剪切板
const copyPhone = (phone: string) => {
  if (phone.length === 0) {
    showFailToast('该用户没有留下电话号码');
    return;
  }
  if (!navigator.clipboard) {
    showFailToast('浏览器不支持剪切板');
    return;
  }
  try {
    navigator.clipboard.writeText(phone);
    showSuccessToast('电话号码已复制到剪贴板');
  } catch (err) {
    showFailToast('复制失败');
  }
}
</script>

<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" style="margin-top: 6px">
    <van-card
        v-for="user in props.userList"
        :desc="user.userProfile"
        :title="user.username"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag style="margin: 8px 10px 5px 0;" plain type="primary" v-for="tag in user.tags">{{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini" @click="copyPhone(user.phone ? user.phone : '')">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>
</template>

<style scoped>
</style>