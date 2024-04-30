<script setup>
import {useRouter} from "vue-router";

const router = useRouter();

const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push("/search");
};
</script>

<template>
  <van-nav-bar
      clickable
      title="标题"
      left-arrow
      :placeholder="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view/>
  </div>
  <van-tabbar route>
    <van-tabbar-item to="/" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="friends-o">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
