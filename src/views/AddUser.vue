<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <div class="flex justify-between">
        <p class="text-2xl font-bold">Manage User</p>
        <Button label="Show" icon="pi pi-external-link" class="h-[30px]" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Add User" :style="{ width: '50vw' }">
            <div>
                <Form :validation-schema="schema" v-slot="{ errors }" @submit="handleCreateUser">
                    <div class="flex flex-wrap">
                        <div class="w-full px-7 py-3">
                            <label for="tensp" class=" font-semibold">Full Name</label>
                            <Field type="text" class="form-control" v-model="dataUser.full_name" name="full_name"
                                :class="{ 'p-invalid': errors.full_name }" />
                            <small class="p-error">{{ errors.full_name || '&nbsp;' }}</small>
                        </div>
                        <div class="w-1/2 px-7 py-3">
                            <label for="tensp" class=" font-semibold">User Name</label>
                            <Field type="text" class="form-control" v-model="dataUser.user_name" name="user_name"
                                :class="{ 'p-invalid': errors.user_name }" />
                            <small class="p-error">{{ errors.user_name || '&nbsp;' }}</small>
                        </div>
                        <div class="w-1/2 px-7 py-3">
                            <label for="tensp" class=" font-semibold">Password</label>
                            <Field type="password" class="form-control" v-model="dataUser.password" name="password" />
                        </div>
                        <div class="w-1/3 px-7 py-3">
                            <label for="tensp" class=" font-semibold">Email</label>
                            <Field type="text" class="form-control" v-model="dataUser.email"
                                :class="{ 'p-invalid': errors.emai }" />
                            <small class="p-error">{{ errors.email || '&nbsp;' }}</small>
                        </div>
                        <div class="w-1/3 px-7 py-3">
                            <label for="tensp" class=" font-semibold">Level</label>
                            <Field name="level" as="select" class="form-control" v-model="dataUser.level">
                                <option value="0">Admin</option>
                                <option value="1">User</option>
                            </Field>
                        </div>
                        <div class="w-1/3 px-7 py-3">
                            <label for="tensp" class=" font-semibold">Status</label>
                            <Field name="status" as="select" class="form-control" v-model="dataUser.status">
                                <option value="0">Active</option>
                                <option value="1">InActive</option>
                            </Field>
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
        <Column field="full_name" header="Full name"></Column>
        <Column field="user_name" header="Username"></Column>
        <Column field="p_status" header="status"></Column>
        <Column style="flex: 0 0 4rem" header="Action">
            <template #body="{ data, frozenRow, index }">
                <i class="pi pi-pencil" style="font-size: 18px" @click="setDataUpdate(data, frozenRow, index)"></i>
            </template>
        </Column>

    </DataTable>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup'
import firebase from '@/utils/firebase';

const visible = ref(false);
const editUser = ref({
    id: '',
    isEdit: false,
})
const listUser = ref(null)
const dataUser = reactive({
    full_name: '',
    user_name: '',
    password: '12345678',
    level: '1',
    status: '0',
    idCompany: 1,
    email: ''
})
const schema = Yup.object().shape({
    full_name: Yup.string().required('Require'),
    user_name: Yup.string().required('Require'),
    email: Yup.string().required('Require'),
})

const handleCreateUser = (values) => {
    if (editUser.value.isEdit) {
        firebase
            .database()
            .ref("list-user/" + editUser.value.id)
            .update(dataUser);
        editUser.value.id = '';
        editUser.value.isEdit = false;
        visible.value = false
        return
    }
    const addUser = firebase.database().ref('list-user');
    addUser.push(dataUser);
    visible.value = false
}

const setDataUpdate = (data, frozen, index) => {
    dataUser.full_name = data.full_name;
    dataUser.user_name = data.user_name;
    dataUser.level = data.level;
    dataUser.password = data.password;
    dataUser.status = data.status;
    dataUser.email = data.email;
    editUser.value.id = data.id;
    editUser.value.isEdit = true;
    visible.value = true;
}

onMounted(() => {
    const todoRef = firebase.database().ref('list-user');
    todoRef.on('value', (snapshot) => {
        const todos = snapshot.val();
        const todoList = [];
        for (let id in todos) {
            todoList.push({ id, ...todos[id], p_status: todos[id].status == '0' ? 'Active' : 'InActive' });
        }
        listUser.value = todoList
    });
})


</script>