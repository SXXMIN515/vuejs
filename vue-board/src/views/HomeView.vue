<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/post";
import { useAuthStore } from "@/stores/auth";

import LoginForm from "@/components/LoginForm.vue";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

const postStore = usePostStore();
const authStore = useAuthStore();
// State, Getter 사용.
const { posts } = storeToRefs(postStore);
const { fetchPosts } = postStore;
const { auth } = storeToRefs(authStore);

onMounted(async () => {
  // 게시글 목록을 가져오는 액션 호출
  await fetchPosts();
});
</script>

<template>
  <div>
    <h3 class="board-title">📋 게시판</h3>
    <LoginForm />
    <PostForm v-if="auth" />
    <PostList v-bind:posts="posts" />
  </div>
</template>

<style scoped>
.board-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 3px solid #007bff; /* 파란색 라인 */
  display: inline-block;
  letter-spacing: -0.5px;
}
</style>
