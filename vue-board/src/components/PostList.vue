<template>
  <div>
    <h3>게시글 목록</h3>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h4>
          <RouterLink v-bind:to="{ name: 'PostView', params: { id: post.id } }">{{
            post.title
          }}</RouterLink>
        </h4>
        <p>{{ post.content }}</p>
        <p>
          <em>{{ post.writer }}</em>
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  posts: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
div {
  max-width: 1100px;
  margin: 50px auto;
  padding: 0 20px;
}

h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #222;
  text-align: center;
  margin-bottom: 25px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 */
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 20px;
  background-color: #fff;
  transition:
    box-shadow 0.2s ease,
    transform 0.15s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 160px;
}

li:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
}

h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

p {
  flex: 1;
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 8px;
}

em {
  font-size: 0.85rem;
  color: #999;
  text-align: right;
  display: block;
}

/* 반응형 */
@media screen and (max-width: 900px) {
  ul {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 600px) {
  ul {
    grid-template-columns: 1fr;
  }
}
</style>
