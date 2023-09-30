<template>
    <div class="flex pl-3 pt-3">
        <img v-if="props.comment.user == 1" src="https://jira.hocmai.com.vn/secure/useravatar?avatarId=10339"
            class="w-[5%] mr-3" />
        <p>Nguyễn Khắc Anh added comment - {{ friendlyData }}</p>

    </div>
    <div v-html="props.comment.comment" class="pl-3">
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { formatDistanceToNow } from 'date-fns';

const props = defineProps({
    comment: {
        type: Object,
        default: {}
    }
})
const friendlyData = computed(() => {
    return formatDistanceToNow(new Date(props.comment.time), { addSuffix: true });
})
</script>