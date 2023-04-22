<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-for="item in data">
      <h2 @click="goToDetail(item.id)">{{ item.p_name }}</h2>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {}
</style>
<script setup>
import firebase from '../utils/firebase';

import { onMounted, ref } from 'vue';

import { useRouter } from 'vue-router'
const router = useRouter()
const data = ref(null)
onMounted(() => {
  const todoRef = firebase.database().ref('product');
  todoRef.on('value', (snapshot) => {
    const todos = snapshot.val();
    const todoList = [];
    for (let id in todos) {
      todoList.push({ id, ...todos[id] });
    }
    console.log('====================================');
    console.log(todoList);
    console.log('====================================');
    data.value = todoList
  });
})

const goToDetail = (id) => {
  router.push({
    name: 'detail',
    params: {
      id: id
    }
  })
}

</script>
