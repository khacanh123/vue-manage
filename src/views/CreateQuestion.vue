<template>
    <h3 class="text-[25px] font-bold">Thêm câu hỏi </h3>
    <form>
        <div class="flex flex-wrap">
            <div class="w-1/3 px-7 py-3">
                <label for="tensp" class=" font-semibold">Tên câu hỏi</label>
                <InputText type="text" class="w-full" v-model="dataQuestion.name" />
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
            <Button type="button" class="w-[200px]" label="Tạo mới" @click="onSubmit" />
        </div>
    </form>
</template>
<script setup>
import { ref, reactive, watch } from "vue";
import Editor from 'primevue/editor';
import { useField, useForm } from 'vee-validate';
import createQuestionComp from '../components/CreateQuestion/index.vue'
const { handleSubmit, resetForm } = useForm();
const { value, errorMessage } = useField('value', validateField);

function validateField(value) {
    if (!value) {
        return 'Name - Surname is required.';
    }

    return true;
}
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
const quizTypeSelected = ref({ name: 'Tự luận', code: '0' })
const updateAnswer = (data) => {
    console.log(data);
    dataQuestion.dataAnswer = data
}
const onSubmit = () => {
    console.log(dataQuestion);
}

watch(() => quizTypeSelected.value, (newValue) => {
    dataQuestion.quizType = Number(newValue.code)
})
</script>