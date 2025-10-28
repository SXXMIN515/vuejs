<template>
  <div class="post-detail">
    <h2 class="page-title">📄 게시글 상세보기</h2>

    <div class="post-container">
      <h3 class="post-title">제목: {{ post.title }}</h3>
      <p class="post-content">내용: {{ post.content }}</p>
      <p class="post-meta">
        <em>✍ 작성자: {{ post.writer }}</em>
        <span class="date">🕒 {{ writeDate }}</span>
      </p>

      <div class="post-actions" v-if="postWriter">
        <button class="btn delete" @click="deletePostHandler">삭제</button>
        <button class="btn edit" @click="goModifyPage">수정</button>
      </div>

      <RouterLink class="btn back" to="/">← 목록으로</RouterLink>
    </div>

    <div class="reply-container">
      <h3>💬 댓글</h3>

      <form class="reply-form" @submit.prevent="addReplyHandler">
        <textarea v-model="content" placeholder="댓글을 입력하세요..." required></textarea>
        <button type="submit" class="btn submit">댓글 등록</button>
      </form>

      <ul class="reply-list">
        <li v-for="reply in replies" :key="reply.reply_id" class="reply-item">
          <div class="reply-content">
            <p>{{ reply.reply_content }}</p>
            <span class="reply-writer">👤 {{ reply.reply_writer }}</span>
          </div>
          <div class="reply-actions" v-if="authStore.auth.name === reply.reply_writer">
            <button class="btn small delete" @click="deleteReplyHandler(reply.reply_id)">
              삭제
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, computed, ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { usePostStore } from "@/stores/post";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();
const authStore = useAuthStore();
const { addReply } = postStore;

const post = computed(() => postStore.getPostById(route.params.id));
const writeDate = computed(() => {
  if (post.value.write_date) return new Date(post.value.write_date).toLocaleString();
  return "";
});
const postWriter = computed(() => authStore.auth.name === post.value.writer);
const replies = ref([]);
const content = ref("");

onBeforeMount(async () => {
  await postStore.fetchPosts();
  const result = await postStore.fetchReplies(route.params.id);
  replies.value = result;
});

const deletePostHandler = async () => {
  const postId = route.params.id;
  await postStore.deletePost(postId);
  router.push({ name: "HomeView" });
};

const deleteReplyHandler = async (replyId) => {
  await postStore.deleteReply(replyId);
  replies.value = replies.value.filter((r) => r.reply_id !== replyId);
};

const goModifyPage = async () => {
  router.push({ name: "ModifyView", params: { id: route.params.id } });
};

const addReplyHandler = async () => {
  if (!content.value) {
    alert("댓글을 작성해주세요");
    return;
  }
  const newReply = {
    reply_content: content.value,
    reply_writer: authStore.auth.name,
    id: route.params.id,
  };
  await addReply(newReply);
  content.value = "";
  const result = await postStore.fetchReplies(route.params.id);
  replies.value = result;
};
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  font-family: "Pretendard", sans-serif;
}

.page-title {
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.6rem;
  color: #333;
}

.post-container {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.post-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #222;
}

.post-content {
  margin: 15px 0;
  line-height: 1.6;
  color: #444;
}

.post-meta em {
  margin-right: 12px; /* 작성자 오른쪽 여백 */
  font-style: normal; /* 기울임 해제 (선택사항) */
  color: #555;
}

.post-meta .date {
  color: #888;
}

.post-actions {
  margin-top: 15px;
}

.btn {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

.btn.edit {
  background: #0078ff;
  color: #fff;
  margin-left: 5px;
}

.btn.delete {
  background: #ff4d4f;
  color: #fff;
}

.btn.back {
  display: inline-block;
  margin-top: 10px;
  text-decoration: none;
  color: #555;
  font-weight: 500;
}

.btn.submit {
  background: #2ecc71;
  color: #fff;
  font-weight: bold;
  width: 100%;
  padding: 10px;
  margin-top: 8px;
}

.reply-container {
  margin-top: 30px;
}

.reply-form textarea {
  width: 100%;
  min-height: 80px;
  padding: 10px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;
}

.reply-list {
  margin-top: 15px;
  list-style: none;
  padding: 0;
}

.reply-item {
  background: #f9fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reply-content p {
  margin: 0 0 4px;
}

.reply-writer {
  font-size: 0.85rem;
  color: #666;
}

.reply-actions .btn.small {
  padding: 4px 8px;
  font-size: 0.8rem;
}

.btn:hover {
  opacity: 0.85;
}
</style>
