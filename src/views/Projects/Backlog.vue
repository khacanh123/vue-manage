<template>
    <!-- <button @click="cloneDataFunc()">clonedata</button> -->
    <div class="content z-1 m-3">

        <div :class="showTaskDetail ? 'w-3/4 mt-5' : 'w-full mt-5'">
            <div class="container-b2" ref="myContainer">
                <div class="title sticky-position" ref="currentSprint" v-if="project?.activesprint?.namesprint !== ''">
                    <div class="flex px-3">

                        <p>{{ project?.activesprint?.namesprint }} {{ data.activeSprintTask.length }} issues</p>

                    </div>
                </div>
                <div class="box-content" v-if="project?.activesprint?.namesprint !== ''">

                    <draggable v-model="data.activeSprintTask" tag="div" group="meals" :animation="300" class="h-full">
                        <template #item="{ element: meal }">
                            <div class="content-task flex cursor-move justify-between"
                                :class="activeID == meal.id ? 'bg-[#ebecf0]' : ''" @click="clickItem(meal)"
                                @contextmenu="showMenu">
                                <p><span class="text-[#0052cc] text-val"
                                        :style="meal.status == 4 && 'text-decoration-line: line-through'"> {{
                                            meal.code }}</span><span class="ml-2">{{
        meal.summary
    }}</span></p>
                                <div class="flex">
                                    <RenderImg v-bind:img="meal.assign.img" />
                                    <p class="p-1 h-[35px] text-center w-[35px] bg-[#ddd] rounded-full ml-2">{{
                                        meal.assign.estimate }}</p>
                                </div>
                            </div>
                        </template>
                    </draggable>


                </div>
                <div class="title" ref="newSprint" v-if="project?.newsprint?.namesprint !== ''">
                    <div class="flex justify-between px-3">

                        <p>{{ project?.newsprint?.namesprint }} {{ data.newSprintTask.length }} issues</p>
                        <button class="bg-[#25d36d] text-white p-3 font-bold rounded" @click="startSprint()">Bắt đầu
                            sprint</button>
                    </div>
                </div>
                <div class="box-content" v-if="project?.newsprint?.namesprint !== ''">
                    <div class="border border-[#ddd] py-10 my-4">
                        <draggable v-model="data.newSprintTask" tag="div" group="meals" :animation="300" class="h-full">
                            <template #item="{ element: meal }">
                                <div class="content-task cursor-move flex justify-between"
                                    :class="activeID == meal.id ? 'bg-[#ebecf0]' : ''" @click="clickItem(meal)"
                                    @contextmenu="showMenu">
                                    <p><span class="text-[#0052cc] text-val"> {{ meal.code }}</span><span class="ml-2">{{
                                        meal.summary }}</span></p>
                                    <div class="flex">
                                        <RenderImg v-bind:img="meal.assign.img" />
                                        <p>7</p>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>

                </div>
                <div class="title" ref="blacklog">
                    <div class="flex justify-between px-3">

                        <p>Backlog {{ data.blacklogTask.length }} issues</p>
                        <button v-bind:hidden="project?.newsprint?.namesprint != '' ? true : false"
                            class="bg-[#25d36d] text-white p-3 font-bold rounded"
                            @click="createSprint = true; projectData.newsprint.namesprint = `${project.name} Sprint ${Number(projectData.activesprint.sprintCode) + 1}`">Tạo
                            sprint</button>
                    </div>
                </div>
                <div class="box-content">

                    <draggable v-model="data.blacklogTask" tag="div" group="meals" :animation="300" class="h-full">
                        <template #item="{ element: meal }">
                            <div class="content-task cursor-move flex justify-between"
                                :class="activeID == meal.id ? 'bg-[#ebecf0]' : ''" @click="clickItem(meal)"
                                @contextmenu="showMenu">
                                <p><span class="text-[#0052cc] text-val"> {{ meal.code }}</span><span class="ml-2">{{
                                    meal.summary
                                }}</span></p>
                                <div class="flex">
                                    <RenderImg v-bind:img="meal.assign.img" />
                                    <p>7</p>
                                </div>
                            </div>
                        </template>
                    </draggable>
                </div>
                <div class="w-[95%] mx-auto my-4">
                    <div v-if="createTask">

                        <InputText class="w-full" v-model="taskName" />
                        <div class="flex justify-end">
                            <p class="p-2 text-[#0052cc] cursor-pointer" @click="createTaskFunction()">Tạo</p>
                            <p class="p-2 text-[#0052cc] cursor-pointer" @click="createTask = false, taskName = ''">exit</p>
                        </div>
                    </div>
                    <button class="bg-[#25d36d] mt-3 text-white p-3 rounded" v-else @click="createTask = true">Tạo
                        issue</button>
                </div>
            </div>


        </div>
        <div :class="showTaskDetail ? 'w-1/4 block z-[99999] h-[43vw]' : 'w-0 hidden'">
            <!-- <div v-if="showTaskDetail" class="overflow-y-auto"> -->
            <DetailTask v-on:closeTaskDetail="closeDetailTask" v-bind:projectData="project"
                v-bind:detailTask="detailTask.data" v-if="showTaskDetail" />

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
    <div ref="contextMenu" class="context-menu py-3 w-[200px]">
        <div>
            <p class="font-bold pl-2">Chuyển đến:</p>
            <div v-if="itemTask?.isInBlacklog && !itemTask?.isInNewSprint">
                <p class="py-1 pl-2 hover:bg-[#ddd]" v-if="project.newsprint.namesprint != ''"
                    @click="moveTask(itemTask, 2)">{{
                        project.newsprint.namesprint }}
                </p>
                <p class="py-1 pl-2 hover:bg-[#ddd]" @click="moveTask(itemTask, 1)">Active Sprint</p>
            </div>
            <div v-else-if="!itemTask?.isInBlacklog && itemTask?.isInNewSprint">
                <p class="py-1 pl-2 hover:bg-[#ddd]" @click="moveTask(itemTask, 1)">Active Sprint</p>

                <p class="py-1 pl-2 hover:bg-[#ddd]" @click="moveTask(itemTask, 3)">Blacklog</p>
            </div>
            <div v-else>
                <p class="py-1 pl-2 hover:bg-[#ddd]" v-if="project?.newsprint?.namesprint != ''"
                    @click="moveTask(itemTask, 2)">{{
                        project?.newsprint?.namesprint }}
                </p>
                <p class="py-1 pl-2 hover:bg-[#ddd]" @click="moveTask(itemTask, 3)">Blacklog</p>
            </div>
        </div>
    </div>
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
import { useRouter } from 'vue-router'

import Calendar from 'primevue/calendar';
import { useToast } from 'primevue/usetoast';
import RenderImg from '../../components/RenderImg.vue';
const route = useRoute();
const toast = useToast()
const router = useRouter()
const { allIssue } = storeToRefs(useIssueActive())
const { activeID } = storeToRefs(useManageStatus())
const { project, allTask, itemTask } = storeToRefs(useManageProject())
const { getListIssueActive, updateStatusIssue, updateInfoIssue } = useIssueActive()
const { checkCloseSideBar, setActiveID } = useManageStatus();
const { getProjectByKey, updateProject, getTaskByProjectKey, moveTask, getTaskByCode } = useManageProject()

const data = reactive({
    activeSprintTask: [],
    newSprintTask: [],
    blacklogTask: []
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
const contextMenu = ref(null);
const createSprint = ref(false)
const timeStart = ref();
const timeEnd = ref()
const detailTask = reactive({
    data: null
});
const createTask = ref(false)
const taskName = ref('')
getListIssueActive(1)
getProjectByKey(route.params.key)
getTaskByProjectKey(route.params.key)

watch(() => project.value, () => {
    console.log(project);
    projectData.activesprint = project.value.activesprint;
    projectData.newsprint = project.value.newsprint;
})
watch(() => allTask.value, () => {
    console.log(allTask);
    data.blacklogTask = allTask.value.filter((item) => item.isInBlacklog == true)
    data.newSprintTask = allTask.value.filter((item) => item.isInNewSprint == true)
    data.activeSprintTask = allTask.value.filter((item) => (item.activeSprint == projectData.activesprint.sprintCode && !item.isInBlacklog && !item.isInNewSprint))
})
const newSprintComputed = computed(() => {
    return data.newSprintTask.length;
})
const blacklogComputed = computed(() => {
    return data.blacklogTask.length;
})
const activeSprintComputed = computed(() => {
    return data.activeSprintTask.length;
})
watch(() => newSprintComputed, () => {
    data.newSprintTask.map((key) => {
        moveTask(key, 2)
    })
}, {
    deep: true
})
watch(() => activeSprintComputed, () => {
    data.activeSprintTask.map((key) => {
        moveTask(key, 1)
    })
}, {
    deep: true
})
watch(() => blacklogComputed, () => {
    data.blacklogTask.map((key) => {
        moveTask(key, 3)
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
        contextMenu.value.style.display = 'none';

    };

    contentBox.addEventListener("scroll", handleScroll);
    document.addEventListener('click', () => {
        contextMenu.value.style.display = 'none';
    });
})
const showMenu = (event) => {
    const element = document.createElement('div');
    element.innerHTML = event.target.innerHTML;
    const taskCode = element.querySelector('.text-val').textContent;

    event.preventDefault();
    getTaskByCode(taskCode)
    contextMenu.value.style.display = 'block';
    contextMenu.value.style.left = `${event.pageX - 250}px`;
    contextMenu.value.style.top = `${event.pageY}px`;
    activeID.value = itemTask.value.id;
}
const createTaskFunction = () => {
    const task = {
        code: `${route.params.key}-` + (allTask.value.length + 1),
        summary: taskName.value,
        projectKey: `${route.params.key}`,
        assign: {
            userID: "",
            estimate: "",
            img: '',
        },
        status: 0,
        isInBlacklog: true,
        isInNewSprint: false,
        activeSprint: ""
    }
    if (taskName.value.trim() != '') {
        const addTask = firebase.database().ref('list-tasks');
        addTask.push(task)
        createTask.value = false;
        toast.add({ severity: 'success', summary: 'success', detail: 'Tạo task thành công!', life: 3000 })
    }
}
const cloneDataFunc = () => {
    const addUser = firebase.database().ref('list-tasks');
    console.log(allIssue.value);
    allIssue.value.map((key, index) => {
        const task = {
            code: `${route.params.key}-` + (index++),
            summary: key.summary,
            projectKey: `${route.params.key}`,
            assign: {
                userID: "",
                estimate: "",
                img: '',
            },
            status: 0,
            isInBlacklog: true,
            isInNewSprint: false,
            activeSprint: ""
        }
        // return task
        console.log(task);
        addUser.push(task)
    })
    // alert('done')
}
const createSprintFunction = () => {
    const updateNewSprint = { ...projectData.newsprint };
    updateNewSprint.sprintCode = projectData.activesprint.sprintCode == '' ? 1 : Number(projectData.activesprint.sprintCode) + 1;
    updateNewSprint.timeStart = new Date(timeStart.value).toISOString();
    updateNewSprint.timeEnd = new Date(timeEnd.value).toISOString();
    const cloneProject = { ...project.value };
    cloneProject.selectedUsers = JSON.parse(JSON.stringify(project.value.selectedUsers))
    // cloneProject.blacklog = JSON.parse(JSON.stringify(project.value.blacklog))
    cloneProject.activesprint = JSON.parse(JSON.stringify(project.value.activesprint))
    cloneProject.newsprint = updateNewSprint
    updateProject(cloneProject)
    // console.log(cloneProject);
    createSprint.value = false;
}
const startSprint = () => {
    const newsprint = { ...projectData.newsprint };
    newsprint.sprintCode = '';
    newsprint.timeStart = '';
    newsprint.timeEnd = '';
    newsprint.goal = '';
    newsprint.namesprint = '';
    const cloneProject = { ...project.value };
    cloneProject.selectedUsers = JSON.parse(JSON.stringify(project.value.selectedUsers))
    // cloneProject.blacklog = JSON.parse(JSON.stringify(project.value.blacklog))
    cloneProject.activesprint = JSON.parse(JSON.stringify(projectData.newsprint))
    cloneProject.newsprint = newsprint;
    updateProject(cloneProject)
    data.newSprintTask.map((key) => {
        const cloneData = { ...key };
        cloneData.activeSprint = projectData.newsprint.sprintCode + '';
        cloneData.isInNewSprint = false;
        console.log(cloneData);
        updateInfoIssue(cloneData)
    })
    // console.log(cloneProject);
    toast.add({ severity: 'success', summary: 'success', detail: 'Sprint đã được bắt đầu!', life: 3000 })
    // addUser.push(cloneData);
    router.push({
        name: 'activesprint',
        params: {
            key: route.params.key
        }

    })
    // createSprint.value = false;
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
    padding: 15px 8px;
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

.context-menu {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1;
}
</style>
