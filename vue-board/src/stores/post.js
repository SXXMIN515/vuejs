import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePostStore = defineStore("post", () => {
  const posts = ref([]); // state

  // getter : 가공된 state 반환.
  const getPostById = (id) => {
    id = parseInt(id); // 라우트 파라미터에서 id 가져오기
    console.log("getPostById called with id:", id);
    return posts.value.find((post) => post.id === id);
  };

  // action : 데이터변경.
  const addPost = async (newPost) => {
    const result = await axios.post("http://localhost:3000/board", { param: newPost });
    // console.log("InsertId: " + result.data.insertId);
    posts.value.push({ ...newPost, id: result.data.insertId });
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:3000/board/${id}`);
    posts.value = posts.value.filter((post) => post.id !== id);
  };

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:3000/boards");
    posts.value = response.data;
  };

  const modifyPost = async (updatedPost) => {
    const result = await axios.put("http://localhost:3000/board", { param: updatedPost });
    // console.log("InsertId: " + result.data.insertId);
    posts.value.push({ ...updatedPost, id: result.data.insertId });
  };

  return { posts, getPostById, addPost, deletePost, fetchPosts, modifyPost };
});
