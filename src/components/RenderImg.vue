<template>
    <!-- <div v-for="(item, index) in arrImage" v-if="index == props.img"> -->
    <img class="h-[40px] w-[40px] rounded-full"
        v-bind:src="props.img == 1 ? '/src/assets/images/' + props.img + '.png' : '/src/assets/images/' + props.img + '.svg'"
        v-if="props.img != ''" />
    <!-- </div> -->
</template>
<script setup>
const props = defineProps({
    img: {
        type: String,
        default: ''
    }
})
console.log(props.img);
const arrImage = Array.from({ length: 15 })
</script>