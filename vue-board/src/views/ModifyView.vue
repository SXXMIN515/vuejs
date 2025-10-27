<template>
  <div>
    <h3>수정화면</h3>
    <form v-on:submit.prevent="modifyPostHandler">
      <label for="title">제목</label>
      <input type="text" id="title" name="title" v-model="title" required />

      <label for="content">내용</label>
      <textarea id="content" name="content" v-model="content" required></textarea>

      <label for="writer">작성자</label>
      <input type="text" id="writer" name="writer" v-model="writer" required />

      <button type="submit">수정</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostStore } from "@/stores/post";

const route = useRoute(); // 라우트 정보 접근
const router = useRouter(); // 라우터 인스턴스 접근

// store 사용
const postStore = usePostStore(); // pinia 스토어 사용

const title = ref("");
const content = ref("");
const writer = ref("");

// 기존 데이터 채우기
onBeforeMount(async () => {
  await postStore.fetchPosts();
  const post = postStore.getPostById(route.params.id);
  if (post) {
    title.value = post.title;
    content.value = post.content;
    writer.value = post.writer;
  }
});

// 수정 핸들러
const modifyPostHandler = async () => {
  const updatedPost = {
    title: title.value,
    content: content.value,
    writer: writer.value,
  };
  // 백엔드에 전달할 형식: [{title, content, writer}, id]
  await postStore.modifyPost([updatedPost, parseInt(route.params.id)]);
  // 상세조회 페이지로 이동
  router.push({ name: "PostView", params: { id: route.params.id } });
};
</script>

<style scoped>
div {
  max-width: 700px;
  margin: 50px auto;
  padding: 30px 40px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 25px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

label {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

input,
textarea {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 1rem;
  font-family: inherit;
  color: #333;
  background-color: #fafafa;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input:focus,
textarea:focus {
  border-color: #0078ff;
  box-shadow: 0 0 0 3px rgba(0, 120, 255, 0.15);
  outline: none;
  background-color: #fff;
}

textarea {
  resize: vertical;
  min-height: 150px;
}

button {
  align-self: flex-end;
  background-color: #0078ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease;
}

button:hover {
  background-color: #005fcc;
  transform: translateY(-1px);
}
</style>
