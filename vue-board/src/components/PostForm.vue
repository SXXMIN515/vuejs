<template>
  <div>
    <h3>글작성</h3>
    <form v-on:submit.prevent="addPostHandler">
      <label for="title">제목</label>
      <input
        type="text"
        id="title"
        name="title"
        v-model="title"
        placeholder="제목을 입력하세요"
        required
      />

      <label for="content">내용</label>
      <textarea
        id="content"
        name="content"
        v-model="content"
        placeholder="내용을 입력하세요"
        required
      ></textarea>

      <!-- <label for="writer">작성자</label>
      <input
        type="text"
        id="writer"
        name="writer"
        v-model="writer"
        placeholder="작성자 이름"
        required
      /> -->

      <button type="submit">작성</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

// pinia store에서 addPost 함수 주입
import { usePostStore } from "@/stores/post";
import { useAuthStore } from "@/stores/auth";
const postStore = usePostStore(); // pinia 스토어 사용
const authStore = useAuthStore();
const { addPost } = postStore; // addPost 함수 추출

// 폼 데이터 상태 관리
const title = ref("");
const content = ref("");

// 폼 제출 핸들러
const addPostHandler = async () => {
  if (!title.value || !content.value) {
    alert("모든 필드를 작성해주세요");
    return;
  }
  const newPost = {
    title: title.value,
    content: content.value,
    writer: authStore.auth.name,
  };

  await addPost(newPost);
  // 폼 초기화
  title.value = "";
  content.value = "";
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
