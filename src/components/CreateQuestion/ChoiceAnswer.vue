<template>
    <div class="w-4/5">
        <Editor editorStyle="height: 100px" v-model="item.content" />
    </div>
    <div class="w-1/5 px-4 flex items-center">
        <i class="fa fa-trash text-[red] text-[16px]"></i>
        <div class="ml-2">
            <input type="radio" :value="item.answer" v-model="detect" :id="'hhh' + item.answer" name="aaa" />
        </div>
    </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import Editor from 'primevue/editor';
const detect = ref('')
const props = defineProps({
    item: {
        type: Object,
        default: {}
    },
    ingredient: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['handleChangeAnswer', 'handleChangeAnswerTrue'])
const item = props.item;

// watch
watch(() => item.content, (newValue) => {
    emit('handleChangeAnswer', { answer: item.answer, content: newValue })
})

watch(() => detect.value, (newValue) => {
    emit('handleChangeAnswerTrue', newValue)
})
</script>