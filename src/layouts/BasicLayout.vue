<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import routers from "../config/route";

const router = useRouter();
const route = useRoute();
const DEFAULT_TITLE = "伙伴匹配";
const title = ref(DEFAULT_TITLE);

router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routers.find((route) => {
    return toPath === route.path;
  });
  title.value = route?.title ?? DEFAULT_TITLE;
})

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
      :title="title"
      left-arrow
      :placeholder="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right v-if="route.path === '/'">
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
