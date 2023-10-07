<template>
    <!-- <div class="border-l-2 border-[#ebecf0]"> -->
    <div class="flex justify-between py-2 ">
        <p>{{ projectData.name }} / <a href="" class="text-[#0052cc]">{{ itemTask.code }}</a></p>
        <button @click="emits('closeTaskDetail')">
            <i class="pi pi-times"></i>
        </button>
    </div>
    <div class="flex flex-wrap items-center" @click="showEditText()" @mouseover="editText(1)" @mouseleave="editText(2)">
        <div id="show-text" class="flex w-full">
            <div class="w-[95%] bg-[#f4f5f7] py-3" id="content-text">{{ itemTask.summary }}</div>
            <div class="w-[5%] py-3 hidden bg-[#f4f5f7]" id="icon-edit" @click="updateInfo(1)">
                <i class="pi pi-pencil"></i>
            </div>
        </div>

    </div>
    <div class="w-full hidden" id="show-edit-text">
        <div>
            <input type="text" class="border w-full" v-model="data.summary" v-autofocus>
        </div>
        <div class="flex justify-end">
            <button class="bg-[rgba(9,30,66,.08)] m-1" @click="updateInfo(1)"><i class="pi pi-check"></i></button>
            <button class="bg-[rgba(9,30,66,.08)] m-1" @click="optionClose(1)"><i class="pi pi-times"></i></button>
        </div>
    </div>
    <div class="flex items-center">
        <p>Estimate: </p>
        <div class="assignee flex items-center ml-10" @click="changeEstimate = true" v-if="!changeEstimate">

            <p>{{ itemTask?.assign?.estimate == '' ? 'Unestimate' : itemTask?.assign?.estimate }}</p>
            <div class="icon-assign bg-[#f4f5f7] cursor-pointer w-fit px-2">
                <i class="pi pi-pencil"></i>

            </div>

        </div>
        <div class="ml-10" v-else>
            <input class="h-[30px] w-[100px] border-[#ddd] border rounded" v-model="estimate" />
            <div class=" flex justify-center">
                <div class="p-3 border ml-1" @click="estimate == '' ? null : updateEstimate()">
                    <i class="pi pi-check"></i>
                </div>
                <div class="p-3 border" @click="changeEstimate = false">
                    <i class="pi pi-times"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="overflow-y-auto h-[40vw]">
        <div class="py-3">
            <p>Reporter: Admin</p>
            <div class="flex items-center">
                <p>Assignee: </p>
                <!-- hover -->
                <div class="assignee flex items-center ml-3" @click="changeAssign = true" v-if="!changeAssign">
                    <RenderImg v-bind:img="itemTask?.assign?.img" />
                    <p class="ml-2">{{ displayUser }}</p>
                    <div class="icon-assign bg-[#f4f5f7] cursor-pointer w-fit px-2">
                        <i class="pi pi-pencil"></i>

                    </div>

                </div>
                <div class="" v-else>
                    <div class="flex items-center ml-3">
                        <Dropdown v-model="selectedUser" :options="projectData.selectedUsers" optionLabel="name"
                            placeholder="Chọn ..." class="z-3" />

                    </div>
                    <div class="ml-2 flex justify-center">
                        <div class="p-3 border ml-1" @click="selectedUser == null ? null : updateAssign()">
                            <i class="pi pi-check"></i>
                        </div>
                        <div class="p-3 border" @click="changeAssign = false">
                            <i class="pi pi-times"></i>
                        </div>
                    </div>
                </div>
            </div>
            <p>Status: {{ renderStatus }}</p>
        </div>
        <p class="font-bold">Description </p>
        <div class="flex flex-wrap items-center" @click="showEditDescription()" @mouseover="editDescription(1)"
            @mouseleave="editDescription(2)">
            <div id="show-description" class="flex w-full">
                <div class="w-[95%] bg-[#f4f5f7] py-3" id="content-description">
                    <div v-html="itemTask.text"></div>
                </div>
                <div class="w-[5%] py-3 hidden bg-[#f4f5f7]" id="icon-edit-1">
                    <i class="pi pi-pencil"></i>
                </div>
            </div>

        </div>
        <div class="w-full hidden" id="show-edit-description">
            <div>
                <Editor v-model="contentDescription" editorStyle="height: 200px" />

            </div>
            <div class="flex justify-end border ">
                <button class="bg-[#0052cc] text-[#fff] m-1 p-2" @click="updateInfo(2)">Edit</button>
                <button class="p-2 m-1" @click="optionClose(2)">cancel</button>
            </div>
        </div>
        <div class="py-3">
            <p class="font-bold">Comment</p>
            <!-- List -->
            <div v-for="comment in listComment" class="pb-3">
                <ItemComment v-bind:comment="comment" />
            </div>
            <!-- bình luận -->
            <div class="p-3 w-fit cursor-pointer rounded items-center flex bg-[#deebff]" v-if="showAddComment == false"
                @click="showAddComment = !showAddComment">
                <i class="pi pi-comment"></i>
                <p class="ml-2">Comment</p>
            </div>
            <div v-if="showAddComment">
                <Editor v-model="contentComment" editorStyle="height: 100px" />
                <div class="flex justify-end border ">
                    <button class="bg-[#0052cc] text-[#fff] m-1 p-2" v-bind:disabled="contentComment.trim().length === 0"
                        @click="addComment">Add</button>
                    <button class="p-2 m-1" @click="showAddComment = !showAddComment">cancel</button>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>
<script setup>
import { reactive, ref, watch, computed } from 'vue'
import Editor from 'primevue/editor';

import { vAutofocus } from '@/directives/vAutofocus'
import { useIssueActive } from '../stores/getIssueActive'
import { storeToRefs } from 'pinia';
import ItemComment from './Comment/ItemComment.vue';
import RenderImg from './RenderImg.vue';
import { useManageProject } from '../stores/manageProject';
const { listComment } = storeToRefs(useIssueActive())
const { itemTask } = storeToRefs(useManageProject())
const { updateInfoIssue, addCommentOfIssue, getListCommentOfIssue } = useIssueActive()
const { getTaskByCode } = useManageProject()
const emits = defineEmits(['closeTaskDetail'])
const props = defineProps({
    detailTask: {
        type: Object,
        default: {}
    },
    projectData: {
        type: Object,
        default: {}
    }
})
getTaskByCode(props.detailTask.code)
console.log(props.detailTask);
const convertData = itemTask.value
const data = reactive(convertData)
const showAddComment = ref(false);
const contentDescription = ref('')
const contentComment = ref('');
const changeAssign = ref(false)
const selectedUser = ref(null)
const changeEstimate = ref(false)
const estimate = ref('')
watch(() => props.detailTask, () => {
    getTaskByCode(props.detailTask.code)
    getListCommentOfIssue(itemTask.value.id)
    contentDescription.value = itemTask.text;
    contentComment.value = '';
}, {
    deep: true
})
const displayUser = computed(() => {
    const filterData = props.projectData?.selectedUsers?.filter((item) => item.code == itemTask?.value?.assign?.userID);
    // console.log(filterData);
    if (filterData && filterData[0]?.name != undefined) return filterData[0].name
    else return 'Unassigned'
})

const updateAssign = () => {
    const data = { ...itemTask.value };
    data.assign.userID = selectedUser.value.code;
    data.assign.img = selectedUser.value.img;
    updateInfoIssue(data)
    getTaskByCode(itemTask.value.code)
    changeAssign.value = false
    selectedUser.value = null
}
const updateEstimate = () => {
    const data = { ...itemTask.value };
    data.assign.estimate = estimate.value;
    updateInfoIssue(data)
    getTaskByCode(itemTask.value.code)
    changeEstimate.value = false;
    estimate.value = ''
}
const editText = (type) => {
    if (type == 1) {
        // move
        document.getElementById('content-text').style.border = '1px solid #ddd';
        document.getElementById('icon-edit').style.display = 'block'
        document.getElementById('icon-edit').style.background = 'rgba(9,30,66,0.13)'
    }
    else {
        // leave
        document.getElementById('content-text').style.border = '';
        document.getElementById('icon-edit').style.display = ''
        document.getElementById('icon-edit').style.background = '#f4f5f7'
    }
}
const showEditText = () => {
    document.getElementById('show-edit-text').style.display = 'block'
    document.getElementById('show-text').style.display = 'none'
}
const editDescription = (type) => {
    if (type == 1) {
        // move
        document.getElementById('content-description').style.border = '1px solid #ddd';
        document.getElementById('icon-edit-1').style.display = 'block'
        document.getElementById('icon-edit-1').style.background = 'rgba(9,30,66,0.13)'
    }
    else {
        // leave
        document.getElementById('content-description').style.border = '';
        document.getElementById('icon-edit-1').style.display = ''
        document.getElementById('icon-edit-1').style.background = '#f4f5f7'
    }
}
const showEditDescription = () => {
    contentDescription.value = itemTask.value.text;

    document.getElementById('show-edit-description').style.display = 'block'
    document.getElementById('show-description').style.display = 'none'
}
// close edit summary or description
const optionClose = (type) => {
    if (type == 1) {
        document.getElementById('show-edit-text').style.display = 'none'
        document.getElementById('show-text').style.display = ''
        editText(2)
    } else {
        console.log(type);
        document.getElementById('show-edit-description').style.display = 'none'
        document.getElementById('show-description').style.display = ''
        // editDescription(2)
    }
}
const updateInfo = (type) => {
    const cloneData = { ...itemTask.value };
    cloneData.text = contentDescription.value;
    // console.log(cloneData);
    updateInfoIssue(cloneData)
    optionClose(type)
}
const addComment = () => {
    const comment = {
        idIssue: itemTask.value.id,
        comment: contentComment.value,
        user: '1',
        time: new Date().toUTCString(),
        edit: false
    }
    addCommentOfIssue(comment);
    showAddComment.value = !showAddComment
    contentComment.value = ''
}

// computed
const renderStatus = computed(() => {
    if (itemTask.value.status === 0) return 'Todo';
    else if (itemTask.value.status === 1) return 'Pending';
    else if (itemTask.value.status === 2) return 'Progress';
    else if (itemTask.value.status === 3) return 'In Testing';
    else return 'Done'
})
</script>
<style>
.assignee .text {
    width: fit-content;
    padding: 3px;
}

.icon-assign {
    display: none;
    cursor: pointer;
}

.assignee:hover {
    border: 1px solid #ddd;
}

.assignee:hover .icon-assign {
    display: block;
}
</style>