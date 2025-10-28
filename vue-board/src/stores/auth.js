import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const saved = localStorage.getItem("auth");
  const auth = ref(saved ? JSON.parse(saved) : null); // state

  // action : 데이터변경.
  const addAuth = async (newAuth) => {
    const result = await axios.post("http://192.168.0.13:3000/signup", { param: newAuth });
    console.log("InsertId: " + result.data.insertId);
  };

  // 로그인
  const fetchAuth = async (id, pw) => {
    try {
      const response = await axios.post("http://192.168.0.13:3000/signin", {
        email: id,
        password: pw,
      });

      if (response.data.userId) {
        auth.value = response.data;
        localStorage.setItem("auth", JSON.stringify(response.data)); // 저장
      } else {
        auth.value = null;
        localStorage.removeItem("auth");
      }
    } catch {
      auth.value = null;
      localStorage.removeItem("auth");
    }
  };

  // 로그아웃
  const logout = () => {
    auth.value = null;
    localStorage.removeItem("auth");
  };

  return { auth, addAuth, fetchAuth, logout };
});
