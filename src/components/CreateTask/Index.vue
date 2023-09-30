<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <Dialog v-model:visible="visible" closeable="false" modal header="Create Issue" :style="{ width: '40vw' }">
        <Form @submit="createTask" :validation-schema="schema" v-slot="{ errors }">
            <div class="">
                <div class="w-[350px] px-7 py-1">
                    <label for="tensp" class=" font-semibold">Dự án</label>
                    <Field name="idProject" v-model="dataIssue.idProject" as="select" class="form-control w-[200px]"
                        :class="{ 'is-invalid': errors.idProject }">
                        <option value="1">HinBroad - Agile</option>
                        <option value="2">Trung bình</option>
                        <option value="3">Khó</option>
                    </Field>
                </div>
                <div class="w-[350px] px-7 py-1">
                    <label for="tensp" class=" font-semibold">Issue Type</label>
                    <Field name="issueType" v-model="dataIssue.issueType" as="select" class="form-control w-[200px]"
                        :class="{ 'is-invalid': errors.issueType }">
                        <option value="1">Task</option>
                        <option value="2">Bug</option>
                        <option value="3">Story</option>
                    </Field>
                </div>
                <div class="w-full px-7 py-1">
                    <label for="tensp" class=" font-semibold">Tên công việc</label>
                    <Field name="summary" v-model="dataIssue.summary" as="input" class="form-control w-[200px]"
                        :class="{ 'is-invalid': errors.summary }">
                    </Field>
                </div>
                <div class="w-[350px] px-7 py-1">
                    <label for="tensp" class=" font-semibold">Người báo cáo</label>
                    <Field name="reporter" v-model="dataIssue.reporter" as="select" class="form-control w-[200px]"
                        :class="{ 'is-invalid': errors.reporter }">
                        <option value="1">Task</option>
                        <option value="2">Bug</option>
                        <option value="3">Story</option>
                    </Field>
                </div>
                <div class="w-full  px-7 py-1">
                    <label for="" class=" font-semibold">Nội dung câu hỏi</label>
                    <Editor v-model="dataIssue.text" editorStyle="height: 100px" />
                </div>
                <div class="w-[350px] px-7 py-1">
                    <label for="tensp" class=" font-semibold">Người thực hiện</label>
                    <Field name="Assignee" v-model="dataIssue.Assignee" as="select" class="form-control w-[200px]"
                        :class="{ 'is-invalid': errors.Assignee }">
                        <option value="1">Task</option>
                        <option value="2">Bug</option>
                        <option value="3">Story</option>
                    </Field>
                </div>
                <div class="w-[350px] px-7 py-1">
                    <label for="tensp" class=" font-semibold">Sprint</label>
                    <Field name="activeSprint" v-model="dataIssue.activeSprint" as="select" class="form-control w-[200px]"
                        :class="{ 'is-invalid': errors.activeSprint }">
                        <option value="1">Task</option>
                        <option value="2">Bug</option>
                        <option value="3">Story</option>
                    </Field>
                </div>
            </div>
            <div class="flex justify-end px-7">
                <Button type="button" class="m-2" label="cancel" severity="secondary" outlined
                    @click="emits('closeDialog')" />
                <Button type="submit" class="m-2" label="Tạo" />
            </div>
        </Form>
    </Dialog>
</template>
<script setup>
import { reactive } from 'vue';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup'
import Editor from 'primevue/editor';
import { useToast } from "primevue/usetoast";
import firebase from '@/utils/firebase';
import { useIssueActive } from '@/stores/getIssueActive'
const { getListIssueActive } = useIssueActive()
const dataIssue = reactive({
    idProject: '',
    issueType: '',
    summary: '',
    reporter: '',
    text: '',
    Assignee: '',
    activeSprint: '',
    status: '0'
})
const schema = Yup.object().shape({
    idProject: Yup.string()
        .required('Chưa chọn project'),
    issueType: Yup.string().required('Chưa chọn kiểu issue'),
    summary: Yup.string().required('Chưa nhập tên task'),
    reporter: Yup.string().required('Chưa chọn người report'),
    Assignee: Yup.string().required('Chưa chọn người thực hiện')
});
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['closeDialog'])
const visible = props.visible

const createTask = (values) => {
    const value = values;
    value.text = dataIssue.text
    value.status = 0
    const product = firebase.database().ref('ListBacklog');
    product.push(values);
    getListIssueActive(1)
    emits('closeDialog')
}

</script>
<style>
.p-dialog-header-icon {
    display: none !important;
}
</style>