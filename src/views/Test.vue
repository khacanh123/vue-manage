<template>
    <h3 class="font-bold">Biến reactive trong Vue, watch, watchEffect</h3>
    <h1>giá trị của count: {{ count }}</h1>
    <h1>giá trị của count 1: {{ count1 }}</h1>
    <h1>Tên của tôi là {{ person.name }} - {{ person.age }} tuổi</h1>
    <br>
    <button @click="updateCount">Update count = 10</button> ||
    <button @click="count1 = 10 + count1">Update count + 10</button>
</template>

<script setup>
import { ref, reactive, onBeforeUpdate, onUpdated, watchEffect } from 'vue';

// count
const count = ref(0);
const count1 = ref(0);

const person = reactive({
    name: 'abc',
    age: 33,
})
// hiển thị 
console.log(count.value);
console.log(person.name);

// update count 
const updateCount = () => {
    count.value = 10
}
// update lifecycle
onBeforeUpdate(() => {
    console.log('before update');
})
onUpdated(() => {
    console.log('updated')
})
// watchEffect count
watchEffect(() => {
    console.log('giá trị count đã thay đổi');
})
watchEffect(() => {
    console.log('giá trị count 1 đã thay đổi');
})
</script>
<style>
button {
    border: 1px solid;
    padding: 3px;
}
</style>