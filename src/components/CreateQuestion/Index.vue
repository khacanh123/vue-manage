<template>
    <div v-if="props.quizType == 1">
        <MultiOneRight v-on:getDataQuestion="getDataQuestion" />
    </div>
</template>

<script setup>
import { watch } from 'vue';
import MultiOneRight from './MultiOneRight.vue';
const props = defineProps({
    quizType: {
        type: Number,
        default: 0
    }
})
const emit = defineEmits(['updateAnswer']);
const getDataQuestion = (data) => {
    emit('updateAnswer', data)
}

</script>