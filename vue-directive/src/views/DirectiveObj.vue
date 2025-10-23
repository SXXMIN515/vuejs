<template>
  <p>이름: <input type="text" /></p>
  <p>나이: <input type="number" /></p>
  <p><button v-on:click="addFriend">친구추가</button></p>
  <table>
    <thead>
      <tr>
        <th>이름</th>
        <th>나이</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="friend in friends" v-bind:key="friend.name">
        <td>{{ friend.name }}</td>
        <td>{{ friend.age }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, reactive } from "vue";

// Data.
const friends = reactive([
  { name: "홍길동", age: 20 },
  { name: "김민식", age: 21 },
]);
const fname = ref("");
const fage = ref(20);
// const finfo = reactive({
//   name: "",
//   age: 20,
// });

const addFriend = () => {
  console.log(fname.value, fage.value);
  friends.values.push({ name: fname.value, age: fage.value });
};
</script>
