<template>
    <div class="p-12">
        <h3 class="text-center text-[30px] font-bold">Danh sách dự án</h3>
        <table id="customers">
            <thead>
                <th>STT</th>
                <th>Tên dự án</th>
                <th>Key</th>
                <th>Leader</th>
            </thead>
            <tbody>
                <tr v-for="(item, index) in allProjects" @click=" router.push({
                    name: 'blacklogproject',
                    params: {
                        key: item.key
                    }
                })">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.key }}</td>
                    <td>Admin</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import firebase from "@/utils/firebase";

const router = useRouter()
const allProjects = ref([])
onMounted(() => {
    const todoRef = firebase.database().ref('list-project');
    todoRef.on('value', (snapshot) => {
        const todos = snapshot.val();
        const todoList = [];
        for (let id in todos) {
            todoList.push({ id, ...todos[id] });
        }
        allProjects.value = todoList
    });
})
</script>
<style>
#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#customers td,
#customers th {
    border: 1px solid #ddd;
    padding: 8px;
}

#customers tr:nth-child(even) {
    background-color: #f2f2f2;
}

#customers tr:hover {
    background-color: #ddd;
}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
}
</style>