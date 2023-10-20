<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import Editor from 'primevue/editor';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup'
import { useToast } from "primevue/usetoast";
import firebase from '@/utils/firebase';
import HeaderComponent from "../components/MyProfile/HeaderComponent.vue";
import ContentComponent from "../components/MyProfile/ContentComponent.vue";

const toast = useToast();
const dataQuestion = reactive({
  quizType: 0,
  name: '',
  tags: '',
  typeQues: '',
  level: '',
  text: '',
  solution: '',
  dataAnswer: null
})
const schema = Yup.object().shape({
  name: Yup.string()
    .required('Title is required'),
  tags: Yup.string()
    .required('First Name is required'),
  typeQues: Yup.string()
    .required('Last name is required'),
  level: Yup.string()
    .required('Last name is required'),
  quizType: Yup.string()
    .required('Last name is required'),
});
const updateAnswer = (data) => {
  dataQuestion.dataAnswer = JSON.parse(JSON.stringify(data))
}

function onSubmit(values) {
  let sendRequest = true;
  if (dataQuestion.text == '') {
    sendRequest = false;
    return toast.add({ severity: 'error', summary: 'Error', detail: 'Vui lòng nhập nội dung câu hỏi', life: 3000 });
  }
  if (dataQuestion.quizType == 1) {
    // check dien thong tin cau tra loi
    if (dataQuestion.dataAnswer == null) {
      sendRequest = false;
      return toast.add({ severity: 'error', summary: 'error', detail: 'Vui lòng nhập đáp án', life: 3000 })
    } else {
      const data = JSON.parse(JSON.stringify(dataQuestion.dataAnswer));
      // check các đáp án đã đc điền
      let isFill = 0;
      data.listAnswer.map((item) => {
        if (item.content.trim() == '') {
          isFill++
        }
      })
      if (isFill > 0) {
        sendRequest = false
        return toast.add({ severity: 'error', summary: 'error', detail: 'Đáp án không được để trống', life: 3000 })
      }
      // check chọn đáp án đúng
      if (!data.hasOwnProperty('answer_true')) {
        sendRequest = false
        return toast.add({ severity: 'error', summary: 'error', detail: 'Vui lòng chọn đáp án đúng cho câu hỏi', life: 3000 })
      }
    }
  }
  if (sendRequest) {
    const data = JSON.parse(JSON.stringify(dataQuestion));
    const product = firebase.database().ref('project');
    product.push(data);
  }
}
const audio = new Audio('/assets/catdoinoisau.mp3');

const audioControl = ref(null);
const animationImg = ref(null);
const statusControl = ref(false);
const timeAudio = ref(0)
const currentTime = ref(0);
const percentage = ref(0)
const timeAudioComputed = computed(() => {
  const minutes = Math.floor(timeAudio.value / 60);
  const remainingSeconds = timeAudio.value % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
})
const currentTimeComputed = computed(() => {
  const minutes = Math.floor(currentTime.value / 60);
  const remainingSeconds = currentTime.value % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
})
onMounted(() => {
  audio.addEventListener('loadedmetadata', function () {
    // Lấy thời lượng của tệp âm thanh (giây)
    const durationInSeconds = audio.duration;
    timeAudio.value = parseInt(durationInSeconds + '');
    console.log('Thời lượng của audio: ' + parseInt(durationInSeconds + '') + ' giây');
  });
  let timeRun = null;
  audioControl.value.addEventListener('click', () => {
    audioControl.value.classList.toggle('active'); // Toggle the "active" class
    animationImg.value.classList.toggle('active');
    statusControl.value = !statusControl.value;
    if (statusControl.value) {
      timeRun = setInterval(function () {
        // Mã bạn muốn thực hiện định kỳ
        currentTime.value = currentTime.value + 1;
        percentage.value = (currentTime.value / (timeAudio.value + 1)) * 100;
        if (currentTime.value == timeAudio.value + 1) {
          clearInterval(timeRun)
          statusControl.value = false;
          audioControl.value.classList.toggle('active'); // Toggle the "active" class
          animationImg.value.classList.toggle('active');
          currentTime.value = 0
        }
      }, 1000);
      audio.play();
    } else {
      audio.pause();
      clearInterval(timeRun)
    }
  });
})
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
  <link rel="stylesheet" href="/assets/css/myprofile.css">
  <div class="content-body">
    <HeaderComponent />
    <ContentComponent />

    <div class="img-song">
      <img
        src='https://hungnmdev.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmusic%20dance.54c6a4d8.gif&w=384&q=75'
        class='animation-song' ref="animationImg" />
    </div>
    <div class="content-song" :style="statusControl && 'width: 300px'">
      <div class="ab audio-control" ref="audioControl">

        <i class="icon-media" :class="statusControl ? 'pi  pi-pause' : 'pi pi-play'" style="font-size:24px"></i>

      </div>
      <div class="text-song" :style="statusControl && 'display: block; width: 200px'">
        <div v-if="statusControl">
          <p class="text-center underline">Cắt đôi nỗi sầu - TDT</p>
          <div class="flex">
            <p class="w-[15%]">{{ currentTimeComputed }}</p>
            <div class="w-[70%] border-1 border-[black]" style="border: 1px solid">
              <div :class="`bg-[#2fff4b] h-full `" :style="`width: ${percentage}%`"></div>
            </div>
            <p class="w-[15%] ml-1">{{ timeAudioComputed }}</p>
          </div>
        </div>
        <div v-else>
          <p class="text-center underline">Cắt đôi nỗi sầu - TDT</p>
        </div>
      </div>
    </div>
  </div>
</template>