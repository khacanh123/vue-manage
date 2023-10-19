<script setup>
import { ref, reactive, onMounted } from "vue";
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
onMounted(() => {
  audioControl.value.addEventListener('click', () => {
    document.querySelector('.img-style').classList.toggle('active'); // Toggle the "active" class
    animationImg.value.classList.toggle('active');
    statusControl.value = !statusControl.value;
    if (statusControl.value) {
      audio.play();
    } else {
      audio.pause();
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
    <div class="content-song">
      <div class="ab audio-control" ref="audioControl">

        <i class="icon-media" :class="statusControl ? 'pi  pi-pause' : 'pi pi-play'" style="font-size:24px"></i>
        <img
          src='https://yt3.ggpht.com/JOoDtyUm8ofOw8PCSuhLo_Qxge-RSyC7kjtN9fYIY3x8t04UcGTGrO-6n3i9J6lRxc0HiZLvcYk=s48-c-k-c0x00ffffff-no-rj'
          class='img-style' />
      </div>
      <div class="text-song">anh đang ở đấy</div>
    </div>
  </div>
</template>