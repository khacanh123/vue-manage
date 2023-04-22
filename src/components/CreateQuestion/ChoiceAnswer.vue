<template>
    <div class="w-4/5">
        <Editor editorStyle="height: 100px" v-model="item.content" />
    </div>
    <div class="w-1/5 px-4 flex items-center">
        <i class="fa fa-trash text-[red] text-[16px]"></i>
        <div class="ml-2">
            <RadioButton v-model="props.ingredient" inputId="ingredient1" :value="item.answer" />
        </div>
    </div>
</template>

<script setup>
import { watch } from 'vue';
import Editor from 'primevue/editor';

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
const item = props.item;

// watch
watch(() => item.content, (newValue) => {
    console.log(newValue);
})
</script>