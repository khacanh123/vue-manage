<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <div class="flex justify-between">
        <p class="text-2xl font-bold">Manage course</p>
        <Button label="Show" icon="pi pi-external-link" class="h-[30px]" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Add User" :style="{ width: '50vw' }">
            <div>
                <Form v-slot="{ errors }" @submit="handleCreateUser">
                    <div class="flex flex-wrap">
                        <div class="w-full px-7 py-3">
                            <label for="tensp" class=" font-semibold">Course Name</label>
                            <Field type="text" class="form-control" v-model="dataUser.course_name" name="full_name"
                                :class="{ 'p-invalid': errors.course_name }" />
                            <small class="p-error">{{ errors.course_name || '&nbsp;' }}</small>
                        </div>
                        <div class="w-1/2 px-7 py-3">
                            <label for="tensp" class=" font-semibold">Teacher</label>
                            <Field type="text" class="form-control" v-model="dataUser.teacher" name="user_name"
                                :class="{ 'p-invalid': errors.teacher }" />
                            <small class="p-error">{{ errors.teacher || '&nbsp;' }}</small>
                        </div>
                        <div class="w-1/2 px-7 py-3">
                            <label for="tensp" class=" font-semibold">Total student</label>
                            <Field type="number" class="form-control" v-model="dataUser.num" name="password" />
                        </div>
                        <div class="w-1/3 px-7 py-3">
                            <label for="tensp" class=" font-semibold">Time Start</label>
                            <Calendar id="calendar-24h" v-model="datetime24h" showTime hourFormat="24" />
                        </div>
                        <div class="w-1/3 px-7 py-3">
                            <label for="tensp" class=" font-semibold">Status</label>
                            <Field name="level" as="select" class="form-control" v-model="dataUser.status">
                                <option value="0">Đang mở đăng ký</option>
                                <option value="1">Đã diễn ra</option>
                            </Field>
                        </div>
                        <div class="w-1/3 px-7 py-3">
                            <label for="tensp" class=" font-semibold">Money</label>
                            <Field name="status" type="text" class="form-control" v-model="dataUser.money" />
                        </div>
                        <div class="w-full px-7 py-3">
                            <label for="tensp" class=" font-semibold">Description</label>
                            <Editor editorStyle="height: 100px" v-model="dataUser.description" />

                        </div>

                    </div>
                    <div class="flex justify-center">
                        <Button type="button" class="m-2 w-[200px]" label="cancel" severity="secondary" outlined
                            @click="visible = false" />
                        <Button type="submit" class="w-[200px] m-2" :label="editUser.isEdit ? 'Edit' : 'Create'" />
                    </div>
                </Form>
            </div>
        </Dialog>

    </div>
    <DataTable :value="listUser" showGridlines tableStyle="min-width: 50rem">
        <Column field="id" header="ID"></Column>
        <Column field="course_name" header="Full name"></Column>
        <Column field="teacher" header="Username"></Column>
        <Column field="p_status" header="status"></Column>
        <Column style="flex: 0 0 4rem" header="Action">
            <template #body="{ data, frozenRow, index }">
                <i class="pi pi-pencil" style="font-size: 18px" @click="setDataUpdate(data, frozenRow, index)"></i>
            </template>
        </Column>

    </DataTable>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup'
import firebase from '@/utils/firebase';
import Editor from 'primevue/editor';
import Calendar from 'primevue/calendar';

const visible = ref(false);
const editUser = ref({
    id: '',
    isEdit: false,
})
const datetime24h = ref();

const listUser = ref(null)
const dataUser = reactive({
    course_name: '',
    teacher: '',
    num: '',
    status: '0',
    timeStart: '',
    money: '',
    description: ''
})
const schema = Yup.object().shape({
    course_name: Yup.string().required('Require'),
    teacher: Yup.string().required('Require'),
})

const handleCreateUser = (values) => {
    // let dataPush = dataUser;
    dataUser.timeStart = new Date(datetime24h.value).toISOString()
    if (editUser.value.isEdit) {
        firebase
            .database()
            .ref("list-course/" + editUser.value.id)
            .update(dataUser);
        editUser.value.id = '';
        editUser.value.isEdit = false;
        visible.value = false
        return
    }
    const addUser = firebase.database().ref('list-course');
    addUser.push(dataUser);
    visible.value = false
}

const setDataUpdate = (data, frozen, index) => {
    dataUser.course_name = data.course_name;
    dataUser.teacher = data.teacher;
    datetime24h.value = dataUser.timeStart;
    dataUser.money = data.money;
    dataUser.num = data.num;
    dataUser.description = data.description;
    dataUser.status = data.status;
    editUser.value.id = data.id;
    editUser.value.isEdit = true;
    visible.value = true;
}

onMounted(() => {
    const todoRef = firebase.database().ref('list-course');
    todoRef.on('value', (snapshot) => {
        const todos = snapshot.val();
        const todoList = [];
        for (let id in todos) {
            todoList.push({ id, ...todos[id], p_status: todos[id].status == '0' ? 'Đang mở đăng ký' : 'Đã diễn ra' });
        }
        listUser.value = todoList
    });
})



</script>