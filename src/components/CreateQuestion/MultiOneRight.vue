<template>
    <div class="px-7 py-3">
        <h3 class="pb-2 font-semibold">Câu trả lời</h3>
        <div class="flex items-center py-3" v-for="item in dataAnswer">
            <ChoiceAnswer v-bind:item="item" v-bind:ingredient="ingredient" />
        </div>
    </div>
</template>
<script setup>
import Editor from 'primevue/editor';
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
watch(() => ingredient.value, (value, oldValue) => {
    const data = {
        listAnswer: dataAnswer.value.map((item) => {
            return {
                content: item.content,
                answer: item.answer
            }
        }),
        answer_true: value
    }
    emits('getDataQuestion', data)
})
watch(() => dataAnswer.value, (value, oldValue) => {
    console.log(value);
    const data = {
        listAnswer: dataAnswer.value.map((item) => {
            return {
                content: item.content,
                answer: item.answer
            }
        }),
        answer_true: value
    }
    emits('updateAnswer', data)
})
</script>