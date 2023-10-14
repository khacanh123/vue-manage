<script setup>
import { ref, reactive, watch } from "vue";
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

</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
  <link rel="stylesheet" href="/assets/css/myprofile.css">
  <div class="content-body">
    <HeaderComponent />
    <ContentComponent />

    <div class="absolute lg:block hidden bottom-8 right-7 h-20 w-20 bg-green-500 rounded-full p-3">
      <img src="/assets/images/customer.jpg" />
    </div>
  </div>
</template>