<template>
    <div class="description bg-white border-b-2 border-[ #ebecf0] z-[99999]">
        <div class="flex justify-between">
            <div>
                <div class="text-[14px] text-[#6b778c]">HIN BROAD </div>
                <div class="text-[24px] text-[#172b4d] pb-1">HinBroad Sprint 1</div>
                <div class="w-100px">- Build câu trúc project - Trang Active Sprint</div>
            </div>
            <div class="flex">
                <div class="flex items-center">

                    <i class="pi pi-clock"></i>
                    <p class="pl-2"> còn lại 3 ngày</p>
                </div>
                <div>

                </div>
            </div>
        </div>
        <div class="py-2 flex items-center bg-white">
            <div>Sắp xếp theo: </div>
            <div class="m-2 p-3 text-[#0052cc] hover:border hover:border-[#ddd]"
                :class="filterMyIssue ? 'bg-[#344563] text-[#fff]' : ''" @click="filterMyIssue = !filterMyIssue">Công việc
                của tôi </div>
            <div class="m-2 text-[#0052cc] hover:border hover:border-[#ddd] p-3">Cập nhật gần đây </div>
        </div>
    </div>
    <div class="content z-1 m-3">
        <div :class="showTaskDetail ? 'w-3/4 ' : 'w-full'">
            <div class=" overflow-y-auto h-[43vw] flex">
                <div class="w-1/5 relative">
                    <div class="text-[#5e6c84] w-full p-[5px] bg-white z-[99999] text-[16px] pt-3 fixed">
                        <p>TODO</p>
                    </div>
                    <div class="h-[25vw] mt-12">
                        <draggable v-model="data.todo" tag="div" group="meals" :animation="300" class="h-full">
                            <template #item="{ element: meal }">
                                <div class="task-item my-3 mx-[5px]" :class="activeID == meal.id ? 'bg-[#ebecf0]' : ''"
                                    @click="clickItem(meal)">
                                    <TaskItem v-bind:itemTask="meal" />
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
                <div class="w-1/5">
                    <h3 class="text-[#5e6c84] w-full p-[5px] bg-white z-[99999] text-[16px] pt-3 fixed">PENDING</h3>
                    <div class="h-[25vw] mt-12">
                        <draggable v-model="data.pending" tag="div" group="meals" :animation="300" class="h-full">
                            <template #item="{ element: meal }">
                                <div class="task-item my-3 mx-[5px]" :class="activeID == meal.id ? 'bg-[#ebecf0]' : ''"
                                    @click="clickItem(meal)">
                                    <TaskItem v-bind:itemTask="meal" />
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
                <div class="w-1/5">
                    <h3 class="text-[#5e6c84] w-full p-[5px] bg-white z-[99999] text-[16px] pt-3 fixed">IN PROGRESS</h3>
                    <div class="h-[25vw] mt-12">
                        <draggable v-model="data.progress" tag="div" group="meals" :animation="300" class="h-full">
                            <template #item="{ element: meal }">
                                <div class="task-item my-3 mx-[5px]" :class="activeID == meal.id ? 'bg-[#ebecf0]' : ''"
                                    @click="clickItem(meal)">
                                    <TaskItem v-bind:itemTask="meal" />

                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
                <div class="w-1/5">
                    <h3 class="text-[#5e6c84] w-full p-[5px] bg-white z-[99999] text-[16px] pt-3 fixed">IN TESTING</h3>
                    <div class="h-[25vw] mt-12">
                        <draggable v-model="data.testing" tag="div" group="meals" :animation="300" class="h-full">
                            <template #item="{ element: meal }">
                                <div class="task-item my-3 mx-[5px]" :class="activeID == meal.id ? 'bg-[#ebecf0]' : ''"
                                    @click="clickItem(meal)">
                                    <TaskItem v-bind:itemTask="meal" />

                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
                <div class="w-1/5">
                    <h3 class="text-[#5e6c84] w-full p-[5px] bg-white z-[99999] text-[16px] pt-3 fixed">DONE</h3>
                    <div class="h-[25vw] mt-12">
                        <draggable v-model="data.done" tag="div" group="meals" :animation="300" class="h-full">
                            <template #item="{ element: meal }">
                                <div class="task-item my-3 mx-[5px]" :class="activeID == meal.id ? 'bg-[#ebecf0]' : ''"
                                    @click="clickItem(meal)">
                                    <TaskItem v-bind:itemTask="meal" />

                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
            </div>
        </div>
        <div :class="showTaskDetail ? 'w-1/4 block z-[99999] overflow-y-auto h-[43vw]' : 'w-0 hidden'">
            <!-- <div v-if="showTaskDetail" class="overflow-y-auto"> -->
            <DetailTask v-on:closeTaskDetail="closeDetailTask" v-bind:detailTask="detailTask.data" v-if="showTaskDetail" />

            <!-- </div> -->
            <!-- <DetailTask v-on:closeTaskDetail="showTaskDetail = !showTaskDetail" /> -->
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue';
import draggable from 'vuedraggable';
import DetailTask from '../components/DetailTask.vue'
import TaskItem from '../components/TaskItem.vue'
import { storeToRefs } from 'pinia'
import { useIssueActive } from '../stores/getIssueActive'
import { useManageStatus } from '../stores/manageStatus';

import { useRoute } from "vue-router";
const route = useRoute();
const { allIssue } = storeToRefs(useIssueActive())
const { activeID } = storeToRefs(useManageStatus())
const { getListIssueActive, updateStatusIssue } = useIssueActive()
const { checkCloseSideBar, setActiveID } = useManageStatus();

const data = reactive({
    todo: [],  //0
    pending: [],//1
    progress: [],//2
    testing: [],//3
    done: []//4
})
const showTaskDetail = ref(false)
const detailTask = reactive({
    data: null
});
const filterMyIssue = ref(false)
getListIssueActive(1)

const allIssueTodo = computed(() => {
    return data.pending.length
})
const allIssuePending = computed(() => {
    return data.pending.length
})
const allIssueProgress = computed(() => {
    return data.progress.length
})
const allIssueTesting = computed(() => {
    return data.testing.length
})
const allIssueDone = computed(() => {
    return data.done.length
})

watch(() => allIssue, () => {
    data.todo = allIssue.value.filter((item) => item.status == 0)
    data.pending = allIssue.value.filter((item) => item.status == 1)
    data.progress = allIssue.value.filter((item) => item.status == 2)
    data.testing = allIssue.value.filter((item) => item.status == 3)
    data.done = allIssue.value.filter((item) => item.status == 4)
}, {
    deep: true
})
watch(() => filterMyIssue.value, () => {
    if (filterMyIssue.value) {
        data.todo = allIssue.value.filter((item) => item.status == 0 && item.Assignee == 1)
        data.pending = allIssue.value.filter((item) => item.status == 1 && item.Assignee == 1)
        data.progress = allIssue.value.filter((item) => item.status == 2 && item.Assignee == 1)
        data.testing = allIssue.value.filter((item) => item.status == 3 && item.Assignee == 1)
        data.done = allIssue.value.filter((item) => item.status == 4 && item.Assignee == 1)
    } else {
        data.todo = allIssue.value.filter((item) => item.status == 0)
        data.pending = allIssue.value.filter((item) => item.status == 1)
        data.progress = allIssue.value.filter((item) => item.status == 2)
        data.testing = allIssue.value.filter((item) => item.status == 3)
        data.done = allIssue.value.filter((item) => item.status == 4)
    }
})
watch(() => allIssuePending, () => {
    data.pending.map((item) => {
        updateStatusIssue(item, 1)
    })
}, {
    deep: true
})
watch(() => allIssueTodo, () => {
    data.todo.map((item) => {
        updateStatusIssue(item, 0)
    })
}, {
    deep: true
})
watch(() => allIssueProgress, () => {
    data.progress.map((item) => {
        updateStatusIssue(item, 2)
    })
}, {
    deep: true
})
watch(() => allIssueTesting, () => {
    data.testing.map((item) => {
        updateStatusIssue(item, 3)
    })
}, {
    deep: true
})
watch(() => allIssueDone, () => {
    data.done.map((item) => {
        updateStatusIssue(item, 4)
    })
}, {
    deep: true
})
onMounted(() => {
    checkCloseSideBar(route)

})
const clickItem = (data) => {
    detailTask.data = data
    showTaskDetail.value = true
    setActiveID(data.id)
}
const closeDetailTask = () => {
    showTaskDetail.value = false;
    setActiveID('')
}
</script>
<style>
.task-item {
    padding: 5px;
    cursor: move;
    position: relative;
    box-shadow: 0 0 1px 0 rgba(9, 30, 66, 0.31), 0 2px 4px -1px rgba(9, 30, 66, 0.25);
}

.task-item:hover {
    background-color: #ebecf0;
}
</style>