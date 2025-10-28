<template>
  <div class="login-container">
    <div class="signin-box" v-if="!isLoggedIn">
      <input v-model="id" placeholder="아이디" class="login-input" />
      <input v-model="pw" placeholder="비밀번호" type="password" class="login-input" />
      <div class="btn-group">
        <button class="login-btn" v-on:click="loginHandler">로그인</button>
        <!-- <button class="signup-btn">회원가입</button> -->
      </div>
    </div>
    <div v-else class="login-box">
      <p>환영합니다, {{ authStore.auth.name }}님!</p>
      <button class="logout-btn" v-on:click="logoutHandler">로그아웃</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { fetchAuth } = authStore;
const { logout } = authStore;
const id = ref("");
const pw = ref("");

// 로그인 여부 계산
const isLoggedIn = computed(() => authStore.auth !== null);

const loginHandler = async () => {
  if (!id.value || !pw.value) {
    alert("아이디 또는 비밀번호를 입력해주세요.");
    return;
  }

  await fetchAuth(id.value, pw.value);
  id.value = "";
  pw.value = "";
};

const logoutHandler = () => {
  alert("로그아웃 되었습니다.");
  logout();
};
</script>

<style scoped>
/* 전체 로그인 박스 */
.login-container {
  position: fixed; /* 화면 고정 */
  top: 20px; /* 상단 여백 */
  right: 20px; /* 오른쪽 여백 */
  display: flex;
  justify-content: flex-end;
  z-index: 1000; /* 다른 요소 위로 */
}

/* 내부 박스 */
.signin-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffffcc;
  backdrop-filter: blur(6px);
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 8px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 인풋 스타일 */
.login-input {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 6px 8px;
  font-size: 14px;
  outline: none;
  width: 120px;
  transition: border 0.2s;
}

.login-input:focus {
  border-color: #007bff;
}

/* 로그아웃 박스 */
.login-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #007bffcc; /* 파란색 배경 */
  color: white;
  border-radius: 12px;
  padding: 8px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-weight: bold;
}

/* 환영 메시지 */
.login-box p {
  margin: 0;
  font-size: 14px;
}

/* 로그아웃 버튼 */
.logout-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.logout-btn:hover {
  background-color: #c0392b;
}

/* 버튼 그룹 */
.btn-group {
  display: flex;
  gap: 6px; /* 버튼 간격 */
}

/* 공통 버튼 스타일 */
.btn-group button {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
}

/* 로그인 버튼 */
.login-btn {
  background-color: #007bff;
  color: white;
}

.login-btn:hover {
  background-color: #0056b3;
}

/* 회원가입 버튼 */
.signup-btn {
  background-color: #1db875;
  color: white;
}

.signup-btn:hover {
  background-color: #178e5b;
}
</style>
