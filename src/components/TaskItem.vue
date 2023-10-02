<template>
    <div class="flex flex-wrap p-2">
        <div class="w-4/5">
            <p>{{ props.itemTask.summary }}</p>
        </div>
        <div class="w-1/5 flex justify-center">
            <RenderImg v-bind:img="props.itemTask.assign.img" />

        </div>
    </div>
</template>
<script setup>
import RenderImg from './RenderImg.vue';

const props = defineProps({
    itemTask: {
        type: Object,
        default: {}
    }
})
</script>