<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <div class="flex justify-between">
        <p class="text-2xl font-bold">Danh sách lớp học</p>

    </div>
    <DataTable :value="listUser" showGridlines tableStyle="min-width: 50rem">
        <Column field="course_name" header="Tên lớp"></Column>
        <Column field="teacher" header="Mentor"></Column>
        <Column field="p_status" header="Trạng thái"></Column>
        <Column header="Thời gian bắt đầu">
            <template #body="{ data, frozenRow, index }">
                {{ formatTimeString(data.timeStart) }}
                <!-- <i class="pi pi-pencil" style="font-size: 18px" @click="setDataUpdate(data, frozenRow, index)"></i> -->
            </template>
        </Column>
        <Column style="flex: 0 0 4rem" header="Còn trống">
            <template #body="{ data, frozenRow, index }">
                {{ data.status == 1 ? 'Hết chỗ' : `${data.slot}/${data.num}` }}
                <!-- <i class="pi pi-pencil" style="font-size: 18px" @click="setDataUpdate(data, frozenRow, index)"></i> -->
            </template>
        </Column>
        <Column style="flex: 0 0 4rem" header="Action">
            <template #body="{ data, frozenRow, index }">
                <div v-if="data.status == 0" class="flex">
                    <p class="text-[#43c883] mr-2 cursor-pointer" @click="showContent(data)">Xem nội dung học</p>
                    <p class="text-[#43c883] cursor-pointer" @click="registerAction(data)">Đăng ký học</p>
                </div>
                <!-- <i class="pi pi-pencil" style="font-size: 18px" @click="setDataUpdate(data, frozenRow, index)"></i> -->
            </template>
        </Column>
    </DataTable>
    <Dialog v-model:visible="detail.show" modal header="Chi tiết" :style="{ width: '50vw' }">
        <div>
            <div v-html="detail.content">

            </div>
            <div class="flex justify-center">
                <button class="border border-[#dddd] rounded p-2" @click="detail.show = false">Đóng lại</button>
            </div>
        </div>
    </Dialog>
    <Dialog v-model:visible="register.show" modal header="Đăng ký vào lớp" :style="{ width: '50vw' }">
        <div>

            <div class="" v-if="register.isRegister">
                <div v-if="register.loading" class=" flex justify-center flex-wrap ">
                    <ProgressSpinner />
                    <p class="w-full justify-center flex text-[17px] font-bold mt-2">Hệ thống đang kiểm tra, Bạn vui lòng
                        đợi
                        trong giây lát.</p>
                </div>
                <div v-else>
                    <div v-if="register.data.money == 0">
                        <p class="w-full justify-center flex text-[17px] font-bold mt-2">Lớp học đã đủ người, bạn vui lòng
                            đăng ký tham gia lớp học khác.</p>
                    </div>
                    <div v-else>
                        <div v-if="register.data.num == register.data.slot">
                            <p class="w-full justify-center flex text-[17px] font-bold mt-2">Lớp học đã đủ người, bạn vui
                                lòng
                                đăng ký tham gia lớp học khác.</p>
                        </div>
                        <div v-else>
                            <p class="w-full justify-center flex text-[17px] font-bold mt-2">Bạn đã đăng ký thành công, vui
                                lòng
                                kiểm tra email trong vài phút tới.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" flex justify-center" v-else>
                <div class="w-[50%] flex flex-wrap">
                    <div class="w-1/2">
                        <p class="text-[16px] font-bold">Tên lớp: </p>
                        <p class="text-[16px] font-bold">Còn trống: </p>
                        <p class="text-[16px] font-bold">Học phí: </p>
                    </div>
                    <div class="w-1/2">
                        <p class="text-[16px]">{{ register.data.course_name }} </p>
                        <p class="text-[16px]">{{ register.data.num }} </p>
                        <p class="text-[16px]">{{ Number(register.data.money).toLocaleString('en-US') }} đồng</p>
                    </div>
                    <div class="w-full">
                        <p class="text-[16px]">
                            <span class="font-bold">Lưu ý: </span>Đối với các lớp học có phí, sau khi đăng ký thành công bạn
                            nộp học phí theo thông tin gửi về email của mình.
                        </p>
                        <div class="flex justify-center">
                            <button class="border border-[red] m-2 rounded p-2" @click="register.show = false">Đóng
                                lại</button>
                            <button class="border border-[#dddd] m-2 rounded p-2" @click="submitRegister()">Đăng ký</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </Dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import firebase from '@/utils/firebase';


const listUser = ref(null)
const detail = ref({
    show: false,
    content: ''
})
const showContent = (data) => {
    detail.value.show = true;
    detail.value.content = data.description
}
const register = ref({
    show: false,
    data: {},
    isRegister: false,
    loading: true,
})
const registerAction = (data) => {
    register.value.show = true;
    register.value.data = data
}
const submitRegister = () => {
    register.value.isRegister = true;
    setTimeout(() => {
        register.value.loading = false;
    }, 3000)
    setTimeout(() => {
        register.value.show = false;
        register.value.isRegister = false;
        register.value.loading = true;
    }, 5000)
}
const formatTimeString = (dateISO) => {
    const dateConverted = new Date(dateISO);
    let hours = dateConverted.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursConvert = `0${dateConverted.getHours()}`.slice(-2);
    const minutes = `0${dateConverted.getMinutes()}`.slice(-2);
    const seconds = `0${dateConverted.getSeconds()}`.slice(-2);
    const date = `0${dateConverted.getDate()}`.slice(-2);
    const month = `0${dateConverted.getMonth() + 1}`.slice(-2);
    const year = dateConverted.getFullYear();
    const currentDay = dateConverted.getDay();
    const convertDay = (currentDay) => {
        switch (currentDay) {
            case 0:
                currentDay = 'Chủ nhật';
                break;
            case 1:
                currentDay = 'Thứ hai';
                break;
            case 2:
                currentDay = 'Thứ ba';
                break;
            case 3:
                currentDay = 'Thứ tư';
                break;
            case 4:
                currentDay = 'Thứ năm';
                break;
            case 5:
                currentDay = 'Thứ sáu';
                break;
            case 6:
                currentDay = 'Thứ bảy';
                break;
            default:
                break;
        }
        return currentDay;
    };
    const day = convertDay(currentDay);
    return `${date}/${month}/${year} ${hoursConvert}:${minutes}`
};
onMounted(() => {
    const todoRef = firebase.database().ref('list-course');
    todoRef.on('value', (snapshot) => {
        const todos = snapshot.val();
        const todoList = [];
        for (let id in todos) {
            todoList.push({ id, ...todos[id], p_status: todos[id].status == '0' ? 'Đang mở đăng ký' : 'Đã diễn ra' });
        }
        listUser.value = todoList
        console.log(todoList);
    });
})


</script>
<style>
div>h2 {
    font-size: 18px;
}
</style>