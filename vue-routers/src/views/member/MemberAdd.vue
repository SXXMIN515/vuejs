<template>
  <h3>회원관리</h3>
  <nav id="breadcrums">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }">TOP</RouterLink></li>
      <li><RouterLink v-bind:to="{ name: 'MemberList' }">회원리스트</RouterLink></li>
      <li>회원정보추가</li>
    </ul>
  </nav>
  <section>
    <h3>회원정보추가</h3>
    <p>회원정보를 입력하고 추가버튼을 클릭하세요.</p>
    <form v-on:submit.prevent="onAdd">
      <dl>
        <dt><label for="">ID</label></dt>
        <dd><input type="number" v-model.number="member.id" /></dd>
        <dt><label for="">이름</label></dt>
        <dd><input type="text" v-model="member.name" /></dd>
        <dt><label for="">이메일</label></dt>
        <dd><input type="email" v-model="member.email" /></dd>
        <dt><label for="">연락처</label></dt>
        <dd><input type="number" v-model.number="member.phone" /></dd>
        <dt><label for="">주소</label></dt>
        <dd><input type="text" v-model="member.address" /></dd>
      </dl>
      <button type="submit">추가</button>
    </form>
  </section>
</template>

<script setup>
import { reactive, inject } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter(); // 라우터 객체.
// data.
const member = reactive({
  id: 0,
  name: "",
  email: "",
  points: 0,
  note: "",
});
const memberList = inject("memberList");

// 함수.
const onAdd = () => {
  memberList.set(member.id, member);
  // 목록이동.
  router.push({ name: "MemberList" });
};

axios
  .post("http://localhost:3000/customer", {
    id: member.id,
    name: member.name,
    email: member.email,
    phone: member.phone,
    address: member.address,
  })
  .then((resp) => {
    console.log(resp);
    member.value = resp.data[0];
  })
  .catch((err) => console.log(err));
</script>
