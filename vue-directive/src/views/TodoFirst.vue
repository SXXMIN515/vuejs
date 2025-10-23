<script setup>
import { ref, reactive } from "vue";
const welcomeMsg = ref("나의 첫 웹 페이지");
const content = ref("HTML과 CSS로 만든 기본 구조");
const data = reactive({
  welcome: "환영합니다!",
});
const welcome = ref("환영합니다!");
const content2 = ref(
  "이 페이지는 HTML과 CSS로 만들어졌으며, 기본적인 구조와 스타일을 포함하고 있습니다.",
);
</script>

<template>
  <div id="todo">
    <header>
      <h1>{{ welcomeMsg }}</h1>
      <p>{{ content }}</p>
    </header>
  </div>
  <main>
    <h2>{{ welcome }}</h2>
    <p>{{ content2 }}</p>
    <h3>내용 예시</h3>
    <ul>
      <li>간단한 텍스트</li>
      <li>링크: <a v-bind:href="url">예시 사이트</a></li>
      <li>리스트 항목</li>
    </ul>
  </main>
</template>

<style scoped>
#todo {
  background-color: rgb(125, 189, 27);
  text-align: center;
  color: #fff;
}

main {
}
</style>
