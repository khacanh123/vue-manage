<template>
    <div class="px-7 py-3">
        <h3 class="pb-2 font-semibold">Câu trả lời</h3>
        <div class="flex items-center py-3" v-for="item in dataAnswer">
            <ChoiceAnswer v-bind:item="item" v-bind:ingredient="ingredient" v-on:handleChangeAnswer="handleChangeAnswer"
                v-on:handleChangeAnswerTrue="handleChangeAnswerTrue" />
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import ChoiceAnswer from './ChoiceAnswer.vue';
const ingredient = ref('');
const dataAnswer = ref([
    {
        content: 'aaaa',
        answer: '1'
    },
    {
        content: '',
        answer: '2'
    },
    {
        content: '',
        answer: '3'
    },
    {
        content: '',
        answer: '4'
    }
])
const emits = defineEmits(['getDataQuestion'])
// cập nhật thay đổi đáp án 
const handleChangeAnswer = (item) => {
    const indexChange = dataAnswer.value.findIndex((dt) => dt.answer === item.answer);
    dataAnswer[indexChange] = item;
    const data = {
        listAnswer: dataAnswer.value,
        answer_true: ingredient
    }
    emits('getDataQuestion', data)
}

const handleChangeAnswerTrue = (value) => {
    const data = {
        listAnswer: dataAnswer.value,
        answer_true: value
    }
    emits('getDataQuestion', data)
}


</script>