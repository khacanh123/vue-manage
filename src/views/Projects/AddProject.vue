<template>
    <div>
        <div class="font-bold flex justify-center">
            <div class="w-[450px]">
                <p class="text-center text-[30px] font-bold">Thêm mới dự án</p>
                <div class=" py-3">
                    <label for="" class="font-bold pb-2">Tên dự án:</label>
                    <InputText type="text" class="w-full md:w-20rem" v-model="projectData.name" />
                </div>
                <div class=" py-3">
                    <label for="" class="font-bold pb-2">Key dự án:</label>
                    <InputText type="text" class="w-full md:w-20rem" v-model="projectData.key" />
                </div>
                <div class="py-3">
                    <label for="" class="font-bold pb-2">Người tham gia:</label>
                    <MultiSelect v-model="projectData.selectedUsers" :options="listUser" optionLabel="name"
                        placeholder="Chọn" :maxSelectedLabels="12" class="w-full md:w-20rem" />
                </div>
                <div class="flex justify-center">
                    <Button label="Thêm mới" @click="addNewProject" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import firebase from '@/utils/firebase';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router'
const router = useRouter()
const toast = useToast();

// const selectedUsers = ref();
const projectData = reactive({
    name: '',
    key: '',
    selectedUsers: [],
    blacklog: [],
    newsprint: {
        timeStart: '',
        timeEnd: '',
        goal: '',
        sprintCode: '',
        namesprint: ''
    },
    activesprint: {
        timeStart: '',
        timeEnd: '',
        goal: '',
        sprintCode: '',
        namesprint: '',
    },
})
const listUser = ref();

// watch(() => selectedCities.value, () => {
//     console.log(selectedCities.value);
// })
onMounted(() => {
    const todoRef = firebase.database().ref('list-user');
    todoRef.on('value', (snapshot) => {
        const todos = snapshot.val();
        const todoList = [];
        for (let id in todos) {
            todoList.push({ id, ...todos[id], p_status: todos[id].status == '0' ? 'Active' : 'InActive' });
        }
        listUser.value = todoList.map((item) => {
            return {
                name: item.full_name,
                code: item._id
            }
        })
    });
})
const addNewProject = () => {
    if (projectData.name.trim() === '' || projectData.name.trim() === '' || projectData.selectedUsers.length === 0) {
        return toast.add({ severity: 'error', summary: 'error', detail: 'Bạn chưa nhập đầy đủ thông tin!', life: 3000 })

    }
    else {
        const addUser = firebase.database().ref('list-project');
        const cloneData = { ...projectData }
        cloneData.selectedUsers = JSON.parse(JSON.stringify(cloneData.selectedUsers))
        cloneData.blacklog = JSON.parse(JSON.stringify(cloneData.blacklog))
        cloneData.activesprint = JSON.parse(JSON.stringify(cloneData.activesprint))
        cloneData.newsprint = JSON.parse(JSON.stringify(cloneData.newsprint))
        toast.add({ severity: 'success', summary: 'success', detail: 'Tạo mới dự án thành công!', life: 3000 })
        addUser.push(cloneData);
        router.push({
            name: 'listproject',

        })
    }
}
</script>