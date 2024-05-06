<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const searchText = ref('');

const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
    ],
  }, {
    text: '编程语言',
    children: [
      {text: 'C++', id: 'C++'},
      {text: 'Java', id: 'Java'},
      {text: 'Python', id: 'Python'},
      {text: 'JavaScript', id: 'JavaScript'},
      {text: 'Go', id: 'Go'},
      {text: 'Rust', id: 'Rust'},
      {text: 'Ruby', id: 'Ruby'},
      {text: 'Basic', id: 'Basic'},
      {text: 'Lua', id: 'Lua'},
      {text: 'PHP', id: 'PHP'},
      {text: 'C#', id: 'C#'},
      {text: 'Swift', id: 'Swift'},
      {text: 'Kotlin', id: 'Kotlin'},
      {text: 'R', id: 'R'}
    ],
  }
];

//标签列表
let tagList = ref(originTagList);

/**
 * 搜索过滤
 */
const onSearch = () => {
  tagList.value = originTagList
      .map(parentTag => {
        const tempParentTag = {...parentTag};
        const tempChildren = [...parentTag.children];
        tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
        return tempParentTag;
      }).filter(item => item.children != null && item.children.length > 0);
  activeIndex.value = 0;
};

//恢复标签列表
const recoverTagList = () => {
  tagList.value = originTagList;
};

//取消搜索
const onCancel = () => router.back();

//移除标签
const close = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  });
};

//清空已选标签
const clearTags = () => {
  activeIds.value = [];
  tagList.value = originTagList;
};

//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);
const doSearchResult = () => {
  //先判断是否选择了标签
  if (activeIds.value.length === 0) {
    //提示用户选择标签
    showToast('请选择标签');
    return;
  }
  //跳转到搜索结果页面
  router.push({
    path: "/user/list",
    query: {
      tags: activeIds.value
    }
  });
};
</script>

<template>
  <form action="/">
    <van-search v-model="searchText" clearable show-action placeholder="请输入要搜索的标签" @search="onSearch"
                @cancel="onCancel" @clear="recoverTagList"/>
  </form>
  <van-divider style=" margin: 0 ">已选标签</van-divider>
  <van-button style="margin-bottom: 8px;margin-left: 320px;" type="default" size="mini" icon="cross"
              @click="clearTags">清空
  </van-button>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row :gutter="[16, 16]" justify="center">
    <van-col v-for="tag in activeIds">
      <van-tag style="margin-bottom: 5px;" closeable size="medium" type="primary" @close="close(tag)">
        {{ tag }}
      </van-tag>
    </van-col>

  </van-row>
  <van-divider>选择标签</van-divider>
  <van-tree-select v-model:active-id="activeIds" v-model:main-active-index="activeIndex" :items="tagList"/>

  <div style="padding: 16px;">
    <van-button type="primary" block @click="doSearchResult">搜索</van-button>
  </div>
</template>

<style scoped></style>