<template>
  <h3>상세화면</h3>
  <div>
    <h3>제목: {{ post.title }}</h3>
    <p>내용: {{ post.content }}</p>
    <p>
      <em>작성자: {{ post.writer }}</em>
    </p>
    <p>작성일시 {{ writeDate }}</p>
    <p><button v-on:click="deletePostHandler">삭제</button></p>
    <RouterLink to="/">목록으로</RouterLink>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import axios from "axios";

const route = useRoute(); // 라우트 정보 접근
const router = useRouter(); // 라우터 인스턴스 접근

// 게시글 데이터 상태 관리
const post = ref({});
const writeDate = computed(() => {
  if (post.value.write_date) {
    return new Date(post.value.write_date).toLocaleString();
  }
  return "";
});

onMounted(async () => {
  // 여기서 route.params.id를 사용하여 필요한 데이터를 가져올 수 있습니다.
  const result = await axios.get(`http://localhost:3000/board/${route.params.id}`);
  console.log("Post Data:", result.data);
  post.value = result.data[0];
});

// 삭제 핸들러
const deletePostHandler = async () => {
  await axios.delete(`http://localhost:3000/board/${route.params.id}`);
  // 목록으로 이동
  router.push({ name: "HomeView" });
};
</script>
