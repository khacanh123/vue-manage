<script setup>
import { ref, reactive, watch } from "vue";
import Editor from 'primevue/editor';
import { Form, Field } from 'vee-validate';
import createQuestionComp from '../components/CreateQuestion/index.vue'
import * as Yup from 'yup'
const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const quizType = ref([
    { name: 'Trắc nghiệm 1 đáp án', code: '1' },
    { name: 'Trắc nghiệm đúng sai', code: '2' },
    { name: 'Câu hỏi trả lời ngắn', code: '3' },
    { name: 'Kéo thả', code: '4' },
    { name: 'Tự luận', code: '0' }
]);
const dataQuestion = reactive({
    quizType: 0,
    name: '',
    tags: '',
    typeQues: '',
    level: '',
    text: '',
    solution: '',
    dataAnswer: null
})
// schema validate
const schema = Yup.object().shape({
    name: Yup.string().required('Ten cau hoi khong de trong')
})
const quizTypeSelected = ref({ name: 'Tự luận', code: '0' })
const updateAnswer = (data) => {
    console.log(data);
    dataQuestion.dataAnswer = data
}
const onSubmit = (values) => {
    console.log('====================================');
    console.log(values);
    console.log('====================================');
}
watch(() => quizTypeSelected.value, (newValue) => {
    dataQuestion.quizType = Number(newValue.code)
})
</script>
<template>
    <h3 class="text-[25px] font-bold">Thêm câu hỏi </h3>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <div class="flex flex-wrap">
            <div class="w-1/3 px-7 py-3">
                <label for="tensp" class=" font-semibold">Tên câu hỏi</label>
                <InputText type="text" class="w-full" name="name" :class="{ 'p-invalid': errors.name }" />
                <small class="p-error">{{ errors.name || '&nbsp;' }}</small>
            </div>
            <div class="w-1/3 px-7 py-3">
                <label for="tensp" class=" font-semibold">Định danh câu hỏi</label>
                <InputText type="text" v-model="dataQuestion.tags" class="w-full" />
            </div>
            <div class="w-1/3 px-7 py-3">
                <label for="tensp" class=" font-semibold">Lĩnh vực câu hỏi</label>
                <InputText type="text" v-model="dataQuestion.typeQues" class="w-full" />
            </div>

            <div class="w-1/3 px-7 py-3">
                <label for="tensp" class=" font-semibold">Độ khó</label>
                <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City"
                    class="w-full" />
            </div>
            <div class="w-1/3 px-7 py-3">
                <label for="tensp" class=" font-semibold">Loại câu hỏi</label>
                <Dropdown v-model="quizTypeSelected" :options="quizType" optionLabel="name" placeholder="Chọn loại câu hỏi"
                    class="w-full" />
            </div>
            <div class="w-full  px-7 py-3">
                <label for="" class=" font-semibold">Nội dung câu hỏi</label>
                <Editor v-model="dataQuestion.text" editorStyle="height: 100px" />
            </div>
            <div class="w-full  px-7 py-3">
                <label for="" class=" font-semibold">Nội dung giải thích</label>
                <Editor v-model="dataQuestion.solution" editorStyle="height: 100px" />
            </div>
        </div>
        <div>
            <createQuestionComp v-bind:quizType="dataQuestion.quizType" v-on:updateAnswer="updateAnswer" />
        </div>

        <div class="flex justify-center">
            <Button type="submit" class="w-[200px]" label="Tạo mới" />
        </div>
    </Form>
</template>
