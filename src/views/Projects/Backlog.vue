<template>
    <button @click="cloneDataFunc">cloneData</button>
    <div class="content z-1 m-3">

        <div :class="showTaskDetail ? 'w-3/4 mt-5' : 'w-full mt-5'">
            <div class="container-b2" ref="myContainer">
                <div class="title sticky-position" ref="currentSprint">sprint a</div>
                <div class="box-content">
                    <div class="content-task"></div>
                    <div class="content-task"></div>
                    <div class="content-task"></div>
                    <div class="content-task"></div>
                    <div class="content-task"></div>
                    <div class="content-task"></div>
                    <div class="content-task"></div>
                    <div class="content-task"></div>
                </div>
                <div class="title" ref="newSprint" v-if="projectData.newsprint.namesprint !== ''">
                    <div class="flex justify-between px-3">

                        <p>{{ projectData.newsprint.namesprint }} {{ listIssue.issueNewTask.length }} issues</p>
                        <button class="bg-[#25d36d] text-white p-3 font-bold rounded" @click="">Bắt đầu
                            sprint</button>
                    </div>
                </div>
                <div class="box-content" v-if="projectData.newsprint.namesprint !== ''">
                    <div class="border border-[#ddd] py-10 my-4">
                        <draggable v-model="listIssue.issueNewTask" tag="div" group="meals" :animation="300" class="h-full">
                            <template #item="{ element: meal }">
                                <div class="content-task my-3" :class="activeID == meal.id ? 'bg-[#ebecf0]' : ''"
                                    @click="clickItem(meal)">
                                    <p>{{ meal.summary }}</p>

                                </div>
                            </template>
                        </draggable>
                    </div>

                </div>
                <div class="title" ref="blacklog">
                    <div class="flex justify-between px-3">

                        <p>Backlog {{ listIssue.blacklog.length }} issues</p>
                        <button class="bg-[#25d36d] text-white p-3 font-bold rounded" @click="createSprint = true">Tạo
                            sprint</button>
                    </div>
                </div>
                <div class="box-content">

                    <draggable v-model="listIssue.blacklog" tag="div" group="meals" :animation="300" class="h-full">
                        <template #item="{ element: meal }">
                            <div class="content-task my-3" :class="activeID == meal.id ? 'bg-[#ebecf0]' : ''"
                                @click="clickItem(meal)">
                                <p>{{ meal.summary }}</p>

                            </div>
                        </template>
                    </draggable>
                </div>
                <div class="w-[95%] m-auto">
                    <button class="bg-[#25d36d] mt-3 text-white p-3 rounded">Tạo issue</button>
                </div>
            </div>

            <!-- <div class=" overflow-y-auto h-[43vw] flex">
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
            </div> -->
        </div>
        <div :class="showTaskDetail ? 'w-1/4 block z-[99999] overflow-y-auto h-[43vw]' : 'w-0 hidden'">
            <!-- <div v-if="showTaskDetail" class="overflow-y-auto"> -->
            <DetailTask v-on:closeTaskDetail="closeDetailTask" v-bind:detailTask="detailTask.data" v-if="showTaskDetail" />

            <!-- </div> -->
            <!-- <DetailTask v-on:closeTaskDetail="showTaskDetail = !showTaskDetail" /> -->
        </div>
    </div>
    <Dialog v-model:visible="createSprint" modal header="Tạo sprint mới" :style="{ width: '500px' }">
        <div class="font-bold flex justify-center">
            <div class="w-[450px]">
                <div class=" py-3">
                    <label for="" class="font-bold pb-2">Tên sprint:</label>
                    <InputText type="text" class="w-full md:w-20rem" v-model="projectData.newsprint.namesprint" />
                </div>
                <div class=" py-3">
                    <label for="" class="font-bold pb-2">Mục tiêu sprint:</label>
                    <Textarea rows="3" class="w-full md:w-20rem" v-model="projectData.newsprint.goal" />
                </div>
                <div class="py-3">
                    <label for="" class="font-bold pb-2">Thời gian bắt đầu:</label>

                    <Calendar id="calendar-24h" class="w-full md:w-20rem" v-model="timeStart" showTime hourFormat="24" />
                </div>
                <div class="py-3">
                    <label for="" class="font-bold pb-2">Thời gian kết thúc:</label>

                    <Calendar id="calendar-24h" class="w-full md:w-20rem" v-model="timeEnd" showTime hourFormat="24" />
                </div>
                <div class="flex justify-center">
                    <Button label="Tạo mới" @click="createSprintFunction" />
                </div>
            </div>
        </div>
    </Dialog>
</template>
<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue';
import draggable from 'vuedraggable';
import DetailTask from '../../components/DetailTask.vue'
import TaskItem from '../../components/TaskItem.vue'
import { storeToRefs } from 'pinia'
import { useIssueActive } from '../../stores/getIssueActive'
import { useManageStatus } from '../../stores/manageStatus';

import { useRoute } from "vue-router";
import { useManageProject } from '../../stores/manageProject';
import firebase from "@/utils/firebase";

import Calendar from 'primevue/calendar';
const route = useRoute();
const { allIssue } = storeToRefs(useIssueActive())
const { activeID } = storeToRefs(useManageStatus())
const { project } = storeToRefs(useManageProject())
const { getListIssueActive, updateStatusIssue } = useIssueActive()
const { checkCloseSideBar, setActiveID } = useManageStatus();
const { getProjectByKey, updateProject } = useManageProject()

const data = reactive({
    todo: [],  //0
    pending: [],//1
    progress: [],//2
    testing: [],//3
    done: []//4
})
const projectData = reactive({
    activesprint: {},
    newsprint: {}
})
const listIssue = reactive({
    activeIssue: [],
    issueNewTask: [],
    blacklog: []
})
const showTaskDetail = ref(false)
const myContainer = ref(null);
const currentSprint = ref(null);
const newSprint = ref(null);
const blacklog = ref(null)
const createSprint = ref(false)
const timeStart = ref();
const timeEnd = ref()
const detailTask = reactive({
    data: null
});
getListIssueActive(1)
getProjectByKey(route.params.key)
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
watch(() => project, () => {

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
    checkCloseSideBar(route);
    const contentBox = myContainer.value;
    const title1 = currentSprint.value;
    const title2 = newSprint.value;
    const title3 = blacklog.value;

    const handleScroll = () => {
        const scrollTop = contentBox.scrollTop;
        const title2Offset = title2.offsetTop;
        const title3Offset = title3.offsetTop;

        if (scrollTop >= title2Offset) {
            title2.classList.add("sticky-position");
            title1.classList.add("relative-position");
        } else {
            title2.classList.remove("sticky-position");
            title1.classList.remove("relative-position");
        }

        if (scrollTop >= title3Offset) {
            title3.classList.add("sticky-position");
            title2.classList.remove("sticky-position");
        } else {
            title3.classList.remove("sticky-position");
            title2.classList.add("sticky-position");
        }
    };

    contentBox.addEventListener("scroll", handleScroll);

})
const cloneDataFunc = () => {
    const addUser = firebase.database().ref('list-tasks');

    allIssue.value.map((key, index) => {
        const task = {
            code: "HBA-" + (index++),
            summary: key.summary,
            projectKey: "HBA",
            assign: {
                userID: "",
                estimate: ""
            },
            status: 0,
            isInBlacklog: true,
            isInNewSprint: false,
            activeSprint: ""
        }
        // return task
        addUser.push(task)
    })
}
const createSprintFunction = () => {
    const updateNewSprint = { ...projectData.newsprint };
    updateNewSprint.sprintCode = projectData.activesprint.sprintCode == '' ? 1 : Number(projectData.activesprint.sprintCode) + 1;
    updateNewSprint.timeStart = new Date(timeStart.value).toISOString();
    updateNewSprint.timeEnd = new Date(timeEnd.value).toISOString();
    const cloneProject = { ...project.value };
    cloneProject.selectedUsers = JSON.parse(JSON.stringify(project.value.selectedUsers))
    cloneProject.blacklog = JSON.parse(JSON.stringify(project.value.blacklog))
    cloneProject.activesprint = JSON.parse(JSON.stringify(project.value.activesprint))
    cloneProject.newsprint = updateNewSprint
    updateProject(cloneProject)
    // console.log(updateNewSprint);
    createSprint.value = false;
}
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

.task-item:hover,
.content-task:hover {
    background-color: #ebecf0;
}

.sticky-position {
    position: sticky;
    top: 0;
    z-index: 1;
}

.relative-position {
    position: relative;
}

.container-b2 {
    height: 43vw;
    overflow-y: auto;
}

.content-task {
    border: 1px solid #ddd;
    padding: 15px 5px;
    border-radius: 5px;
}

.box-content {
    width: 95%;
    margin: auto;
}

.title {
    background-color: rgb(240, 237, 237);
    padding: 10px;
}
</style>
