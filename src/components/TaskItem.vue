<template>
    <div class="flex flex-wrap p-2">
        <div class="w-4/5">
            <p>{{ props.itemTask.summary }}</p>
        </div>
        <div class="w-1/5 flex justify-center">
            <img v-if="props.itemTask.Assignee == 1" src="https://jira.hocmai.com.vn/secure/useravatar?avatarId=10339"
                class="w-[70%]" />

            <img v-if="props.itemTask.Assignee == 2" src="https://jira.hocmai.com.vn/secure/useravatar?avatarId=10338"
                class="w-[70%]" />

            <img v-if="props.itemTask.Assignee == 3" src="https://jira.hocmai.com.vn/secure/useravatar?avatarId=10340"
                class="w-[70%]" />

        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    itemTask: {
        type: Object,
        default: {}
    }
})
console.log(props.itemTask);
</script>