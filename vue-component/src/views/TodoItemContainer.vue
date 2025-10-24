<template>
  <li v-bind:class="{ completed: todo.completed }">
    <span v-on:click="handleToggle">{{ todo.text }}</span>
    <TodoItemButton v-bind:item-id="todo.id" />
  </li>
</template>

<script setup>
import { defineProps, inject } from "vue";
import TodoItemButton from "./TodoItemButton.vue";

// inject..
const toggleComplete = inject("toggleComplete");
// props..
const props = defineProps({
  todo: { type: Object, required: true },
});

// 함수.
const handleToggle = () => {
  toggleComplete(props.todo.id);
};
</script>

<style scoped>
.completed span {
  text-decoration: line-through;
  color: gray;
}
</style>
